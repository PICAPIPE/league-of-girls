<?php

namespace App\Http\Controllers\Web\Security;

use Cookie;
use DB;
use Form;
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

use App\Http\Requests\Auth\ResetPassword;

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

        return view('sites.resetpw',['user' => $request->input('user')]);

    }

    // Save the reset password information

    public function resetPasswordStore(ResetPassword $request)
    {

        $user = User::where('id', $request->input('user'))->first();

        if($user !== null)
          {
              $user->password = bcrypt($request->input('password1'));
              $user->save();
          }

        return redirect('login')->with('success', _i('Neues Passwort wurde gesetzt. Du kannst dich nun mit dem neuen Passwort anmelden.'));

    }

}
