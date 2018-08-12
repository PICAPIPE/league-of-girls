<?php

namespace App\Http\Controllers\Api\Esport;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class LinkController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\Esport\Link::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => ['name','uuid','id','icon','placeholder','help','type'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => ['name','uuid','id','icon','placeholder','help','type','published'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC',
        'searchIn'      => 'name',
        'ignorePublish' => true,
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
