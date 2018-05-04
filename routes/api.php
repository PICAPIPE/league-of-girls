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
    Route::put('/users/current',                                 'Api\User\UserController@currentUpdate');
    Route::post('/users/current/avatars',                        'Api\User\UserController@currentUploadAvatar');
    Route::post('/users/current/games',                          'Api\User\UserController@currentAddGame');
    Route::post('/users/current/plattforms',                     'Api\User\UserController@currentAddPlattform');
    Route::post('/users/current/communications',                 'Api\User\UserController@currentAddCommunication');
    Route::post('/users/current/links',                          'Api\User\UserController@currentAddLink');

});

// E-Sport

Route::api('games',           'Api\Esport\GameController',         [],false);
Route::api('plattforms',      'Api\Esport\PlattformController',    [],false);
Route::api('communications',  'Api\Esport\CommunicationController',[],false);
Route::api('links',           'Api\Esport\LinkController',         [],false);

// CHAT

Route::get('/chat/private/{channel}', 'Api\Chat\ChatController@channelPrivate');
Route::get('/chat/{channel}',         'Api\Chat\ChatController@channel');
