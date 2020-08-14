<?php

namespace App\Helper;

use Auth;
use Cookie;
use Gate;
use JWTAuth;
use Carbon\Carbon;

use ResourceHelper;

use Illuminate\Http\Request;

class ExportHelper
{

    // Run the export a sepcific chat

    public static function run($name,$params = [])
    {
          $classes = ResourceHelper::getClasses(app_path('Exports'),'Export',true,false);

          foreach ($classes as $kC => $vC) {

             $className = $vC;
             $cl        = new $className();

             if (isset($cl->name) === true &&
                 $cl->name        === $name)
                   {
                   return $cl->run($params);
                   }

          }

    }

}
