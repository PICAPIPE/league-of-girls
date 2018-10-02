<?php

namespace App\Models\Permissions;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class RolePermission extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'roles_permissions';

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
      'permission',
      'role_id'
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
      'role_id'     => 'integer'
  ];

  public function role(){

      // Get permissions

      return $this->hasOne('App\Permissions\Role');

  }

}
