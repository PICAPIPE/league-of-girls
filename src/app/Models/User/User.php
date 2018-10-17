<?php

namespace App\Models\User;

use SettingHelper;
use CacheHelper;
use SecurityHelper;

use App\Models\BaseModel;
use App\Models\Permissions\Role;
use App\Models\Files\FileEntry;

use App\Models\Chat\Chat;
use App\Models\Chat\ChatMessage;
use App\Models\Chat\ChatMessageRead;
use App\Models\Chat\ChatUser;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Emadadly\LaravelUuid\Uuids;
use Ramsey\Uuid\Uuid;

use App\Models\News\Point;

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
      'about',
      'trusted'
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
    'loginAttempTimestamp'
  ];

  /**
   * This attributes get added to the list / model
   *
   * @var array
   */

  protected $appends = [
      'points',
      'permissions',
      'myfriend'
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
      'avatar_id'     => 'integer',
      'trusted'       => 'boolean'
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

  // Plattforms

  public function plattforms()
  {
      return $this->hasMany('App\Models\User\UserPlattform');
  }

  // Communications

  public function communications()
  {
      return $this->hasMany('App\Models\User\UserCommunication');
  }

  // Communications

  public function links()
  {
      return $this->hasMany('App\Models\User\UserLink');
  }

  public function openRequests()
  {
      return $this->hasMany('App\Models\User\UserRequest','from_id','id')->where('declined',false)->where('accepted',false)->with('user');
  }

  // Requests

  public function friendRequests()
  {
      return $this->hasMany('App\Models\User\UserRequest')->where('declined',false)->where('accepted',false);
  }

  // My friendship requests

  public function myfriedsrequests ()
  {
      if (request()->user !== null)
           {
           return $this->hasMany('App\Models\User\UserRequest')->where('declined',false)->where('accepted',false)->where('from_id',request()->user->id);
           }

      return $this->hasMany('App\Models\User\UserRequest')->where('declined',false)->where('accepted',false)->where('from_id',0);

  }

  // Roles

  public function roles()
  {
      return $this->hasMany('App\Models\User\UserRole');
  }

  public function friends()
  {
      return $this->hasMany('App\Models\User\UserFriend');
  }

  public function categories()
  {
      return $this->hasMany('App\Models\User\UserCategory');
  }

  public function chats()
  {
      return Chat::where('public',false)->whereHas('users', function($q){
          $q->where('user_id',$this->id);
      });
  }

  public function messages($unread = null)
  {
      $chats = $this->chats()->pluck('id');

      $chatMessage = ChatMessage::whereIn('chat_id',$chats->toArray());

      if($unread !== null)
        {
        if($unread === true)
             {
             $chatMessage = $chatMessage->whereDoesntHave('messagesRead', function($q){
                $q->where('user_id',$this->id);
             });
             }
        else {
             $chatMessage = $chatMessage->whereHas('messagesRead', function($q){
                 $q->where('user_id',$this->id);
             });
             }
        }

      return $chatMessage;

  }

  // Get Roles as id array

  public function getRoles()
  {

    $rolesReturn = [];
    $roles       = $this->roles()->with(['role'])->get();

    $rolesReturn = $roles->pluck('role.name');

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

      if ($permissions->count() <= 1)
           {
           return $permissions;
           }

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
         $permissionsSearch !== null &&
         $permissions->count() > 0)
        {
          $permission_cnt = $permissions->intersect(collect($permissionsSearch))->count();
        }

      if      ($permission_cnt > 0)
              {
                $permission_found = true;
              }
      else if ($permissions                                   !== null &&
               in_array('Admin',$permissions->toArray())      === true &&
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

  public function getPermissionsAttribute()
  {
      $permissions = $this->getPermissions();

      return $permissions;
  }

  public function getPointsAttribute()
  {
      $points = Point::where('user_id',$this->id)->sum('amount');
      return $points;
  }

  public function getMyfriendAttribute()
  {
      return UserFriend::where('user_id',$this->id)->where('from_id',data_get(request()->user,'id',0))->count() > 0;
  }

  // Add points to users account

  public function addPoints($pid,$pid_table,$points)
  {
      Point::create([
          'pid'       => $pid,
          'pid_table' => $pid_table,
          'amount'    => $points,
          'user_id'   => $this->id
      ]);

  }

}
