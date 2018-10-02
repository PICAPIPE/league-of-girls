<?php

namespace App\Http\Controllers\Web\System;

use App;
use Storage;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ComponentController extends Controller
{

    /***
    ** Returns the view template (single page application)
    **/

    public function get(Request $request,$module,$template){

        $exists = Storage::disk('spa')->exists($module.'/templates/'.$template);

        if($exists === false)
          {
              return response('<div class="template-not-found">template not found</div>');
          }

        $file = Storage::disk('spa')->get($module.'/templates/'.$template);

        if(config('app.gzip',false) === true         &&
           App::environment()       !== 'development'&&
           App::environment()       !== 'testing'    &&
           App::environment()       !== 'testing')
          {
              ob_start('ob_gzhandler');
          }

        return response($file);

    }

}
