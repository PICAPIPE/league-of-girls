<?php

namespace App\Http\Controllers\Api\News;

use Youtube;
use Twitter;
use OpenGraph;

use Carbon\Carbon;

use App\Models\Chat\Chat;
use App\Models\Esport\Game;
use App\Models\Esport\GameKeyword;
use App\Models\Esport\Link;

use App\Models\User\UserLink;

use App\Models\News\StreamEntry;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiStandardController;

class StreamController extends ApiStandardController
{

  // Define the model class used in this controller
  protected $cl_model = \App\Models\News\StreamEntry::class;

  // Define the controller map - auto resolve the http requests
  protected $cl_map   = [

      'all' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'name',
        'sortDirection' => 'DESC'
      ],

      'index' => [
        'except'        => false,
        'fields'        => [],
        'sortBy'        => 'name',
        'sortDirection' => 'DESC',
        'pagination'    => true,
        'ignorePublish' => true,
        'wheres'        => [
           'filterGame'
        ],
      ],

      'show' => [
        'except'        => false,
        'with'          => ['chat','user'],
        'wheres'        => [
           'filterStream'
        ]
      ],

      'store' => [
        'except'        => false,
      ],

      'update' => [
        'except'        => false,
      ],

      'destroy' => [
        'except'        => false,
        'roles'         => ['Admin']
      ],

  ];

  // Filter

  protected function filterStream(Request $request,$model)
  {
      if ($request->user !== null)
          {
          if ($request->user->is(['Admin']) === false)
               {
               $model = $model->where('published',true)->orWhere('creator', $request->user->id);
               }
          }
      else
          {
          $model = $model->where('published',true);
          }
      return $model;
  }

  protected function filterGame(Request $request,$model)
  {

      $game  = $request->input('game');

      if ($request->user !== null)
          {

          if ($request->input('filter') === 'my')
                {
                $model = $model->where('creator','=', $request->user->id);
                }
          else if ($request->input('filter') === 'nomy')
                {
                if ($request->user === null || $request->user->is(['Admin']) === false)
                     {
                     $model = $model->where('published',true);
                     }
                $model = $model->where('creator','!=',$request->user->id);
                }
          else  {
                if ($request->user == null || $request->user->is(['Admin']) === false)
                     {
                     $model = $model->where('published',true)->orWhere('creator', $request->user->id);
                     }
                }
          }
      else
          {
          if ($request->user === null || $request->user->is(['Admin']) === false)
                 {
                 $model = $model->where('published',true);
                 }
          }

      if($game !== null && $game !== 'ALL')
        {
            $model = $model->where(function($query) use ($game) {

                $ids   = Game::where('uuid',$game)->pluck('id');
                $ids   = $ids->toArray();
                $ids[] = 0;

                $query->whereIn('game_id',$ids);

            });

        }

      $model->with('chat');

      return $model;
  }

  public function store(Request $request)
  {

      if ($request->user === null)
            {
            return $this->respondForbidden();
            }

      $data              = $request->all();
      $data['published'] = false;

      $entry             = null;
      $game_id           = 0;

      if($request->input('game') !== null)
           {
           $game = Game::where('uuid',$request->input('game'))->first();
           if ($game !== null)
                {
                $game_id = $game->id;
                }
           }

      switch($data['type'])
            {
            case 'youtube':

              // Check for youtube data at all

              if(isset($data['channel']) === false || $data['channel'] == '')
                  {
                  return $this->respondBadRequest(_i('Bitte gib die Youtube ID für das Video an.'));
                  }

              // Check if the video exists

              $youtubeVideo = $data['channel'];
              $youtubeVideo = str_replace('https://youtu.be/','',$youtubeVideo);
              $youtubeVideo = str_replace('http://youtu.be/','', $youtubeVideo);
              $youtubeVideo = str_replace('https://www.youtube.com/embed/','', $youtubeVideo);
              $youtubeVideo = str_replace('http://www.youtube.com/embed/','', $youtubeVideo);

              $video = Youtube::getVideoInfo($youtubeVideo);

              $url   = 'https://www.youtube.com/embed/'.$data['channel'];

              // Check if the entry already exists

              $entry = StreamEntry::where('url',$url)->where('type','youtube')->first();

              if ($entry !== null)
                   {
                   return $this->respondBadRequest(_i('Das Video befindet sich bereits im System und kann kein zweites Mal hinzugefügt werden.'));
                   }

              if ($video === false)
                   {
                   return $this->respondBadRequest(_i('Es ist ein Fehler in der Kommunikation mit Youtube aufgetreten. Bitte versuche es erneut oder kontaktiere unser Team.'));
                   }

              $entry = StreamEntry::create([
                 'type'     => 'youtube',
                 'url'      => $url,
                 'creator'  => $request->user->id,
                 'headline' => $video->snippet->title,
                 'text'     => $video->snippet->description,
                 'image'    => $video->snippet->thumbnails->high->url,
                 'game_id'  => $game_id,
                 'channel'  => $video->snippet->channelId,
                 'published'=> false
              ]);

              $points = env('POINTS_YOUTUBE',1);

              break;
            case 'twitter':

              // Check for twitter data at all

              if(isset($data['url']) === false || $data['url'] == '')
                  {
                  return $this->respondBadRequest(_i('Bitte gib den Link zum Tweet an.'));
                  }

              $url = $data['url'];

              // Check if the entry already exists

              $entry = StreamEntry::where('url',$url)->where('type','twitter')->first();

                  if ($entry !== null)
                       {
                       return $this->respondBadRequest(_i('Der Tweet befindet sich bereits im System und kann kein zweites Mal hinzugefügt werden.'));
                       }

              if (starts_with($url,'https://twitter.com/') === false)
                      {
                      return $this->respondBadRequest(_i('Das scheint kein gültiger Link zu einem Tweet zu sein. Bitte überprüfe den Link nochmals.'));
                      }

              $tweetUrlParts = explode('/',$url);
              $tweetId       = $tweetUrlParts[sizeOf($tweetUrlParts) - 1];

              $tweet         = Twitter::getTweet($tweetId);

              if ($tweet !== null)
                    {

                    $image       = str_replace('_normal','',$tweet->user->profile_image_url_https);

                    $entry = StreamEntry::create([
                           'type'      => 'twitter',
                           'game_id'   => $game_id,
                           'url'       => $url,
                           'channel'   => $tweet->user->name,
                           'published' => false,
                           'image'     => $image,
                           'text'      => $tweet->text,
                           'creator'   => $request->user->id
                    ]);
                    }

              $points = env('POINTS_TWITTER',1);

              break;
            case 'twitch':

              $url      = 'https://api.twitch.tv/kraken/streams?client_id='.env('TWITCH_KEY','').'&channel='.data_get($data,'channel','');

              $client   = new \GuzzleHttp\Client();
              $guzzle   = $client->get($url);
              $response = json_decode($guzzle->getBody()->getContents());

              if (sizeOf($response->streams) === 0)
                   {
                   return $this->respondBadRequest(_i('Du kannst nur Livestreams hinzufügen.'));
                   }

              foreach($response->streams as $k => $stream)
              {

              // Check if the game is in the list of allowed games
              $game        = Game::where('name',$stream->game)->first();

              $entry       = StreamEntry::whereDate('created_at', Carbon::today())->where('channel', data_get($data,'channel',''))->where('game_id',$game_id)->first();

              if ($game !== null)
                    {
                    $game_id = $game->id;
                    }

              if ($entry === null)
                    {
                    $entry = StreamEntry::create([
                       'type'      => 'twitch',
                       'channel'   => data_get($data,'channel',''),
                       'game_id'   => $game_id,
                       'published' => true,
                       'live'      => true,
                       'creator'   => $request->user->id
                    ]);
                    }
              else  {
                    return $this->respondBadRequest(_i('Der Twitcheintrag wurde heute bereits hinzugefügt.'));
                    }

              if ($entry !== null)
                    {
                    $entry->live      = true;
                    $entry->published = true;
                    $entry->image     = $stream->channel->logo;
                    $entry->save();
                    }

              }

              $points = env('POINTS_TWITCH',1);
              break;
            default:

              $client   = new \GuzzleHttp\Client();

              $url      = data_get($data,'url',  null);
              $image    = data_get($data,'image','');

              if($url !== null)
                  {
                  $entry = StreamEntry::where('url',$url)->where('type','link')->first();
                  if ($entry !== null)
                       {
                       return $this->respondBadRequest(_i('Der Link/News befindet sich bereits im System und kann kein zweites Mal geteilt werden.'));
                       }
                  }

              $entry = StreamEntry::create([
                 'type'     => 'link',
                 'url'      => $url,
                 'creator'  => $request->user->id,
                 'headline' => data_get($data,'headline',''),
                 'text'     => data_get($data,'text',''),
                 'image'    => $image,
                 'game_id'  => $game_id,
                 'channel'  => data_get($data,'channel',''),
                 'published'=> false
              ]);

              $points = env('POINTS_NEWS',1);

              // Update the image if link isAvailable

              if ($url !== null)
                   {

                   $og = OpenGraph::fetch($url);

                   if (isset($og['image']) === true && $image === '')
                        {
                        $image        = $og['image'];
                        $entry->image = $image;
                        $entry->save();
                        }

                   }

              break;
            }

       if ($entry === null)
            {
            return $this->respondBadRequest();
            }

       // Create a chat

      $chat = Chat::create([
               'pid_table' => 'streams',
               'pid'       => $entry->id,
               'public'    => true
      ]);

      // Trusted users

      if ($request->user->trusted === true || $request->user->is(['Admin']) === true)
           {
           $entry->published = true;
           $entry->save();

           if (env('SLACK_WEBHOOK_URL',null)   != null &&
               env('SLACK_CHANNEL_POSTS',null) != null)
                 {
                 \Slack::to(env('SLACK_CHANNEL_POSTS','leagueofgirls'))->send(_i('Es wurde soeben ein neuer Beitrag wurde soeben veröffentlicht.'));
                 }
           }
      else {
           if (env('SLACK_WEBHOOK_URL',null)   != null &&
               env('SLACK_CHANNEL_POSTS',null) != null)
                 {
                 \Slack::to(env('SLACK_CHANNEL_POSTS','leagueofgirls'))->send(_i('Es wurde soeben ein neuer Beitrag eingereicht.'));
                 }
           }

      // Give the user his/her points

      if ($request->user !== null)
           {
           $request->user->addPoints($entry->id,'streams',$points);
           }

       // Entry was created
       return $this->respondSuccess(['data' => $entry->toArray()]);

  }

  public function update(Request $request, $uuid)
  {

      if ($request->user === null || $request->user->is(['Admin']) === false)
            {
            return $this->respondBadRequest(_i('Die gewünschte Aktion kann nicht durchgeführt werden.'));
            }

      $stream = StreamEntry::where('uuid',$uuid)->first();
      $data   = $request->all();

      $stream->update($data);

      return $this->respondSuccess(['data' => $stream->toArray()]);

  }

  // Get featured entry

  public function featured(Request $request)
  {
      $stream = StreamEntry::where('featured',true)->where('published',true)->orderBy('created_at','DESC');

      if ($request->input('game') && $request->input('game') !== 'ALL')
            {
            $game = Game::where('uuid',$request->input('game'))->first();
            if($game !== null)
                {
                $stream = $stream->where('game_id',$game->id);
                }
            }

      $stream = $stream->first();

      if ($stream === null)
           {
           return $this->respondSuccess(['data' => []]);
           }

      return $this->respondSuccess(['data' => $stream->toArray()]);

  }

}
