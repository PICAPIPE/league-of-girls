<?php

namespace App\Http\Controllers\Api\News;

use Youtube;
use Twitter;
use OpenGraph;

use Carbon\Carbon;

use App\Models\Chat\Chat;
use App\Models\Esport\Game;
use App\Models\Esport\GameKeyword;
use App\Models\Esport\Link;

use App\Models\User\UserLink;

use App\Models\News\StreamEntry;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class CrawlerController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\News\Crawler::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'type',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => [],
        'pagination'    => true,
        'sortBy'        => 'type',
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
