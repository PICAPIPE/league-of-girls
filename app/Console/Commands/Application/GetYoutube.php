<?php

namespace App\Console\Commands\Application;

use Youtube;

use App\Models\Chat\Chat;
use App\Models\Esport\Game;
use App\Models\Esport\GameKeyword;
use App\Models\Esport\Link;

use App\Models\User\UserLink;

use App\Models\News\StreamEntry;

use Illuminate\Console\Command;

class GetYoutube extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'content:youtube';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Load the youtube feed into the news section';

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

        $games    = Game::all()->pluck('name')->toArray();

        $links    = Link::where('type','youtube')->with('getValues')->get();
        $channels = [];

        $links->each(function($link) use (&$channels){

            $values = collect($link->getValues);

            collect($link->getValues)->each(function($value) use (&$channels) {
                $channels[] = $value->value;
            });

        });

        $channels = array_unique($channels);

        foreach ($channels as $key => $value)
        {
            $channelVideos = Youtube::listChannelVideos($value);

            foreach ($channelVideos as $kVideo => $video)
            {

                $url     = "https://www.youtube.com/embed/".$video->id->videoId;
                $stream  = StreamEntry::where('url', $url)->first();
                $game_id = 0;

                if ($stream === null)
                       {
                       $stream = StreamEntry::create([
                          'type'     => 'youtube',
                          'url'      => $url,
                          'headline' => $video->snippet->title,
                          'text'     => $video->snippet->description,
                          'image'    => $video->snippet->thumbnails->high->url,
                          'game_id'  => $game_id,
                          'channel'  => $value,
                          'published'=> true
                       ]);

                       // Create a chat

                       $chat = Chat::create([
                          'pid_table' => 'streams',
                          'pid'       => $stream->id,
                          'public'    => true
                       ]);

                       // Create point entry

                       $userLink = UserLink::where(function($query){
                          $link = Link::where('type','youtube')->first();
                          $query->where('link_id',$link->id);
                       })->where('value', $value)->first();

                       if ($userLink !== null)
                            {
                            $user = $userLink->user()->first();

                            if($user !== null)
                                {
                                $user->addPoints($stream->id,'streams', env('POINTS_YOUTUBE',1));
                                }
                            }

                       }

            }
        }

    }
}
