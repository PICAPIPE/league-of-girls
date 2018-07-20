<?php

namespace App\Helper;

use Auth;
use Cookie;
use Gate;
use JWTAuth;
use Carbon\Carbon;

use App\Models\User\User;
use App\Models\Permissions\Role;
use App\Models\Clients\ClientRole;

use Illuminate\Http\Request;

class SecurityHelper
{

    protected static $superAdminActive = null;

    // Returns the information if super admin permission will be checked

    public static function isSuperAdminPermissionActive(){

        if(self::$superAdminActive !== null)
          {
              return self::$superAdminActive;
          }

        return config('security.superadminpermission');

    }

    /// Set the flag if super admin permission will be checked in policy control

    public static function setIsSuperAdminPermissionActive($active){
        self::$superAdminActive = $active;
        return self::$superAdminActive;
    }

    // Reset the flag to the config data

    public static function resetIsSuperAdminPermissionActive(){
          self::$superAdminActive = null;
          return self::isSuperAdminPermissionActive();
    }

    public static function authorizedSafe(Request $request){

          $authorized   = false;
          $authCookie   = strtolower(str_slug(config('app.name'),'_').'_auth');

          $token           = $request->cookie($authCookie);
          $tokenFromHeader = $request->header('Authorization');

          if($tokenFromHeader !== null && $token === null)
            {
                $token = str_replace('Bearer ','',$tokenFromHeader);
            }

          try {

        		if ($token !== null)
               {
                    $request->token = $token;
               }

               $authorized = self::authorized($request);

        	} catch (\Exception $e) {

              $authorized = false;

          }

          return $authorized;

    }

    // Checks if the user is logged into the system

    public static function authorized(Request $request){

      $authorized   = false;
      $user         = null;

      // Try JWT-Authentication

      if   (isset($request->token) === true && $request->token !== null)
           {
                $request->headers->add(['Authorization'=>'Bearer '.$request->token]);
                $user  = JWTAuth::parseToken()->toUser();
           }
      else {
                $user = JWTAuth::parseToken()->toUser();
           }

      $request->user = $user;

      if($user !== null && $user !== false){

        $authorized = true;

        // If account is soft deleted

        if($user->deleted_at !== null){
            $authorized = false;
        }

        if($user->locked === true)
        {
            $authorized = false;
        }

      }

      return $authorized;

    }

    // Check the policy for a user

    public static function checkPolicy($policyName = null, $user = null, $more = array()){

      $allow = false;

      if(is_array($user) === true &&
         empty($user)    === true)
        {
          $user = null;
        }

      if($user                                 !== null &&
         self::isSuperAdminPermissionActive()  === true &&
         $user->hasPermission(['Admin'])       === true)
         {
            $allow = true;
            return $allow;
         }

      $allow = Gate::forUser($user)->allows($policyName,$more);

      return $allow;

    }

    // Check a permission object (file/folder) for a user and method

    public static function checkPermission(User $user,$permisssions = [])
    {

          $allow = false;

          // Check if total security testing is active

          if(config('security.check') === false)
            {
                  $allow = true;
                  return $allow;
            }

          // Check if the user is super admin - than permissioncheck is always true

          if(config('security.superadminpermission') === true && $user->is(['Admin']) === true)
            {
                return true;
            }

          $allow = $user->hasPermission($permissions);

          return $allow;

    }

}
