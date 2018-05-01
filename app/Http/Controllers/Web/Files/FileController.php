<?php

namespace App\Http\Controllers\Web\Files;

use App;
use Image;
use Storage;
use Carbon\Carbon;

use App\Models\User\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FileController extends Controller
{

    public function avatar(Request $request,$user){

        $fileExists         = Storage::disk('avatars')->exists($user.'.png');
        $filePathFallback   = public_path('img/avatars/female.png');

        if($user === null)
          {
             abort(404);
          }

        if($fileExists === false)
          {
                return Image::make($filePathFallback)->response('png');
          }

       return Image::make(Storage::disk('avatars')->path($user.'.png'))->resize(300, 300)->response('png');

    }

}
