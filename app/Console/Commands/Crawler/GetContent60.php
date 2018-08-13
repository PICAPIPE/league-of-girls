<?php

namespace App\Console\Commands\Crawler;

use Illuminate\Console\Command;
use App\Contracts\CommandAbstract;

class GetContent60 extends CommandAbstract
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'crawler:60';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Get the content for the crawler (60 minutes)';

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
      $this->runCommand(60);
  }
}
