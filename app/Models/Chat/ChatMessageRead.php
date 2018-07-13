<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Model;
use App\Models\BaseModel;

class ChatMessageRead extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'chats_messages_read';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'message_id',
      'user_id',
  ];

  protected $validations = [
      'message_id' => 'required',
      'user_id'    => 'required'
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
      'created'
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

  public function messgage()
  {
      return $this->hasOne('App\Models\Chat\ChatMessage');
  }

  public function user()
  {
      return $this->hasOne('App\Models\User\User','id','user_id')->select('username','id','uuid');
  }

}
