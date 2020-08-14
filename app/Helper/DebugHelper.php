<?php

namespace App\Helper;

use Storage;
use Cookie;
use Gate;
use Carbon\Carbon;

use App\Models\User\User;
use App\Models\Permissions\Role;
use App\Models\Clients\ClientRole;

use Illuminate\Http\Request;

class DebugHelper
{

    public static function getData ()
    {
          return [
              'unique' => uniqid('email')
          ];
    }

    public static function logMail($mailable = null,$debug = null)
    {

          if(config('app.debug') === true && $debug !== null)
            {
                Storage::disk('debug')->put($debug['unique'].'.html',$mailable->render());
            }

    }

}
