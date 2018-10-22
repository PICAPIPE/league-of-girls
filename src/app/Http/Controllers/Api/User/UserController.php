<?php

namespace App\Http\Controllers\Api\User;

use DB;
use Image;
use Storage;
use StorageHelper;
use ExportHelper;

use Validator;
use ValidationHelper;

use App\Models\Esport\Game;
use App\Models\Esport\Communication;
use App\Models\Esport\Plattform;
use App\Models\Esport\Category;

use App\Models\User\User;
use App\Models\User\UserGame;
use App\Models\User\UserPlattform;
use App\Models\User\UserCommunication;
use App\Models\User\UserFriend;
use App\Models\User\UserRequest;
use App\Models\User\UserCategory;

use App\Models\Chat\Chat;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class UserController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\User\User::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => ['username','uuid','id'],
        'sortBy'        => 'username',
        'sortDirection' => 'ASC',
        'with'          => [],
        'wheres'        => [
           'filterGame',
           'filterConnection'
        ],
        'wheresAreOr'   => true,
        'getData'       => 'getUserData'
      ],

      'index' => [
        'except'        => false,
        'fields'        => ['username','uuid','id'],
        'sortBy'        => 'username',
        'sortDirection' => 'ASC',
        'pagination'    => true,
        'with'          => ['games','communications','links','myfriedsrequests','categories'],
        'wheres'        => [
            'filterGame',
            'filterConnection',
            'filterStatus'
        ],
        'wheresAreOr'   => true,
        'getData'       => 'getUserData',
        'hidden'        => [],
        'postMap'   => [
            'filterData'
        ]
      ],

      'show' => [
        'except'        => false,
        'with'          => ['games','communications','plattforms','categories'],
        'postMap'       => [
            'filterDataSingle'
        ]
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

  // Update user information

  public function update(Request $request, $uuid)
  {

      $user = User::where('uuid',$uuid)->first();

      if($user === null)
           {
           return $this->respondBadRequest();
           }

      if ($user->id !== $request->user->id && $request->user->is(['Admin']) === false)
           {
           return $this->respondBadRequest();
           }

      $data = $request->all();
      $user->update($data);

      return $this->show($request,$uuid);

  }

  /***
  ** Get the current user data
  **/

  public function current(Request $request){

      $result = null;

      if($request->user === null){
         return $this->respondBadRequest('Keine Benutzerinformationen vorhanden.');
      }

      $data                    = $request->all();

      $result                  = User::where('uuid',$request->user->uuid)->with(['games','plattforms','communications','links','friends','friends.from','openRequests','categories']);

      $fields                  = $request->user->getRequestFields($request);

      if($fields !== null){

          $result = $result->select($fields);

      }

      $result                 = $result->first();
      $result->count          = [
        'friendrequests' => $result->friendRequests()->count(),
        'messages'      => $result->messages(true)->count()
      ];

      if($result !== null)
        {
           $result->roles = $result->getRoles();

        }

      return $this->respondSuccess(['data' => $result]);

  }

  /***
  ** Update the current user
  **/

  public function currentUpdate(Request $request)
  {

      $data = $request->all();
      $user = User::where('uuid',$request->user->uuid)->first();

      if($user === null)
        {
            return $this->respondBadRequest();
        }

      // Validation of the element

      $validation = $user->validate($data,[],'update');

      if($validation->fails()){
          return $this->respondValidationFails($validation);
      }

      if(isset($data['gender']) === false || $data['gender'] === '')
          {
          $data['gender'] = config('user.standardGender');
          }

      if(isset($data['password']) || isset($data['password2'])){

        $validation = Validator::make($data, [
          'password'      => 'required|min:8',
          'password2'     => 'required|min:8|same:password',
        ],ValidationHelper::getMessages());

        if($validation->fails()){
            return $this->respondValidationFails($validation);
        }

        $data['password'] = bcrypt($data['password']);
        unset($data['password2']);
      }
      else
      {
        unset($data['password']);
        unset($data['password2']);
      }

      $user->update($data);

      // Update games

      if(isset($data['games']))
      {

        $games = $user->games()->get();

        $games->each(function($gameEntry) use ($data){

            $gameData = collect($data['games'])->where('game_id',$gameEntry->game_id)->first();;

            if($gameData !== null)
            {
              $gameEntry->active = $gameData['active'];
              if (isset($gameData['skill'])          === true &&
                  isset($gameData['skill']['skill']) === true)
                    {
                    $gameEntry->skill  = $gameData['skill']['skill'];
                    }
              $gameEntry->save();
            }

        });

      }

      // Update communications

      if(isset($data['communications']))
      {

        $communications = $user->communications()->get();

        $communications->each(function($communicationEntry) use ($data){

            $communicationData = collect($data['communications'])->where('communication_id',$communicationEntry->communication_id)->first();

            $communicationEntry->active = $communicationData['active'];
            if($communicationData !== null && isset($communicationData['value']))
            {
              $communicationEntry->value  = $communicationData['value'];
            }
            else
            {
              $communicationEntry->value  = '';
              $communicationEntry->active = false;
            }

            if($communicationData !== null && isset($communicationData['public']))
            {
              $communicationEntry->public  = $communicationData['public'];
            }

            $communicationEntry->save();

        });

      }

      // Update links

      if(isset($data['links']))
      {

        $links = $user->links()->get();

        $links->each(function($linkEntry) use ($data){

            $linkData = collect($data['links'])->where('link_id',$linkEntry->link_id)->first();

            $linkEntry->active = $linkData['active'];
            if($linkData !== null && isset($linkData['value']))
            {
              $linkEntry->value  = $linkData['value'];
            }
            else
            {
              $linkEntry->value  = '';
              $linkEntry->active = false;
            }

            if($linkData !== null && isset($linkData['allow_crawler']))
            {
              $linkEntry->allow_crawler  = $linkData['allow_crawler'];
            }

            $linkEntry->save();

        });

      }

      // Plattforms

      if(isset($data['plattforms']))
      {

        $plattforms = $user->plattforms()->get();

        $plattforms->each(function($plattformEntry) use ($data){

            $plattformData = collect($data['plattforms'])->where('plattform_id',$plattformEntry->plattform_id)->first();;

            $plattformEntry->active = $plattformData['active'];
            if($plattformData !== null && isset($plattformData['value']))
            {
              $plattformEntry->value  = $plattformData['value'];
            }
            else
            {
              $plattformEntry->value  = '';
              $plattformEntry->active = false;
            }

            if($plattformData !== null && isset($plattformData['public']))
            {
              $plattformEntry->public  = $plattformData['public'];
            }

            $plattformEntry->save();

        });

      }

      // Plattforms

      if(isset($data['categories']))
      {

        $categories = $user->categories()->get();

        $categories->each(function($categoryEntry) use ($data){

            $categoryData = collect($data['categories'])->where('category_id',$categoryEntry->category_id)->first();;

            $categoryEntry->active = data_get($categoryData,'active', false);
            $categoryEntry->save();

        });

      }

      $user = User::where('uuid',$request->user->uuid)->with('games')->with('plattforms')->with('communications')->with('links')->first();

      return $this->respondSuccess(['data' => $user->toArray()]);
  }

  /***
  ** Update the current user avatar
  **/

  public function currentUploadAvatar(Request $request)
  {

      $disk        = 'avatars';
      $path        = null;
      $file        = $request->file('file');
      $fileNameNew = $request->user->uuid.'.png';

      Image::make($file)->resize(null, 220, function ($constraint) {
          $constraint->aspectRatio();
      })->resizeCanvas(220, 220)->save(Storage::disk($disk)->path($fileNameNew));

      $request->user->avatar_id = 0;
      $request->user->save();

      return $this->respondSuccess();
  }

  /***
  ** Add a game relation to a user
  ***/

  public function currentAddGame(Request $request)
  {
      return $this->addRelationEntries($request,'games','game_id','game');
  }

  /***
  ** Add a plattform relation to a user
  ***/

  public function currentAddPlattform(Request $request)
  {
      return $this->addRelationEntries($request,'plattforms','plattform_id','plattform');
  }

  /***
  ** Add a category relation to a user
  ***/

  public function currentAddCategory(Request $request)
  {
      return $this->addRelationEntries($request,'categories','category_id','category');
  }

  /***
  ** Add a communication relation to a user
  ***/

  public function currentAddCommunication(Request $request)
  {
      return $this->addRelationEntries($request,'communications','communication_id','communication');
  }

  /***
  ** Add a link relation to a user
  ***/

  public function currentAddLink(Request $request)
  {
      return $this->addRelationEntries($request,'links','link_id','link');
  }

  // Helper function to create a relation entry

  protected function addRelationEntries(Request $request,$methodName,$pid,$input)
  {
      $user = User::where('id',$request->user->id)->first();

      if($user === null)
        {
           return $this->respondBadRequest();
        }

      if($user->$methodName()->where($pid,$request->input($input))->count() > 0)
        {
            return $this->respondSuccess(['data' => $user->$methodName()->where($pid,$request->input($input))->first()->toArray()]);
        }


      if($methodName === 'games')
        {
            $entry = $user->$methodName()->create([
                $pid           => $request->input($input),
                'user_id'      => $user->id,
                'skill'        => 'beginner',
                'active'       => false
            ]);
        }
      else
        {
            $entry = $user->$methodName()->create([
                $pid           => $request->input($input),
                'user_id'      => $user->id,
                'value'        => '',
                'active'       => false
            ]);
        }

      return $this->respondSuccess(['data' => $entry->toArray()]);
  }

  // Filter

  protected function filterGame(Request $request,$model)
  {

      $game  = $request->input('game');
      $skill = $request->input('skill');

      if($game !== null && $game !== 'ALL')
        {
            $model = $model->where(function($query) use ($game,$skill) {

                $userIds = UserGame::where(function($queryGame) use ($game){
                    $games = Game::where('uuid',$game)->pluck('id');
                    $queryGame->whereIn('game_id',$games);
                })->where('active',true);

                if($skill !== null)
                  {
                      $userIds = $userIds->where('skill',$skill);
                  }

                $userIds = $userIds->pluck('user_id');

                $query->whereIn('id',$userIds);

            });
        }

      return $model;
  }

  // Filter locked users / inactive

  protected function filterStatus(Request $request, $model)
  {
      $model = $model->where('locked',false)->where('active',true);
      return $model;
  }

  // Filter user (friends or not)

  protected function filterConnection(Request $request, $model)
  {

      $connected = $request->input('connected') === 'true';

      if($request->user === null)
        {
           return $model;
        }

      $model =  $model->where(function($query) use ($connected,$request)
      {

          $userIds = User::where('id',$request->user->id)->first()->friends()->pluck('from_id')->toArray();

          if($connected === true)
                {
                    $query->whereIn('id', array_unique($userIds));
                }

      });

      return $model;
  }

  // Filter data if not allowed (multiple entries)

  protected function filterData($data,$request)
  {

      $friends = optional($request->user)->friends;

      if($friends === null)
        {
            $friends = [];
        }
      else
        {
           $friends = $friends->pluck('from.uuid')->toArray();
        }

      $data = $data->map(function($item) use ($request,$friends){

          if(in_array($item->uuid,$friends) === false && optional($request->user)->uuid !== $item->uuid)
          {

               // Filter data

               if(optional($item)->communications !== null)
                 {
                      $item->communications = $item->communications->map(function($communication){
                          $communication->value = '';
                          return $communication;
                      });
                 }

               if(optional($item)->plattforms !== null)
                 {
                      $item->plattforms = $item->plattforms->map(function($plattform){
                          $plattform->value = '';
                          return $plattform;
                      });
                 }

          }

          return $item;

      });

      return $data;

  }

  // Filter data if not allowed (single entry)

  protected function filterDataSingle($data,$request)
  {

      $friends = optional($request->user)->friends;

      if($friends === null)
        {
            $friends = [];
        }
      else
        {
           $friends = $friends->pluck('from.uuid')->toArray();
        }

      $data->communications = $data->communications->map(function($communication){
        $communitionInformation = $communication->communication()->first();
        if ($communitionInformation !== null)
              {
              $communication->action = $communitionInformation->action;
              }
        return $communication;
      });

      $data->plattforms = $data->plattforms->map(function($plattform){
        $plattformInformation = $plattform->plattform()->first();
              if ($plattformInformation !== null)
                    {
                    $plattform->action = $plattformInformation->action;
                    }
        return $plattform;
      });

      if(in_array($data->uuid,$friends) === false && optional($request->user)->uuid !== $data->uuid)
        {

             // Filter data

             if(optional($data)->communications !== null)
               {
                    $data->communications = $data->communications->map(function($communication){
                        if (isset($communication->public) && $communication->public === true)
                             {
                             return $communication;
                             }
                        $communication->value = '';
                        return $communication;
                    });
               }

             if(optional($data)->plattforms !== null)
               {
                    $data->plattforms = $data->plattforms->map(function($plattform){
                        if ($plattform->public === true)
                              {
                              return $plattform;
                              }
                        $plattform->value = '';
                        return $plattform;
                    });
               }

        }

      return $data;

  }

  // Get data

  public function getUserData($md, Request $request)
  {
        $input   = $request->input('communications');
        $input2  = $request->input('plattforms');
        $input3  = $request->input('genders');
        $input4  = $request->input('categories');

        $values  = [];
        $values2 = [];
        $values3 = [];
        $values4 = [];

        $modelData = null;

        if($input !== null)
          {

              $values = collect(explode(',',$input))->map(function($item){
                  $item = intval($item);
                  return $item;
              });

              $modelData = $md::where(function($query) use ($values) {

                $userIds = UserCommunication::where(function($queryGame) use ($values){
                    $communications = Communication::whereIn('id',$values)->pluck('id');
                    $queryGame->whereIn('communication_id',$communications);
                })->where('active',true)->pluck('user_id');

                $query->whereIn('id',$userIds);

              });

          }

        if($input2 !== null)
          {

              $values2 = collect(explode(',',$input2))->map(function($item){
                  $item = intval($item);
                  return $item;
              });

              if($input === null)
              {
                  $modelData = $md::where(function($query) use ($values2) {

                    $userIds = UserPlattform::where(function($queryGame) use ($values2){
                        $communications = Plattform::whereIn('id',$values2)->pluck('id');
                        $queryGame->whereIn('plattform_id',$communications);
                    })->where('active',true)->pluck('user_id');

                    $query->whereIn('id',$userIds);

                  });
              }
              else
              {
                  $modelData = $modelData->orWhere(function($query) use ($values2) {

                    $userIds = UserPlattform::where(function($queryGame) use ($values2){
                        $communications = Plattform::whereIn('id',$values2)->pluck('id');
                        $queryGame->whereIn('plattform_id',$communications);
                    })->where('active',true)->pluck('user_id');

                    $query->whereIn('id',$userIds);

                  });
              }

          }

        // Gender

        if($input3 !== null)
           {
           $values3 = collect(explode(',',$input3));

           if($input === null && $input2 === null)
                {
                $modelData = $md::whereIn('gender',$values3->toArray());
                }
           else {
                $modelData = $modelData->orWhereIn('gender',$values3->toArray());
                }
           }


        if($input4 !== null)
           {
           $values4 = collect(explode(',',$input4));

           if($input === null && $input2 === null && $input3 === null)
                {
                $modelData = $md::where(function($query) use ($values4) {

                    $userIds = UserCategory::where(function($queryCategory) use ($values4){
                        $categories = Category::whereIn('key',$values4)->pluck('id');
                        $queryCategory->whereIn('category_id',$categories);
                    })->where('active',true)->pluck('user_id');

                    $query->whereIn('id',$userIds);

                  });
                }
           else {
                $modelData = $modelData->orWhere(function($query) use ($values4) {

                    $userIds = UserCategory::where(function($queryCategory) use ($values4){
                        $categories = Category::whereIn('key',$values4)->pluck('id');
                        $queryCategory->whereIn('category_id',$categories);
                    })->where('active',true)->pluck('user_id');

                    $query->whereIn('id',$userIds);

                });
                }
           }


        if($modelData === null)
           {
           $modelData = $md::where('id','>',0);
           }

      return $modelData;

  }

  // Create a friend request

  public function requestConnection(Request $request, $uuid)
  {

        $user = User::where('uuid',$uuid)->first();

        if($user === null)
          {
              return $this->respondBadRequest();
          }

        if($user->uuid === $request->user->uuid)
          {
              return $this->respondBadRequest(_i('Anfrage an sich selbst ist nicht möglich.'));
          }

        $friend = UserFriend::where('user_id',$user->id)->where('from_id',$request->user->id)->first();

        if($friend !== null)
          {
              return $this->respondBadRequest(_i('Es besteht bereits eine Verknüpfung.'));
          }

        $connectionRequest = UserRequest::where('user_id',$user->id)->where('from_id',$request->user->id)->where('declined',false)->where('accepted',false)->first();

        if($connectionRequest !== null)
          {
              return $this->respondBadRequest(_i('Es besteht bereits eine Anfrage.'));
          }

        $userRequest = UserRequest::where('from_id',$user->id)->where('user_id',$request->user->id)->where('declined',false)->where('accepted',false)->first();

        if($userRequest !== null)
          {

          $userRequest->accepted = true;
          $userRequest->read     = true;
          $userRequest->save();

          // Create friendship

          $userRequest->accept();

          return $this->respondSuccess(['refresh' => true]);
          }

        UserRequest::create([
            'user_id' => $user->id,
            'from_id' => $request->user->id
        ]);

        return $this->respondSuccess();

  }

  // Get my friend requests

  public function currentConnectionRequest(Request $request)
  {
      $connectionRequests = UserRequest::where('user_id',$request->user->id)->where('declined',false)->where('accepted',false)->with('from')->with('from.games')->with('from.communications')->get();

      return $this->respondSuccess(['data' => $connectionRequests->toArray()]);

  }

  // Get the current users chats

  public function currentChats(Request $request)
  {
      $unread = null;

      if($request->input('read') === 'true')
          {
          $unread = true;
          }
      else if($request->input('read') === 'false')
          {
          $unread = false;
          }

      $chats = Chat::whereIn('id',array_unique(optional($request->user)->messages($unread)->pluck('chat_id')->toArray()))->get();

      $chats = $chats->map(function($chat){

          $chat->message = $chat->messages()->with('user')->orderBy('id', 'DESC')->first();

          return $chat;

      });

      return $this->respondSuccess(['data' => $chats->toArray()]);

  }

  // Export all data to this user

  public function currentExport(Request $request)
  {
    $files   = [];
    $files[] = ExportHelper::run('user',     ['user' => $request->user]);
    $files[] = ExportHelper::run('userchats',['user' => $request->user]);

    return $this->respondSuccess(['files' => $files]);
  }

  // Delete the complete user

  public function currentDeleteAccount(Request $request)
  {
        $result = DB::transaction(function() use ($request){

            $userId   = $request->user->id;
            $userUUID = $request->user->uuid;

            DB::delete('delete from users where id = ?',[$userId]);

            Storage::disk('avatars')->delete($userUUID.'.png');

            return $this->respondSuccess();

        });

        return $result;
  }

  protected function withHookCommunications($query)
  {
      return $query;
  }

}
