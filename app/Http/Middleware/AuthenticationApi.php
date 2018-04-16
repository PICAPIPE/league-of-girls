<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use SecurityHelper;

use Carbon\Carbon;

class AuthenticationApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $token        = null;
        $token_value  = null;
        $token_name   = null;

        $authorized   = true;

        if(is_string($request->user) === true)
          {
             $request->user = null;
          }

        $authorized = SecurityHelper::authorizedSafe($request);

        if($authorized === false){

            // Not authorized
            abort(401);

        }

        return $next($request);
    }
}
