<?php

namespace App\Models\User;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users_requests';

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
      'from_id',
      'declined',
      'accepted',
      'read'
  ];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [
    'created_at',
    'updated_at'
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
      'user_id'          => 'integer',
      'from_id'          => 'integer',
      'declined'         => 'boolean',
      'accepted'         => 'boolean',
      'read'             => 'boolean'
  ];

  public function user()
  {
      return $this->hasOne('App\Models\User\User','id','user_id');
  }

  public function from()
  {
      return $this->hasOne('App\Models\User\User','id','from_id');
  }

}
