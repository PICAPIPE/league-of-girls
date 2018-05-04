<?php

namespace App\Models\Chat;

use App\Models\BaseModel;

use Illuminate\Database\Eloquent\Model;

class ChannelMessage extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'channel_messages';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'user_id',
      'message',
      'deleted_at'
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

  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = ['deleted_at'];
}