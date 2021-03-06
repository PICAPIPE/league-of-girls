<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\Application\GetContent'
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        // Load twitch information

        $schedule->command('content:all')
                  ->everyFiveMinutes();

        $schedule->command('crawler:15')
                  ->everyFifteenMinutes();

        $schedule->command('crawler:30')
                  ->everyThirtyMinutes();

        $schedule->command('crawler:60')
                  ->hourly();

        // Chat Update
        $schedule->command('chat:update')
                  ->hourly();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
