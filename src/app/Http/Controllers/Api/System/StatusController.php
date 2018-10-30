<?php

namespace App\Http\Controllers\Api\System;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class StatusController extends ApiController
{

    public function status(Request $request){
        //throw new \Exception("Error Processing Request", 1);

        return $this->respondSuccess(['time' => time()]);

    }

}
