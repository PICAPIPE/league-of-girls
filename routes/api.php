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

Route::group(['middleware' => ['auth.safe']], function(){
  Route::post('/auth/broadcasting',                     'Api\Security\AuthController@broadcasting');
});

Route::group(['middleware' => ['auth.api']], function(){

    Route::post('/users/{user}/request',                         'Api\User\UserController@requestConnection');
    Route::get('/users/current',                                 'Api\User\UserController@current');
    Route::put('/users/current',                                 'Api\User\UserController@currentUpdate');
    Route::post('/users/current/avatars',                        'Api\User\UserController@currentUploadAvatar');
    Route::post('/users/current/games',                          'Api\User\UserController@currentAddGame');
    Route::post('/users/current/plattforms',                     'Api\User\UserController@currentAddPlattform');
    Route::post('/users/current/communications',                 'Api\User\UserController@currentAddCommunication');
    Route::post('/users/current/links',                          'Api\User\UserController@currentAddLink');
    Route::get('/users/current/requests',                        'Api\User\UserController@currentConnectionRequest');
    Route::get('/users/current/chats',                           'Api\User\UserController@currentChats');
    Route::get('/users/current/export',                          'Api\User\UserController@currentExport');
    Route::get('/users/current/delete-account',                  'Api\User\UserController@currentDeleteAccount');

});

Route::get('/streams/featured','Api\News\StreamController@featured');
Route::api('streams',          'Api\News\StreamController',         [],true,['auth.safe']);

// Users

Route::api('users',           'Api\User\UserController',           [],true,['auth.safe']);
Route::api('friends-requests','Api\User\FriendRequestController',  [],true);

// E-Sport

Route::api('games',           'Api\Esport\GameController',         [],true,['auth.safe']);
Route::api('plattforms',      'Api\Esport\PlattformController',    [],true,['auth.safe']);
Route::api('communications',  'Api\Esport\CommunicationController',[],true,['auth.safe']);
Route::api('links',           'Api\Esport\LinkController',         [],true,['auth.safe']);

// Site

Route::group(['middleware' => ['auth.safe']], function(){
  Route::any('pages/views/{slug}', ['uses'=>'Api\System\PageController@viewPage'])->where('slug', '([A-z\d-\/_.]+)?');
});
Route::api('pages',              'Api\System\PageController',         [],true,['auth.safe']);
Route::api('elements',           'Api\System\PageElementController',  [],true,['auth.safe']);

// Faq
Route::api('faq',              'Api\System\FaqController',            [],true,['auth.safe']);
Route::api('crawler',          'Api\News\CrawlerController',          [],true,['auth.safe']);

// CHAT

Route::group(['middleware' => ['auth.api']], function(){

  Route::get('/chats/{uuid}/delete-messages', 'Api\Chat\ChatController@deleteMessages');
  Route::get('/chats/{uuid}/export',          'Api\Chat\ChatController@exportMessages');

});

Route::api('chats',   'Api\Chat\ChatController',     [],true);
Route::api('messages','Api\Chat\MessageController',  [],true);
Route::post('/messages/{messages}/report', 'Api\Chat\MessageController@report');

// TESTING

if(env('APP_DEBUG') === true)
  {
    Route::get('/tests/chats/{uuid}', 'Api\Chat\ChatController@testBroadcast');
  }
