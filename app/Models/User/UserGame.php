<?php

namespace App\Models\User;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class UserGame extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users_games';

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
      'game_id',
      'active'
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
      'active'  => 'boolean',
      'user_id' => 'integer',
      'game_id' => 'integer'
  ];

  public function role(){

      // Get permissions

      return $this->hasOne('App\Models\Esport\Game','id','game_id');

  }

  public function user(){

      // Get permissions

      return $this->hasOne('App\Models\User\User','id','user_id');

  }

}
