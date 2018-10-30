<?php

namespace App\Http\Controllers\Web\System;

use App;
use Storage;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class testController extends Controller
{

    public function email(Request $request, $unique)
    {

        $fileExists = Storage::disk('debug')->exists($unique.'.html');

        if($fileExists === false)
          {
              abort(404);
          }

        $fileContent = Storage::disk('debug')->get($unique.'.html');

        return response($fileContent, 200);

    }

    public function slack(Request $request)
    {
        abort(500,'Slack error testing.');
    }

}
