<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function respondFile(Request $request, $fileEntry = null)
    {

          if(config('app.gzip') === true         &&
             App::environment()       !== 'development'&&
             App::environment()       !== 'testing')
            {
                ob_start('ob_gzhandler');
            }

          if($fileEntry === null)
            {
                abort(400,_i('Fehlerhafte Datenabfrage'));
            }

          if(Storage::disk($fileEntry->disk)->exists($fileEntry->path) === false)
            {
                abort(404,_i('Datei konnte nicht gefunden werden.'));
            }

            $cache = CacheHelper::get($request);
            $file  = null;

            if($cache === null)
              {
                  $file = Storage::disk($fileEntry->disk)->get($fileEntry->path);
                  CacheHelper::set($request,false,$file);
              }

            $response = \Response::make($file, 200);
            $response->header("Content-Type", $fileEntry->mime);

            if($request->input('download') === 'true')
              {
                  $response->header('Content-Disposition', 'attachment; filename="'.$fileEntry->name.'"');
              }

            return $response;

    }

}
