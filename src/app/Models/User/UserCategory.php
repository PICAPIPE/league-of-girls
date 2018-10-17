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
  protected $table = 'users_categories';

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
      'category_id'
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
      'categoryName'
  ];

  /**
   * The attributes casted and transformed to real values
   *
   * @var array
   */
  protected $casts = [
      'user_id' => 'integer',
      'category_id' => 'integer'
  ];

  public function category(){

      // Get permissions

      return $this->hasOne('App\Models\Esport\Category','id','category_id');

  }

  public function user(){

      // Get permissions

      return $this->hasOne('App\Models\User\User','id','user_id');

  }

  public function getCategoryNameAttribute()
  {
      $label = optional($this->hasOne('App\Models\Esport\Category','id','game_id')->first())->label;
      return $label;
  }

}
