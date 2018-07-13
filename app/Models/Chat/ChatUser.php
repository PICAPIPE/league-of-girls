<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Model;
use App\Models\BaseModel;

class ChatUser extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'chats_users';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'chat_id',
      'user_id',
  ];

  protected $validations = [
      'chat_id' => 'required',
      'user_id' => 'required'
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

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = ['created_at', 'updated_at', 'deleted_at'];

  // Games

  public function chat()
  {
      return $this->hasOne('App\Models\Chat\Chat');
  }

  public function user()
  {
      return $this->hasOne('App\Models\User\User','id','user_id')->select('username','id','uuid');
  }

}
