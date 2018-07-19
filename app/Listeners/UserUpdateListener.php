<?php

namespace App\Listeners;

use App\Events\UserUpdateEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserUpdateListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserUpdateEvent  $event
     * @return void
     */
    public function handle(UserUpdateEvent $event)
    {
        //
    }
}
