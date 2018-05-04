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

      $result                  = User::where('uuid',$request->user->uuid)->with('games')->with('plattforms')->with('communications')->with('links');

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

            if($communicationData !== null)
            {
              $communicationEntry->active = $communicationData['active'];
              $communicationEntry->value  = $communicationData['value'];
              $communicationEntry->save();
            }

        });

      }

      // Update links

      if(isset($data['links']))
      {

        $links = $user->links()->get();

        $links->each(function($linkEntry) use ($data){

            $linkData = collect($data['links'])->where('link_id',$linkEntry->link_id)->first();

            if($linkData !== null)
            {
              $linkEntry->active = $linkData['active'];
              $linkEntry->value  = $linkData['value'];
              $linkEntry->save();
            }

        });

      }

      // Plattforms

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

      $entry = $user->$methodName()->create([
          $pid           => $request->input($input),
          'user_id'      => $user->id,
          'value'        => '',
          'active'       => false
      ]);

      return $this->respondSuccess(['data' => $entry->toArray()]);
  }

}
