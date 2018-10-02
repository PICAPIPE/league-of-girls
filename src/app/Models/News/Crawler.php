<?php

namespace App\Models\News;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class Crawler extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'crawler';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'game',
      'type',
      'url',
      'tag',
      'interval',
      'channel',
      'published',
  ];

  protected $validations = [
      'game'     => 'required',
      'type'     => 'required',
      'interval' => 'required'
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
      'game_id'   => 'integer',
  ];

  /**
   * The attributes that should be mutated to dates.
   *
   * @var array
   */
  protected $dates = [];

}
