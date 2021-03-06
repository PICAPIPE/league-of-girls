<?php

namespace App\Http\Controllers\Api\System;

use App\Models\System\Page;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class PageController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\System\Page::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => [],
        'roles'         => ['Admin'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => [],
        'pagination'    => true,
        'roles'         => ['Admin'],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC',
        'searchIn'      => 'name',
        'ignorePublish' => true,
        'with'          => ['elements'],
      ],

      'show' => [
        'except'        => false,
        'with'          => ['elements'],
        'roles'         => ['Admin']
      ],

      'store' => [
        'except'        => false,
        'roles'         => ['Admin'],
        'with'          => ['elements']
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

  // Get the page with complete data based on its slug
  public function viewPage (Request $request, $slug)
  {
      $page = Page::where('alias', $slug);


      if($request->user === null || $request->user->is(['Admin']) === false)
           {
           $page = $page->where('published',true);
           }

      $page = $page->with('elements')->first();

      if ($page === null)
            {
            return $this->respondNotFound(_i('Seite nicht gefunden'));
            }

      return $this->respondSuccess(['data' => $page->toArray()]);

  }

  // Returns all the published pages
  public function published (Request $request)
  {
      $doNotInclude = [
          'imprint',
          'privacy'
      ];

      $pages = Page::where('published',true)->whereNotIn('alias',$doNotInclude)->get();
      return $this->respondSuccess(['data' => $pages->toArray()]);
  }

}
