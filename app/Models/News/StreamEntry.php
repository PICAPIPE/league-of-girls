<?php

namespace App\Models\News;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

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
      'game_id'
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

  // Games

  public function chat()
  {
      return $this->hasOne('App\Models\Chat\Chat','pid','id')->where('pid_table','streams');
  }

}
