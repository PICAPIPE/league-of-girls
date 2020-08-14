<?php

namespace App\Exports;

use Route;
use Response;
use Storage;

use App\Models\Chat\Chat;
use App\Models\Chat\ChatMessage;
use App\Models\Chat\ChatUser;

use App\Contracts\ExportAbstract;

class ChatExport extends ExportAbstract
{

    public $name = "chat";

    public function run($params)
    {
          $chat = Chat::where('uuid',$params['uuid'])->select(['uuid','id','created_at','updated_at'])->with('messages')->with('messages.user')->get();

          if ($chat !== null)
                {
                $xml    = \Response::xml($chat->toArray(),200,[],'Chat')->content();
                $result = $this->save('chat-'.$params['uuid'],'.xml', $xml);

                return $result;
                }

          return "";

    }

}
