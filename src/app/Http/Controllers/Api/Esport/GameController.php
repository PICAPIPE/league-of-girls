<?php

namespace App\Http\Controllers\Api\Esport;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class GameController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\Esport\Game::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => ['name','uuid','id','short'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => ['name','uuid','id','short','published'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC',
        'ignorePublish' => false,
        'pagination'    => true
      ],

      'show' => [
        'except'        => false,
      ],

      'store' => [
        'except'        => false,
        'roles'         => ['Admin']
      ],

      'update' => [
        'except'        => false,
        'roles'         => ['Admin']
      ],

      'destroy' => [
        'except'        => false,
        'roles'         => ['Admin']
      ],

  ];

}
