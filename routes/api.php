<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/status',                                 'Api\System\StatusController@status');

// Authentication

Route::post('/auth/register',                         'Api\Security\AuthController@register');
Route::post('/auth/login',                            'Api\Security\AuthController@login');
Route::post('/auth/reset',                            'Api\Security\AuthController@requestResetLink');

Route::group(['middleware' => ['auth.api']], function(){

    Route::get('/users/current',                                 'Api\User\UserController@current');

});
