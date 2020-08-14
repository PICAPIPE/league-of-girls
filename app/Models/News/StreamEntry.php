<?php

namespace App\Models\News;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

use App\Models\News\StreamRead;

class StreamEntry extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'stream';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'type',
      'text',
      'url',
      'image',
      'headline',
      'text',
      'published',
      'featured',
      'live',
      'channel',
      'game_id',
      'creator'
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
      'readlater',
      'likes',
      'myliketype'
  ];

  /**
   * The attributes casted and transformed to real values
   *
   * @var array
   */
  protected $casts = [
      'published' => 'boolean',
      'live'      => 'boolean',
      'featured'  => 'boolean',
      'game_id'   => 'integer'
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [];

  // Chat

  public function chat()
  {
      return $this->hasOne('App\Models\Chat\Chat','pid','id')->where('pid_table','streams');
  }

  // User (Createor)

  public function user()
  {
      return $this->hasOne('App\Models\User\User','id','creator');
  }

  public function getReadlaterAttribute()
  {
      if (request()->user === null)
            {
            return false;
            }

      return StreamRead::where('user_id',request()->user->id)->where('stream_id',$this->id)->count() > 0;

  }

  // Returns the data for like data
  public function getLikesAttribute()
  {
      $likes = StreamLike::where('stream_id', $this->id)->get();
      $data  = [
         'total' => $likes->count(),
         'like'  => $likes->where('type','like')->count(), 
         'heart' => $likes->where('type','heart')->count(), 
         'hate'  => $likes->where('type','hate')->count(),
         'woot'  => $likes->where('type','woot')->count(), 
         'sad'   => $likes->where('type','sad')->count()
      ];
      return $data;
  }

  // Returns the data for like data
  public function getMyliketypeAttribute()
  {
      if (request()->user === null)
            {
            return null;
            }
      $like = StreamLike::where('stream_id', $this->id)->where('user_id',request()->user->id)->first();
      if ($like !== null)
            {
            return $like->type;
            }

      return null;
  }

  // Like entry
  public function likeIt($type = null)
  {
      if ($type === null)
           {
           return false;
           }

      $like = StreamLike::where('stream_id', $this->id)->where('user_id',request()->user->id)->first();
          
      if ($like !== null)
           {
           $like->type = $type;
           $like->save();
           return true;
           }
      else {
           $like = StreamLike::create(['stream_id' => $this->id, 'user_id' => request()->user->id, 'type' => $type]);
           if ($like !== null)
                 {
                 return true;
                 }
           }

      return false;
      
  }

  // UnLike entry
  public function unLikeIt($type = null)
  {
      if ($type === null || request()->user === null)
           {
           return false;
           }
      
      $like = StreamLike::where('stream_id', $this->id)->where('user_id',request()->user->id)->first();
          
      if ($like !== null)
           {
           $like->delete();
           }
      
      return true;
      
  }

}
