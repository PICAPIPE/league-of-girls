<?php

namespace App\Mail;

use URL;
use Storage;

use App\Models\User\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BaseMail extends Mailable
{

    public $debug = [];
    public $more  = [];

    /**
     * Build the messagev
     *
     * @return $this
     */
    public function build()
    {

        $preBuild = null;
        $more     = [];

        if(env('APP_DEBUG') === true)
          {

              // Generate unique email string

              if(isset($this->debug['unique']) === true)
              {

                $more['unique']    = $this->debug['unique'];
                $more['uniqueUrl'] = URL::signedRoute('testmail', ['unique' => $this->debug['unique']]);

              }

          }

        $this->more = $more;

        if(method_exists($this,'preBuild') === true)
          {
                $preBuild = $this->preBuild();
          }

        return $preBuild;

    }
}
