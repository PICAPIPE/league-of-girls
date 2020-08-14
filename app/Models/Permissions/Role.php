<?php

namespace App\Models\Permissions;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class Role extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'roles';

  /**
   * Log model interactions
   *
   * @var string
   */
  protected $logable = true;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'uuid',
      'name',
      'default',
      'active'
  ];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [

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
      'default'     => 'boolean',
      'active'      => 'boolean'
  ];

  public function permissions(){

      // Get permissions

      return $this->hasMany('App\Models\Permissions\RolePermission');

  }

  public function setPermissions($arr = []){

      $permissionsToDelete = $this->permissions()->whereNotIn('permission',$arr)->where('role_id',$this->id)->delete();
      $permissionsToUpdate = $this->permissions()->whereIn('permission',$arr)->where('role_id',$this->id)->get();

      $names               = $permissionsToUpdate->pluck('permission')->toArray();
      $create              = collect(array_diff($arr,$names));

      $create->each(function($createItem){

          RolePermission::create(['permission' => $createItem, 'role_id' => $this->id]);

      });

  }

}
