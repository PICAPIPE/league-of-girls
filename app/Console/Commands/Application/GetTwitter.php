<?php

namespace App\Console\Commands\Application;

use Illuminate\Console\Command;

use Twitter;
use Carbon\Carbon;

use App\Models\User\UserLink;

use App\Models\Esport\Game;
use App\Models\Esport\GameKeyword;
use App\Models\Esport\Link;
use App\Models\News\StreamEntry;

class GetTwitter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:twitter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Load the twitter feed into the news section';

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

        $links    = Link::where('type','twitter')->with('getValues')->get();

        $channels = [];

        $links->each(function($link) use (&$channels){

            $values = collect($link->getValues);

            collect($link->getValues)->each(function($value) use (&$channels) {
                $channels[] = $value->value;
            });

        });

        foreach ($channels as $key => $value) {
            $tweets = json_decode(Twitter::getUserTimeline(['screen_name' => $value, 'count' => 20, 'format' => 'json']));

            foreach ($tweets as $keyTweet => $valueTweet) {

                $url         = 'https://twitter.com/'.$value.'/status/'.$valueTweet->id;
                $stream      = StreamEntry::where('url', $url)->first();
                $image       = str_replace('_normal','',$valueTweet->user->profile_image_url_https);

                $tags        = [];
                $game_id     = 0;

                if(sizeOf($valueTweet->entities->hashtags) > 0)
                      {
                      foreach($valueTweet->entities->hashtags as $k => $v)
                         {
                         $tags[] = $v->text;
                         }

                      // Es wird das erste Spiel was erkannt wird als "Verknüpfung herangezogen"
                      $keyword = GameKeyword::whereIn('keyword',$tags)->with('game')->first();

                      if ($keyword !== null)
                            {
                            $game_id = $keyword->game_id;
                            }

                      }

                if ($game_id !== 0)
                      {
                      if ($stream === null)
                            {
                            $stream = StreamEntry::create([
                                 'type'      => 'twitter',
                                 'game_id'   => $game_id,
                                 'url'       => $url,
                                 'channel'   => $value,
                                 'published' => true,
                                 'image'     => $image,
                                 'text'      => $valueTweet->text
                            ]);

                            // Create point entry

                            $userLink = UserLink::where(function($query){
                               $link = Link::where('type','twitter')->first();
                               $query->where('link_id',$link->id);
                            })->where('value', $value)->first();

                            if ($userLink !== null)
                                 {
                                 $user = $userLink->user()->first();

                                 if($user !== null)
                                     {
                                     $user->addPoints($stream->id,'streams', env('POINTS_TWITTER',1));
                                     }
                                 }
                            }
                      else  {
                            $stream->text = $valueTweet->text;
                            $stream->save();
                            }
                      }
            }

        }
    }
}
