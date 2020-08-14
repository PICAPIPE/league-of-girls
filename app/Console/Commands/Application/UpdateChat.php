<?php

namespace App\Console\Commands\Application;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Chat\Chat;
use App\Models\News\StreamEntry;

class UpdateChat extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if any stream entry does not have a related chat.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $streams = StreamEntry::where('published',true)->with('chat')->get();

        $streams->each(function($stream)
        {
            if ($stream->chat === null)
                  {
                  $chat = Chat::create([
                    'pid_table' => 'streams',
                    'pid'       => $stream->id,
                    'public'    => true
                  ]);
                  }
        });

    }
}
