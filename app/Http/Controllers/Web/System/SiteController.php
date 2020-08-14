<?php

namespace App\Http\Controllers\Web\System;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SiteController extends Controller
{

    public function site(Request $request){

        return view('welcome',[]);

    }

}
