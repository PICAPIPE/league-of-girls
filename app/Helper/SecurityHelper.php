<?php

namespace App\Helper;

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

      }

      return $authorized;

    }

    // Check the client policy

    public static function checkClientPolicy($user = null,$client = null,$role = null)
    {
        return self::checkPolicy('clients-checkRole',$user,[$client,$role]);
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

    public static function checkPermission(User $user,$permission = null,$method = 'read')
    {

          $allow = null;

          // Check if total security testing is active

          if(config('security.check') === false)
            {
                  $allow = true;
                  return $allow;
            }

          // If no permission to check is available

          if($permission === null)
            {
               return $allow;
            }

          // Check if the user is super admin - than permissioncheck is always true

          if(config('security.superadminpermission') === true && $user->is(['Admin']) === true)
            {
                return true;
            }

          // Check by permission type

          switch($permission->type)
          {

              case 'user':

                if(optional($permission)->$method === true && $user->id === $permission->pid)
                  {
                      $allow = true;
                  }

                break;

              case 'role':

                $roles = $user->roles()->pluck('id')->toArray();

                if(in_array($permission->pid,$roles) === true && optional($permission)->$method === true)
                  {
                     $allow = true;
                  }

                break;

              case 'client_role':

                if($user->hasClientPermissionByRoleId($permission->pid) === true)
                  {
                     $allow = true;
                  }

                break;

          }

          return $allow;

    }

}
