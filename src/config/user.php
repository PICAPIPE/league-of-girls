<?php

return [

    /*
    |--------------------------------------------------------------------------
    | USER-Settings
    |--------------------------------------------------------------------------
    |
    |
    */

    'standardRole'   => env('USER_STANDARD_ROLE',   'User'),
    'standardGender' => env('USER_STANDARD_GENDER', 'female'),

    'enums' => [

        'types' => ['female','male','misc']

    ]

];
