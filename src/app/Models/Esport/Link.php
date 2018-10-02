<?php

namespace App\Models\Esport;

use App\Models\BaseModel;
use App\Models\User\User;

use Illuminate\Database\Eloquent\Model;

class Link extends BaseModel
{

  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'links';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'type',
      'name',
      'icon',
      'placeholder',
      'help',
      'published'
  ];

  protected $validations = [

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
      'published' => 'boolean'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [];

  public function getValues()
  {
    $users = User::where('trusted',true)->pluck('id');
    return $this->hasMany('App\Models\User\UserLink','link_id','id')->whereIn('user_id',$users->toArray());
  }

}
