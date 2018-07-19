<?php

namespace App\Exports;

use Route;
use Response;
use Storage;

use App\Models\User\User;

use App\Contracts\ExportAbstract;

class UserChatExport extends ExportAbstract
{

    public $name = "userchats";

    public function run($params)
    {
        $user = $params['user'];

        $chats = $user->chats()->with('messages')->get();

        $xml    = \Response::xml($chats->toArray(),200,[],'Chats')->content();
        $result = $this->save('userchats-'.$user->uuid,'.xml', $xml);

        return $result;


    }

}
