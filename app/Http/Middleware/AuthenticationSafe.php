<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use SecurityHelper;

use Carbon\Carbon;

class AuthenticationSafe
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

        $authorized   = SecurityHelper::authorizedSafe($request);

        return $next($request);
    }
}
