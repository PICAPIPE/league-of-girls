<?php

namespace App\Mail\Auth;

use URL;

use App\Models\User\User;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        $url =  URL::temporarySignedRoute(
          'resetPassword', now()->addMinutes(30), ['user' => $this->user->id]
        );

        return $this->view('emails.auth.reset',[
           'user' => $this->user,
           'url'  => $url
        ]);
    }
}
