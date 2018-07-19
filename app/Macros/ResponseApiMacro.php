<?php

namespace App\Macros;

use Route;
use Response;

use App\Contracts\MacroAbstract;

class ResponseApiMacro extends MacroAbstract
{

    public function register(){

      Route::macro('api', function($url,$controller,$except = [],$withAuthentication = true,$middleware = ['auth.api'])
      {

        if($withAuthentication === false)
          {
            $middleware = [];
          }


        if(sizeOf($except) === 0)
          {
            $except = config('api.except');
          }

        Route::group(['middleware' => $middleware], function()  use($controller,$except,$url){

            if(in_array('all',$except) === false)
              {
                  Route::get('/'.$url.'/all',        $controller.'@all');
              }

            Route::resource($url,              $controller,     ['except' => $except]);

        });

      });

    }

}
