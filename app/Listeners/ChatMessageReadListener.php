<?php

namespace App\Listeners;

use App\Events\ChatMessageReadEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ChatMessageReadListener
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
     * @param  ChatMessageReadEvent  $event
     * @return void
     */
    public function handle(ChatMessageReadEvent $event)
    {
        //
    }
}
