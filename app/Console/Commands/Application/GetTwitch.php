<?php

namespace App\Console\Commands\Application;

use Illuminate\Console\Command;

use Carbon\Carbon;

use App\Models\User\UserLink;
use App\Models\Chat\Chat;

use App\Models\Esport\Game;
use App\Models\Esport\Link;
use App\Models\News\StreamEntry;

class GetTwitch extends Command
{

    public $twitchToken;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:twitch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Loads the status of the twitch users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function getTwitchToken() {
        $twitchIDApi = new \GuzzleHttp\Client(['base_uri' => 'https://id.twitch.tv/']);
        $url      = "oauth2/token?client_id=".env('TWITCH_KEY')."&client_secret=".env('TWITCH_SECRET')."&grant_type=client_credentials";
        
        $response = $twitchIDApi->post($url);
  
        $body = $response->getBody();
        $content = json_decode($body->getContents(), true);
        $this->twitchToken = data_get($content, 'access_token', null);
      }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

      $this->getTwitchToken();

      $client   = new \GuzzleHttp\Client();
      $games    = Game::all()->pluck('name')->toArray();

      $links    = Link::where('type','twitch')->with('getValues')->get();
      $channels = [];

      $links->each(function($link) use (&$channels){

          $values = collect($link->getValues);

          collect($link->getValues)->each(function($value) use (&$channels) {
              if ($value->allow_crawler === true)
                    {
                    $channels[] = $value->value;
                    }
          });

      });

      $channels = array_unique($channels);

      $url      = 'https://api.twitch.tv/helix/streams?channel='.implode(',',$channels);
      $headers = [
        'client-id'     => env('TWITCH_KEY'),
        'Authorization' => 'Bearer ' . $this->twitchToken,        
        'Accept'        => 'application/json',
      ];

      // Make the request

      $streamsLiveOlder = StreamEntry::whereDate('created_at','<', Carbon::today())->where('live',true)->where('type','twitch')->get();

      if($streamsLiveOlder !== null)
           {
           $streamsLiveOlder->each(function($stream){
              $stream->live = false;
              $stream->save();
           });
           }

      $request = new \GuzzleHttp\Psr7\Request('GET', $url, $headers);

      $promise = $client->sendAsync($request)->then(function ($response) use ($games, $channels){

          $data        = json_decode($response->getBody(true)->getContents());
          $streams     = collect($data->streams);

          // Set all streams to offline

          $streamsLive = StreamEntry::whereDate('created_at', Carbon::today())->get();

          $streamsLive->each(function($stream) {
             $stream->live = false;
             $stream->save();
          });

          // Update all active streams

          $streams->each(function($stream) use ($games, $streamsLive){

              if (in_array($stream->game,$games) === true)
                   {

                   // Check if the game is in the list of allowed games
                   $streamEntry = StreamEntry::whereDate('created_at', Carbon::today())->where('channel', $stream->user_name)->first();

                   $game        = Game::where('twitch_game',$stream->game_id)->first();

                   if ($streamEntry === null)
                         {

                         $streamEntriesOld = StreamEntry::whereDate('created_at','<', Carbon::today())->where('channel', $stream->user_name)->get();

                         if ($streamEntriesOld !== null)
                               {
                               $streamEntriesOld->each(function($streamEntryOld){
                                    $streamEntryOld->delete();
                               });
                               }

                         $streamEntry = StreamEntry::create([
                            'type'      => 'twitch',
                            'channel'   => $stream->user_name,
                            'game_id'   => $game->id,
                            'published' => true
                         ]);

                         // Create a chat

                         $chat = Chat::create([
                            'pid_table' => 'streams',
                            'pid'       => $streamEntry->id,
                            'public'    => true
                         ]);

                         // Create point entry

                         $userLink = UserLink::where(function($query){
                            $link = Link::where('type','twitch')->first();
                            $query->where('link_id',$link->id);
                         })->where('value',$stream->user_name)->first();

                         if ($userLink !== null)
                              {
                              $user = $userLink->user()->first();

                              if($user !== null)
                                  {
                                  $user->addPoints($streamEntry->id,'streams', env('POINTS_TWITCH',1));
                                  }
                              }
                         }

                   if ($streamEntry !== null)
                         {
                         $streamEntry->live      = true;
                         $streamEntry->published = true;
                         $streamEntry->image     = str_replace('{height}', 180, str_replace('{width}', 180, $stream->thumbnail_url));
                         $streamEntry->save();
                         }
                   }

          });

      });
      $promise->wait();

    }
}
