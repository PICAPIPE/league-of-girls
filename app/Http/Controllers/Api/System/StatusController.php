<?php

namespace App\Http\Controllers\Api\System;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class StatusController extends ApiController
{

    public function status(Request $request){

        return $this->respondSuccess(['time' => time()]);

    }

}
