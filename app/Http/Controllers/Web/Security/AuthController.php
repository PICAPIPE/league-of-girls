<?php

namespace App\Http\Controllers\Web\Security;

use Cookie;
use DB;
use Hash;
use Route;
use Image;
use Mail;
use LaravelGettext;
use JWTAuth;
use Validator;
use ValidationHelper;
use Carbon\Carbon;

use App\Models\User\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

    // Logout

    public function logout(Request $request)
    {
        $cookieName = strtolower(str_slug(config('app.name'),'_').'_auth');
        Cookie::queue(Cookie::forget($cookieName));
        return redirect()->route('start', []);
    }

    // Reset password

    public function resetPassword(Request $request)
    {

        dd('Reset password now');

    }

}
