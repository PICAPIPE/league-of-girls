<?php

namespace App\Models\System;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class Page extends BaseModel
{
  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'pages';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'id',
      'uuid',
      'sort',
      'alias',
      'name',
      'description',
      'published'
  ];

  protected $validations = [
      'alias' => 'required|unique',
      'name'  => 'required'
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

}
