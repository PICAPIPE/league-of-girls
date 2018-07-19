<?php

namespace App\Models\User;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class UserRole extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users_roles';

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
      'user_id',
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

  ];

  public function role(){

      // Get permissions

      return $this->hasOne('App\Models\Permissions\Role','id','role_id');

  }

}
