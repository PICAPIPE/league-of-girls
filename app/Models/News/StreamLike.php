<?php

namespace App\Models\News;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class StreamLike extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'stream_likes';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'user_id',
      'stream_id',
      'type'
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
      'stream_id' => 'integer',
      'user_id'   => 'integer'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [];

  // Chat

  public function stream()
  {
      return $this->hasOne('App\Models\News\StreamEntry','stream_id','id');
  }

  // User (Createor)

  public function user()
  {
      return $this->hasOne('App\Models\User\User','id','user_id');
  }

}
