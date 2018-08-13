<?php

namespace App\Http\Controllers\Api\System;

use App\Models\System\Page;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class FaqController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\System\Faq::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'sort',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => [],
        'pagination'    => true,
        'sortBy'        => 'sort',
        'sortDirection' => 'ASC',
        'searchIn'      => 'all',
        'ignorePublish' => false
      ],

      'show' => [
        'except'        => false,
        'roles'         => ['Admin']
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
      ]

  ];

}
