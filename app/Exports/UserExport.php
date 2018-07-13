<?php

namespace App\Exports;

use Route;
use Response;
use Storage;

use App\Models\User\User;

use App\Contracts\ExportAbstract;

class UserExport extends ExportAbstract
{

    public $name = "user";

    public function run($params)
    {
        $user = $params['user'];

        $user = User::where('uuid',$user->uuid)
          ->with('games.game')
          ->with('plattforms.plattform')
          ->with('communications.communication')
          ->with('links.link')
          ->with('friends')
          ->first();

        $xml    = \Response::xml($user->toArray(),200,[],'User')->content();
        $result = $this->save('user-'.$user->uuid,'.xml', $xml);

        return $result;


    }

}
