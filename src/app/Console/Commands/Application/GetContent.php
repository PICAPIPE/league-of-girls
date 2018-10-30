<?php

namespace App\Console\Commands\Application;

use Illuminate\Console\Command;
use Artisan;

class GetContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get the content for multiple plattforms';

    public $commands = [
        'content:twitter',
        'content:youtube',
        'content:twitch',
    ];

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
          foreach ($this->commands as $key => $value) {
              $success = Artisan::call($value);
          }
    }
}
