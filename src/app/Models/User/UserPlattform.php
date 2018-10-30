<?php

namespace App\Models\User;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class UserPlattform extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users_plattforms';

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
      'plattform_id',
      'value',
      'public'
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
      'icon'
  ];

  /**
   * The attributes casted and transformed to real values
   *
   * @var array
   */
  protected $casts = [
      'plattform_id' => 'integer',
      'user_id'      => 'integer',
      'active'       => 'boolean',
      'public'       => 'boolean'
  ];

  public function plattform(){

      // Get permissions

      return $this->hasOne('App\Models\Esport\Plattform','id','plattform_id');

  }

  public function getIconAttribute()
  {

      $icon = optional($this->hasOne('App\Models\Esport\Plattform','id','plattform_id')->first())->icon;
      return $icon;

  }

}
