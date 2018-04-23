<?php

namespace App\Http\Controllers\Api\Chat;

use Carbon\Carbon;

use App\Models\Chat\Channel;
use App\Models\Chat\ChannelMessage;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class ChatController extends ApiController
{

    public function channel(Request $request, $channel)
    {

        switch($channel)
        {
           case 'general':
            break;
           case 'game':
            break;
        }

        dd($channel);

    }

    public function channelPrivate(Request $request, $uuid)
    {

        dd($uuid);

    }

}
