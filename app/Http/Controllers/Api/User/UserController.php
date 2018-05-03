<?php

namespace App\Http\Controllers\Api\User;

use Image;
use Storage;
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

      $result                  = User::where('uuid',$request->user->uuid)->with('games')->with('plattforms');

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

  /***
  ** Update the current user
  **/

  public function currentUpdate(Request $request)
  {

      $data = $request->all();
      $user = User::where('uuid',$request->user->uuid)->with('games')->first();

      if($user === null)
        {
            return $this->respondBadRequest();
        }

      // Validation of the element

      $validation = $user->validate($data,[],'update');

      if($validation->fails()){
          return $this->respondValidationFails($validation);
      }

      $user->update($data);

      if(isset($data['games']))
      {

        $games = $user->games()->get();

        $games->each(function($gameEntry) use ($data){

            $gameData = collect($data['games'])->where('game_id',$gameEntry->game_id)->first();;

            if($gameData !== null)
            {
              $gameEntry->active = $gameData['active'];
              $gameEntry->save();
            }

        });

      }

      if(isset($data['plattforms']))
      {

        $plattforms = $user->plattforms()->get();

        $plattforms->each(function($plattformEntry) use ($data){

            $plattformData = collect($data['plattforms'])->where('plattform_id',$plattformEntry->plattform_id)->first();;

            if($plattformData !== null)
            {
              $plattformEntry->value  = $plattformData['value'];
              $plattformEntry->active = $plattformData['active'];
              $plattformEntry->save();
            }

        });

      }

      $user = User::where('uuid',$request->user->uuid)->with('games')->with('plattforms')->first();

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

      return $this->respondSuccess();
  }

  /***
  ** Add a game relation to a user
  ***/

  public function currentAddGame(Request $request)
  {

      $user = User::where('id',$request->user->id)->first();

      if($user === null)
        {
           return $this->respondBadRequest();
        }

      if($user->games()->where('game_id',$request->input('game'))->count() > 0)
        {
            return $this->respondSuccess(['data' => $user->games()->where('game_id',$request->input('game'))->first()->toArray()]);
        }


      $entry = $user->games()->create([
          'game_id' => $request->input('game'),
          'user_id' => $user->id,
          'active'  => false
      ]);

      return $this->respondSuccess(['data' => $entry->toArray()]);

  }

  /***
  ** Add a plattform relation to a user
  ***/

  public function currentAddPlattform(Request $request)
  {

      $user = User::where('id',$request->user->id)->first();

      if($user === null)
        {
           return $this->respondBadRequest();
        }

      if($user->plattforms()->where('plattform_id',$request->input('plattform'))->count() > 0)
        {
            return $this->respondSuccess(['data' => $user->plattforms()->where('plattform_id',$request->input('plattform'))->first()->toArray()]);
        }


      $entry = $user->plattforms()->create([
          'plattform_id' => $request->input('plattform'),
          'user_id'      => $user->id,
          'value'        => '',
          'active'       => false
      ]);

      return $this->respondSuccess(['data' => $entry->toArray()]);

  }

}
