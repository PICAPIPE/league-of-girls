<?php

namespace App\Http\Controllers\Api\User;

use Carbon\Carbon;

use App\Models\User\UserFriend;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class FriendRequestController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\User\UserRequest::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => true,
      ],

      'index' => [
        'except'        => true,
      ],

      'show' => [
        'except'        => true,
      ],

      'store' => [
        'except'        => true,
      ],

      'update' => [
        'except'        => false,
      ],

      'destroy' => [
        'except'        => true,
      ]

  ];

  // Update a user request

  public function update(Request $request, $uuid)
  {

      if($this->isAvailable($request) === false)
      {
          return $this->respondNotAllowed();
      }

      $map             = $this->getMap($this->getName($request));
      $md              = $this->getModel($map);
      $mdClass         = new $md();
      $fields          = data_get($map,'fields', $mdClass->getFillable());

      $modelData       = $md::where('uuid',$uuid)->with('from')->with('user')->first();

      if(optional($request->user)->uuid === null)
        {
           return $this->respondUnauthorized();
        }

      if(optional($modelData->user)->uuid !== optional($request->user)->uuid)
        {
           return $this->respondForbidden();
        }

      $data = $request->all();

      if(data_get($data,'accepted',false) === true)
      {

          // Create the request

          $modelData->read     = true;
          $modelData->accepted = true;
          $modelData->declined = false;
          $modelData->save();

          $modelData->accept();

      }
      else
      {

          $modelData->read     = true;
          $modelData->accepted = false;
          $modelData->declined = true;
          $modelData->save();

      }

      return $this->respondSuccess();

  }

}
