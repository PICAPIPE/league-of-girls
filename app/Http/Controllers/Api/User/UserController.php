<?php

namespace App\Http\Controllers\Api\User;

use StorageHelper;

use Validator;
use ValidationHelper;

use Carbon\Carbon;
use App\Models\User\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class UserController extends ApiController
{


  /***
  ** Get the current user data
  **/

  public function current(Request $request){

      $result = null;

      if($request->user === null){
         return $this->respondBadRequest('Keine Benutzerinformationen vorhanden.');
      }

      //$request->user->settings = $request->user->getSettings();
      $data                    = $request->all();

      $result                  = User::where('uuid',$request->user->uuid);

      $fields                  = $request->user->getRequestFields($request);

      if($fields !== null){

          $result = $result->select($fields);

      }

      $result = $result->first();

      if($result !== null)
        {
           $result->roles = $result->getRoles();
        }

      return $this->respondSuccess(['data' => $result]);

  }


}
