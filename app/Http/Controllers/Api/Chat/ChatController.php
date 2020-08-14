<?php

namespace App\Http\Controllers\Api\Chat;

use ExportHelper;

use App\Models\User\User;
use App\Models\Esport\Game;
use App\Models\Chat\Chat;
use App\Models\Chat\ChatMessage;
use App\Models\Chat\ChatUser;

use App\Events\ChatMessageEvent;
use App\Events\ChatMessageReadEvent;
use App\Events\UserUpdateEvent;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class ChatController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\Chat\Chat::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => true
      ],

      'index' => [
        'except'        => false,
        'fields'        => ['uuid'],
        'sortBy'        => 'uuid',
        'sortDirection' => 'ASC',
        'pagination'    => true
      ],

      'show' => [
        'except'        => false,
      ],

      'store' => [
        'except'        => false,
      ],

      'update' => [
        'except'        => false,
      ],

      'destroy' => [
        'except'        => false,
      ],

  ];

  // Get chats

  public function index(Request $request)
  {

      $type = $request->input('type');

      switch ($type) {
        case 'games':
          $chat = $this->indexGames($request);
          break;
        case 'uuid':
          $chat = $this->indexUuid($request);
          break;
        case 'private':
          $chat = $this->indexPrivate($request);
          break;
        default:
          $chat = null;
          break;
      }

     if($chat === 403)
       {
       return $this->respondForbidden();
       }

     if($chat === null)
       {
       return $this->respondBadRequest();
       }

     if ($request->input('elementId') !== null)
          {
              $messages = $chat->messages()->where('id','<',$request->input('elementId'))->orderBy('created_at','DESC')->take(10)->with('user');
          }
     else {
              $messages = $chat->messages()->orderBy('created_at','DESC')->take(10)->with('user');
          }

     if ($messages !== null && $chat->public === false)
            {

            event(new ChatMessageReadEvent($chat->uuid));

            $users = $chat->users()->get();

            if($users !== null)
              {
              $users->pluck('user.uuid')->each(function($uuid) use ($request){
                  event(new UserUpdateEvent($uuid));
              });
              }

            $messages->each(function($message) use ($request){
                $message->setRead($request->user->id);
            });
            }

     return $this->respondSuccess(['chat' => $chat->uuid,'public' => $chat->public, 'type' => $chat->pid_table, 'messages' => $messages->get()->toArray(),'timestamp' => time()]);

  }

  public function indexAll(Request $request)
  {

      $chat = Chat::where('pid_table','all')->where('pid',0)->first();

      if($chat === null)
        {
            $chat = Chat::create(['pid' => 0, 'pid_table' => 'all','public' => true]);
        }

      $chat->save();

      return $chat;
  }

  public function indexPrivate(Request $request)
  {

      $user = User::where('uuid',$request->input('uuid'))->first();

      $chat = Chat::where('pid_table','users')->where('pid',0)->whereHas('users', function($q) use ($request,$user){
          $q->whereIn('user_id',[optional($request->user)->id,optional($user)->id]);
      })->first();

      if($chat === null)
        {
            $chat = Chat::create(['pid' => 0, 'pid_table' => 'users','public' => false]);
            $chat->users()->save(new ChatUser(['chat_id' => $chat->id, 'user_id' => optional($request->user)->id]));
            $chat->users()->save(new ChatUser(['chat_id' => $chat->id, 'user_id' => optional($user)->id]));
        }

      $chat->save();

      return $chat;
  }

  public function indexUuid(Request $request)
  {

      $chat = Chat::where('uuid',$request->uuid)->where(function($query) use ($request){

          $query->where('public',true)
                ->orWhereHas('users', function($q) use ($request){
                    $q->where('user_id',optional($request->user)->id);
                });

      })->first();

      if($chat === null)
        {
            return 403;
        }

      $chat->save();

      return $chat;

  }

  public function indexGames(Request $request)
  {

      if($request->game === 'ALL')
        {
        return $this->indexAll($request);
        }

      $game = Game::where('uuid',$request->game)->first();

      if($game === null)
        {
        return null;
        }

      $chat = Chat::where('pid_table','games')->where('pid',$game->id)->first();

      if($chat === null)
        {
            $chat = Chat::create(['pid' => $game->id, 'pid_table' => 'games','public' => true]);
        }

      $chat->save();

      return $chat;

  }

  public function store(Request $request)
  {

      $chat = Chat::where('uuid',$request->chat)->first();

      if($chat !== null)
        {

            if($chat->public !== true)
              {

                  $user = ChatUser::where('chat_id',$chat->id)->where('user_id',$request->user->id)->first();

                  if($user === null)
                    {
                    return $this->respondForbidden();
                    }

              }

            $message = new ChatMessage([
                              'chat_id' => $chat->id,
                              'user_id' => $request->user->id,
                              'text'    => strip_tags($request->input('message'))
                           ]);

            $result         = $chat->messages()->save($message);

            event(new ChatMessageEvent($chat->uuid));

            $users = $chat->users()->get();

            if($users !== null)
              {
              $users->each(function($user) use ($request){
                  event(new UserUpdateEvent($user->uuid));
              });
              }

            if($result !== null)
              {
              return $this->respondSuccess(['message' => $result->toArray()]);
              }

        }

      return $this->respondForbidden();
  }

  // Delete the messages for the current user

  public function deleteMessages(Request $request, $uuid)
  {
      $user = $request->user;

      $chat = Chat::where('pid_table','users')->where('pid',0)->whereHas('users', function($q) use ($request,$user){
          $q->whereIn('user_id',[optional($request->user)->id,optional($user)->id]);
      })->first();

      if($chat !== null)
        {
            $messages = $chat->messages()->where('user_id', $user->id)->get();

            $messages->each(function($message){
               $message->delete();
            });

            return $this->respondSuccess();
        }

      return $this->respondBadRequest(_i('Fehler beim Löschen der Nachrichten!'));
  }

  public function exportMessages(Request $request, $uuid)
  {
      $user = $request->user;

      $chat = Chat::where('pid_table','users')->where('pid',0)->whereHas('users', function($q) use ($request,$user){
          $q->whereIn('user_id',[optional($request->user)->id,optional($user)->id]);
      })->first();

      if($chat !== null)
        {
            $url = ExportHelper::run('user',['uuid' => $uuid]);

            return $this->respondSuccess(['file' => $url]);
        }

      return $this->respondBadRequest(_i('Fehler beim Exporten der Nachrichten!'));
  }

  // TESTING

  public function testBroadcast(Request $request, $uuid)
  {
        event(new ChatMessageEvent($uuid));
        return $this->respondSuccess(['uuid' => $uuid]);
  }

}
