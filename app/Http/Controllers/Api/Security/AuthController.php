<?php

namespace App\Http\Controllers\Api\Security;

use DB;
use Hash;
use Route;
use Image;
use LaravelGettext;
use JWTAuth;
use Validator;
use ValidationHelper;
use Carbon\Carbon;

use App\Models\User\User;
use App\Models\User\UserRole;

use App\Models\Permissions\Role;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\ApiController;

class AuthController extends ApiController
{

    public function register(Request $request){

        $active = config('register.active',true);

        if($active === false)
        {
            return $this->respondNotAllowed(_i('Die Registrierung ist nicht erlaubt.'));
        }

        $result = DB::transaction(function() use ($request){

            $data       = $request->all();
            $model      = new User();

            // Validation of the element

            $validation = $model->validate($data);

            if($validation->fails()){

                return $this->respondValidationFails($validation);

            }

            // Hash passwords

            if(isset($data['password']) === true){
              $data['password'] = bcrypt($data['password']);
              unset($data['password2']);
            }

            // Bithdate correction

            if(isset($data['birthdate'])){
                $data['birthdate'] =  Carbon::parse($data['birthdate'], config('app.timezone'))->addDay(1);
            }
            else {
                $data['birthdate'] =  Carbon::parse(Carbon::now(), config('app.timezone'))->addDay(1);
            }

            $data['active']       = config('register.autoactive');
            $data['locked']       = false;
            $data['deleted']      = false;
            $data['loginAttemps'] = 0;

            unset($data['terms']);
            unset($data['gdpr']);

            // Create user elements

            $user = User::create($data);

            if($user !== null){

                // Set the roles

                $roles = Role::where('default',true)->pluck('name')->toArray();
                $user->setRoles($roles);

                // Respond with the success result

                return $this->respondSuccess(['data' => $user->toArray()]);

            }

            return $this->respondBadRequest();

        });

        return $result;

    }

    public function login(Request $request){

        $result = DB::transaction(function() use ($request){

           $msg_standard = _i('E-Mail Adresse oder Passwort stimmen nicht.');

           $data         = $request->all();

           $validation   = Validator::make($data, [
                'email'     => 'required|email',
                'password'  => 'required'
           ], ValidationHelper::getMessages());

           if($validation->fails()){

               return  $this->respondValidationFails($validation);

           }

           $user = User::withTrashed()->where('email',$request->input('email'))->first();

           if($user !== null){

               $loginAttemps = $user->loginAttemps;
               $loginAttemps += 1;

               if($user->deleted_at !== null){

                  $user->restore();

               }

               if($user->active === false){

                  return $this->respondLocked(_i('Benutzerkonto noch nicht aktiviert.'));

               }

               // Check if user is locked

               if($user->locked === true){

                  $wait       = 1;

                  $dt         = Carbon::parse(Carbon::now())->setTimezone(config('app.timezone'));
                  $dtCompare  = Carbon::parse($user->loginAttempTimestamp, config('app.timezone'));

                  if($dt->diffInMinutes($dtCompare) >= $wait){

                    // Reset the locked status

                    $loginAttemps = 1;

                    $user->locked = false;
                    $user->save();

                  } else {

                    // Account still locked

                    $user->loginAttemps         = $loginAttemps;
                    $user->loginAttempTimestamp = Carbon::parse(Carbon::now(), config('app.timezone'));
                    $user->save();

                    return $this->respondLocked(_n('Zu viele fehlerhafte Loginversuche. Konto wurde gesperrt. Bitte versuchen Sie es in %s Minute','Zu viele fehlerhafte Loginversuche. Konto wurde gesperrt. Bitte versuchen Sie es in %s Minuten',$wait,['minutes' => $wait]));

                  }

               }

               if (Hash::check($data['password'], $user->password))
               {

                 $user->loginAttemps         = 0;
                 $user->loginAttempTimestamp = Carbon::now();

                 $user->save();

                 $token = \JWTAuth::attempt([
                   'email'    => $data['email'],
                   'password' => $data['password']
                 ]);

                 return $this->respondSuccess(['data' => $user->toArray(),'token' => $token],[],strtolower(str_slug(config('app.name'),'_').'_auth'), $token);

               }
               else {

                  // Wrong passwords

                  if($loginAttemps > 3){

                      $user->locked           = true;

                  }

                  $user->loginAttemps         = $loginAttemps;
                  $user->loginAttempTimestamp = Carbon::now();

                  $user->save();

                  return $this->respondBadRequest($msg_standard);

               }

           }

           return $this->respondBadRequest($msg_standard);

        });

        return $result;

    }

    // Set authentication cookie

    public function cookie(Request $request){

      $cookieName = strtolower(str_slug(config('app.name'),'_').'_auth');
      $cookieVal  = $request->header('Authorization');

      $headers    = [
          'Access-Control-Allow-Credentials' => true
      ];

      return \Response::json(['status' => 200],200,$headers)->cookie($cookieName, $cookieVal, 5, '/',config('app.domain'), false, true);

    }

}
