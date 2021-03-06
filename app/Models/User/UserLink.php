<?php

namespace App\Models\User;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class UserLink extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'users_links';

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
      'link_id',
      'value',
      'allow_crawler'
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
      'link_id'          => 'integer',
      'user_id'          => 'integer',
      'active'           => 'boolean',
      'allow_crawler'    => 'boolean'
  ];

  public function link(){

      // Get permissions

      return $this->hasOne('App\Models\Esport\Link','id','link_id');

  }

  public function user(){

      // Get permissions

      return $this->hasOne('App\Models\User\User','id','user_id');

  }

}
