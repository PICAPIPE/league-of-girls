<?php

namespace App\Mail\Auth;

use URL;

use App\Mail\BaseMail;

use App\Models\User\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassword extends BaseMail
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user,$debug = [])
    {
        $this->debug = $debug;
        $this->user  = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function preBuild()
    {

        $url =  URL::temporarySignedRoute(
          'resetPassword', now()->addMinutes(30), ['user' => $this->user->id]
        );

        return $this->view('emails.auth.reset',[
           'user' => $this->user,
           'url'  => $url,
           'from' => config('mail.from.name'),
           'more' => $this->more
        ]);

    }
}
