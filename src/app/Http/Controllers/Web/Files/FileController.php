<?php

namespace App\Http\Controllers\Web\Files;

use App;
use File;
use Image;
use Storage;
use Carbon\Carbon;

use App\Models\User\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controller as Response;

class FileController extends Controller
{

    public function avatar(Request $request,$user){

        $fileExists         = Storage::disk('avatars')->exists($user.'.png');
        $filePathFallback   = public_path('img/avatars/avatar.png');
        $user               = User::where('uuid',$user)->first();

        $color     = $request->input('color');
        $preview   = $request->input('preview');

        if($user === null)
          {
             abort(404);
          }

        if($fileExists === false || data_get($user,'avatar_id',-1) < 0 || $preview !== null)
          {
                if (File::exists($filePathFallback) === false && (($user !== null && $user->avatar_id < 0) || $preview !== null) === false)
                     {
                     $preview = 1;
                     }
                if (($user !== null && $user->avatar_id < 0) || $preview !== null)
                     {

                     // Preview modus to get a preview image 
                     if ($preview !== null)
                           {
                           $fileChoosen = public_path('img/avatars/'.$preview.'.svg');
                           }
                     else  {
                           $fileChoosen = public_path('img/avatars/'.($user->avatar_id * -1).'.svg');
                           }

                     if (File::exists($fileChoosen) === true)
                          {
                          $fileContent = File::get($fileChoosen);
                          
                          $background = $user->background;
                          
                          if ($color === null || $user->color === '')
                                {
                                $color = $user->color;
                                }

                          if ($request->input('background') !== null)
                                {
                                $background = $request->input('background');
                                }

                          $background = str_replace('#','',$background);
                          $color      = str_replace('#','',$color);

                          $fileContent = str_replace('<svg', '<svg fill="'.$color.'"',$fileContent);
                          $fileContent = str_replace('<svg', '<svg style="fill:#'.$color.';background:#'.$background.';"',$fileContent);
                          return response($fileContent, 200)->header('Content-Type', 'image/svg+xml');
                          }

                     
                     }
                            
                return Image::make($filePathFallback)->response('png');
          }

       return Image::make(Storage::disk('avatars')->path($user->uuid.'.png'))->resize(300, 300)->response('png');

    }

    public function export(Request $request, $name)
    {
      $path = storage_path('exports/'.$request->input('name'));
      return response()->download($path)->deleteFileAfterSend(true);
    }

}
