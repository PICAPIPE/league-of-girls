<?php

namespace App\Models\Chat;

use App\Models\BaseModel;

use Illuminate\Database\Eloquent\Model;

class Chat extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'chats';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'pid',
      'pid_table',
      'public'
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
      'public' => 'boolean'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [];

  // Messages

  public function messages()
  {
      return $this->hasMany('App\Models\Chat\ChatMessage');
  }

  // Users

  public function users()
  {
      return $this->hasMany('App\Models\Chat\ChatUser')->with('user');
  }

}
