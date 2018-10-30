<?php

namespace App\Http\Controllers\Api\Chat;

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

class MessageController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\Chat\ChatMessage::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => true
      ],

      'index' => [
        'except'        => true,
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

  // Delete a messsage

  public function destroy(Request $request, $uuid)
  {
    $message = ChatMessage::where('uuid',$uuid)->first();

    if($message === null)
        {
        return $this->respondBadRequest(_i('Löschen fehlgeschlagen.'));
        }

    $allowed = $request->user->is(['Admin']) || $message->user_id == $request->user->id;

    if($allowed == true)
        {
        $message->delete();
        return $this->respondSuccess(['data' => ['id' => $message->id]]);
        }

    return $this->respondBadRequest(_i('Löschen fehlgeschlagen.'));
  }

  // Report message

  public function report(Request $request, $uuid)
  {
    $message = ChatMessage::where('uuid',$uuid)->first();

    if($message === null)
        {
        return $this->respondBadRequest(_i('Nachricht nicht gefunden!'));
        }

    $message->reported = true;
    $message->save();
    return $this->respondSuccess(['data' => ['id' => $message->id]]);
  }


}
