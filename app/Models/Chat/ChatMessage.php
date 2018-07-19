<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Model;
use App\Models\BaseModel;

use App\Models\Chat\ChatMessageRead;

class ChatMessage extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'chats_messages';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'user_id',
      'text',
      'reported'
  ];

  protected $validations = [
      'text'    => 'required',
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
      'created'
  ];

  /**
   * The attributes casted and transformed to real values
   *
   * @var array
   */
  protected $casts = [
      'reported' => 'boolean'
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

  public function messagesRead()
  {
      return $this->hasMany('App\Models\Chat\ChatMessageRead','message_id','id');
  }

  public function getCreatedAttribute()
  {
      return $this->created_at->timezone(config('app.timezoneConvert',config('app.timezone')))->toDateTimeString();
  }

  public function setRead($userId = 0)
  {
      $readByUser =  $this->hasMany('App\Models\Chat\ChatMessageRead','message_id','id')->where('user_id',$userId)->first();

      if($readByUser === null)
        {
        $this->messagesRead()->save(new ChatMessageRead(['user_id' => $userId, 'message_id' => $this->id]));
        }

      return false;

  }

}
