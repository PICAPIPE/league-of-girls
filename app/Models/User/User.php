<?php

namespace App\Models\User;

use SettingHelper;
use CacheHelper;
use SecurityHelper;

use App\Models\BaseModel;
use App\Models\Permissions\Role;
use App\Models\Files\FileEntry;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Emadadly\LaravelUuid\Uuids;
use Ramsey\Uuid\Uuid;

use App\Traits\ExtModel;

class User extends Authenticatable implements JWTSubject
{

  use SoftDeletes;
  use Uuids;
  use ExtModel;

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'email',
      'username',
      'firstname',
      'lastname',
      'birthdate',
      'gender',
      'avatar_id',
      'locked',
      'active',
      'password',
      'newsletter',
      'about'
  ];

  protected $validations = [
      'username'      => 'required',
      'email'         => 'required|email|max:255|unique:users',
      'password'      => 'required|min:8',
      'password2'     => 'required|min:8|same:password',
      'terms'         => 'required|accepted',
      'avatar_id'     => 'integer'
  ];

  protected $validationsUpdate = [
      'username'      => 'required|min:3'
  ];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [
    'password',
    'loginAttemps',
    'loginAttempTimestamp',
    'locked'
  ];

  /**
   * This attributes get added to the list / model
   *
   * @var array
   */

  protected $appends = [

  ];

  /**
   * The attributes casted and transformed to real values
   *
   * @var array
   */
  protected $casts = [
      'locked'        => 'boolean',
      'active'        => 'boolean',
      'newsletter'    => 'boolean',
      'loginAttemps'  => 'integer',
      'avatar_id'     => 'integer'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = ['deleted_at'];

  // Games

  public function games()
  {
      return $this->hasMany('App\Models\User\UserGame');
  }

  // Roles

  public function roles()
  {
      return $this->hasMany('App\Models\User\UserRole');
  }

  // Get Roles as id array

  public function getRoles()
  {

    $rolesReturn = [];
    $roles       = $this->roles()->with(['role'])->get();

    $rolesReturn = $roles->pluck('role.id');

    // Add Standard role to the user roles

    if($rolesReturn->contains(config('user.standardRole')) === false)
      {
          $rolesReturn->push(config('user.standardRole'));
      }

    return $rolesReturn;

  }

  // Set roles for the user

  public function setRoles($roles = [])
  {

     $rolesPermissionsToUpdate = Role::whereIn('name',$roles);
     $rolesPermissionsToDelete = $this->roles()->whereNotIn('role_id',$rolesPermissionsToUpdate->pluck('id')->toArray())->where('user_id',$this->id);

     UserRole::whereIn('role_id',$rolesPermissionsToDelete->pluck('id')->toArray())->where('user_id',$this->id)->delete();

     $diff                     = array_intersect($rolesPermissionsToUpdate->pluck('name')->toArray(),$roles);

     if (sizeOf($diff) > 0)
        {
            collect($diff)->each(function($roleName) use ($rolesPermissionsToUpdate){

                $role = Role::where('name',$roleName)->first();

                UserRole::create([
                  'user_id' => $this->id,
                  'role_id' => $role->id
                ]);

            });
        }

  }

  // Get persmissions as array

  public function getPermissions()
  {

      $roles = Role::where(function($query){

        $query->whereIn('id',$this->roles()->pluck('role_id'));

      })->with('permissions')->get();

      $permissions = $roles->map(function($role){

          $permissionData = $role->permissions->pluck('permission');

          if(sizeOf($permissionData) > 0)
            {
              return $permissionData[0];
            }

      })->filter(function($item){
        if($item !== null)
          {
            return $item;
          }
      });

      return $permissions->unique();

  }

  // Shorthand for permission check

  public function is($permissionsSearch = null)
  {
      return $this->hasPermission($permissionsSearch);
  }

  // Check permission for the user

  public function hasPermission($permissionsSearch = null)
  {

      $permission_cnt   = 0;
      $permission_found = false;
      $permissions      = $this->getPermissions();

      if($permissions       !== null &&
         $permissionsSearch !== null)
        {
          $permission_cnt = $permissions->intersect(collect($permissionsSearch))->count();
        }

      if      ($permission_cnt > 0)
              {
                $permission_found = true;
              }
      else if (in_array('Admin',$permissions->toArray())      === true &&
               SecurityHelper::isSuperAdminPermissionActive() === true)
              {
                 $permission_found = true;
              }

      return $permission_found;

  }

  // Get getJWTIdentifier

  public function getJWTIdentifier()
  {
      return $this->getKey();
  }

  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims()
  {
      return [];
  }

  // Get avatar path

  public function getAvatarAttribute()
  {
      return null;
  }

}
