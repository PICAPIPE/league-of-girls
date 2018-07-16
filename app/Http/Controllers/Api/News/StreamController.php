<?php

namespace App\Http\Controllers\Api\News;

use Carbon\Carbon;

use App\Models\Esport\Game;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class StreamController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\News\StreamEntry::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'name',
        'sortDirection' => 'ASC',
        'pagination'    => true,
        'wheres'        => [
           'filterGame'
        ],
      ],

      'show' => [
        'except'        => true,
      ],

      'store' => [
        'except'        => true,
      ],

      'update' => [
        'except'        => true,
      ],

      'destroy' => [
        'except'        => true,
      ],

  ];

  // Filter

  protected function filterGame(Request $request,$model)
  {

      $game  = $request->input('game');

      if($game !== null && $game !== 'ALL')
        {
            $model = $model->where(function($query) use ($game) {

                $ids = Game::where('uuid',$game)->pluck('id');

                $query->whereIn('id',$ids->toArray());

            });
        }

      return $model;
  }

}
