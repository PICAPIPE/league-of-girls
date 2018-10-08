<?php

namespace App\Contracts;

use Storage;
use URL;
use Twitter;
use Youtube;
use OpenGraph;
use FeedReader;
use Carbon\Carbon;

use App\Models\News\Crawler;
use App\Models\Chat\Chat;

use App\Models\Esport\Game;
use App\Models\Esport\Link;
use App\Models\News\StreamEntry;
use App\Models\User\User;
use App\Models\User\UserLink;

use Illuminate\Console\Command;

class CommandAbstract extends Command{

    // Entry point for the crawler
    public function runCommand ($interval)
    {
         $tasks = null;
         switch($interval)
               {
               case 15:
               case 30:
               case 60:
                 $tasks = Crawler::where('published',true)->where('interval',$interval)->get();
                 break;
               }

        if ($tasks !== null)
               {
               $this->runCommandEntries($tasks);
               }
    }

    // Run all the entries
    public function runCommandEntries($entries)
    {
        $entries->each(function($entry){
            switch($entry->type)
                  {
                  case 'twitch':
                    $this->importTwitch($entry);
                    break;
                  case 'twitter':
                    $this->importTwitterTimeline($entry);
                    break;
                  case 'twitter_hashtag':
                    $this->importTwitterHashtag($entry);
                    break;
                  case 'youtube':
                    $this->importYoutubeVideos($entry);
                    break;
                  case 'rss':
                    $this->importRssFeed($entry);
                    break;
                  }
        });
    }

    public function importTwitch($entry)
    {
        $client   = new \GuzzleHttp\Client();
        $url      = 'https://api.twitch.tv/kraken/streams?client_id='.env('TWITCH_KEY','').'&channel='.$entry->channel;

        // Make the request

        $streamsLiveOlder = StreamEntry::whereDate('created_at','<', Carbon::today())->where('live',true)->where('type','twitch')->get();

        if($streamsLiveOlder !== null)
             {
             $streamsLiveOlder->each(function($stream){
                $stream->live = false;
                $stream->save();
             });
             }

        $request = new \GuzzleHttp\Psr7\Request('GET', $url);

        $promise = $client->sendAsync($request)->then(function ($response) use ($entry){

            $data        = json_decode($response->getBody(true)->getContents());
            $streams     = collect($data->streams);

            // Set all streams to offline

            $streamsLive = StreamEntry::whereDate('created_at', Carbon::today())->get();

            $streamsLive->each(function($stream) {
               $stream->live = false;
               $stream->save();
            });

            // Update all active streams

            $streams->each(function($stream) use ($streamsLive,$entry){

              // Check if the game is in the list of allowed games
              $streamEntry = StreamEntry::whereDate('created_at', Carbon::today())->where('channel', $stream->channel->display_name)->first();

              $game_id     = $entry->game;

              if ($streamEntry === null)
                    {
                    $streamEntry = StreamEntry::create([
                       'type'      => 'twitch',
                       'channel'   => $stream->channel->display_name,
                       'game_id'   => $game_id,
                       'published' => true,
                       'creator'   => User::where('email',env('ADMIN_EMAIL'))->first()->id
                    ]);

                    // Create a chat

                    $chat = Chat::create([
                       'pid_table' => 'streams',
                       'pid'       => $streamEntry->id,
                       'public'    => true
                    ]);
                    }

              if ($streamEntry !== null)
                    {
                    $streamEntry->live      = true;
                    $streamEntry->published = true;
                    $streamEntry->image     = $stream->channel->logo;
                    $streamEntry->save();
                    }

              $userLink = UserLink::where(function($query){
                 $link = Link::where('type','twitch')->first();
                 $query->where('link_id',$link->id);
              })->where('value', $entry->channel)->first();

              if ($userLink !== null)
                    {
                    $user = $userLink->user()->first();

                    if($user !== null)
                         {
                         $user->addPoints($stream->id,'streams', env('POINTS_TWITCH',1));
                         }
                    }

            });

        });
        $promise->wait();
    }

    public function importTwitterTimeline($entry)
    {
        $tweets = json_decode(Twitter::getUserTimeline(['screen_name' => $entry->channel, 'count' => 20, 'format' => 'json']));

        foreach ($tweets as $keyTweet => $valueTweet) {

            $url         = 'https://twitter.com/'.$entry->channel.'/status/'.$valueTweet->id;
            $stream      = StreamEntry::where('url', $url)->first();
            $image       = str_replace('_normal','',$valueTweet->user->profile_image_url_https);

            $game_id     = $entry->game;

            if ($game_id !== 0)
                  {
                  if ($stream === null)
                        {
                        $stream = StreamEntry::create([
                             'type'      => 'twitter',
                             'game_id'   => $game_id,
                             'url'       => $url,
                             'channel'   => $entry->channel,
                             'published' => true,
                             'image'     => $image,
                             'text'      => $valueTweet->text,
                             'creator'   => User::where('email',env('ADMIN_EMAIL'))->first()->id
                        ]);

                        $chat = Chat::create([
                           'pid_table' => 'streams',
                           'pid'       => $stream->id,
                           'public'    => true
                        ]);
                        }
                  else  {
                        $stream->text = $valueTweet->text;
                        $stream->save();
                        }

                  $userLink = UserLink::where(function($query){
                     $link = Link::where('type','twitter')->first();
                     $query->where('link_id',$link->id);
                  })->where('value', $entry->channel)->first();

                  if ($userLink !== null)
                        {
                        $user = $userLink->user()->first();

                        if($user !== null)
                             {
                             $user->addPoints($stream->id,'streams', env('POINTS_TWITTER',1));
                             }
                        }
                  }
        }
    }

    public function importTwitterHashtag($entry)
    {
        $tweets = json_decode(Twitter::getSearch(['q' => $entry->tag, 'count' => 20, 'format' => 'json']));

        foreach ($tweets->statuses as $keyTweet => $valueTweet) {

            $url         = 'https://twitter.com/'.$valueTweet->user->screen_name.'/status/'.$valueTweet->id;
            $stream      = StreamEntry::where('url', $url)->first();
            $image       = str_replace('_normal','',$valueTweet->user->profile_image_url_https);

            $game_id     = $entry->game;

            if ($game_id !== null)
                  {
                  if ($stream === null)
                        {
                        $stream = StreamEntry::create([
                             'type'      => 'twitter',
                             'game_id'   => $game_id,
                             'url'       => $url,
                             'channel'   => $valueTweet->user->screen_name,
                             'published' => true,
                             'image'     => $image,
                             'text'      => $valueTweet->text,
                             'creator'   => User::where('email',env('ADMIN_EMAIL'))->first()->id
                        ]);

                        $chat = Chat::create([
                           'pid_table' => 'streams',
                           'pid'       => $stream->id,
                           'public'    => true
                        ]);
                        }
                  else  {
                        $stream->text = $valueTweet->text;
                        $stream->save();
                        }

                  $userLink = UserLink::where(function($query){
                     $link = Link::where('type','twitter')->first();
                     $query->where('link_id',$link->id);
                  })->where('value', $valueTweet->user->screen_name)->first();

                  if ($userLink !== null)
                        {
                        $user = $userLink->user()->first();

                        if($user !== null)
                             {
                             $user->addPoints($stream->id,'streams', env('POINTS_TWITTER',1));
                             }
                        }
                  }
        }
    }

    public function importYoutubeVideos($entry)
    {
        $channelVideos = Youtube::listChannelVideos($entry->channel);

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
                      'channel'  => $entry->channel,
                      'published'=> true,
                      'creator'  => User::where('email',env('ADMIN_EMAIL'))->first()->id
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
                   })->where('value', $entry->channel)->first();

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

    public function importRssFeed($entry)
    {

      $url      = $entry->url;

      $response = FeedReader::read($url);
      $response->handle_content_type();

      foreach ($response->get_items(0,1) as $key => $item) {

          $link   = $item->get_link();
          $stream = StreamEntry::where('url', $url)->first();

          $_SERVER['HTTP_USER_AGENT'] = 'League of Girls - Bot';

          $og    = OpenGraph::fetch(str_replace('?wt_mc=rss.ho.beitrag.atom','',$link));
          $image = '';

          if (isset($og['image']) === true)
               {
               $image = $og['image'];
               }

          if ($stream === null)
                 {
                 $stream = StreamEntry::create([
                    'type'     => 'link',
                    'url'      => $link,
                    'headline' => $item->get_title(),
                    'text'     => $item->get_description(),
                    'image'    => $image,
                    'game_id'  => $entry->game,
                    'channel'  => $link,
                    'published'=> true,
                    'creator'  => User::where('email',env('ADMIN_EMAIL'))->first()->id
                 ]);

                 // Create a chat

                 $chat = Chat::create([
                    'pid_table' => 'streams',
                    'pid'       => $stream->id,
                    'public'    => true
                 ]);

                 }
      }

    }

}
