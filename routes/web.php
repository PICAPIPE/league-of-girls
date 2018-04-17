<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome',[]);
})->name('start');

// Auth

Route::get('/auth/reset-password',      ['uses'=>'Web\Security\AuthController@resetPassword','middleware' => ['signed']])->name('resetPassword');
Route::get('/auth/logout-now',          ['uses'=>'Web\Security\AuthController@logout'])->name('logout');

// Templates

Route::get('views/{module}/{name}',     ['uses'=>'Web\System\ComponentController@get']);

if(env('APP_DEBUG') === true)
  {
      Route::get('test/email',    function () {
          return view('layouts.email',[]);
      });
  }
