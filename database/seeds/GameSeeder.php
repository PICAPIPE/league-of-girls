<?php

use Illuminate\Database\Seeder;

use App\Models\Esport\Game;
use App\Models\Esport\GameKeyword;

class GameSeeder extends Seeder
{
    protected $games = [
        'CSGO'     => ['name' => 'Counterstrike Go',  'short' => 'CS:GO', 'icon' => '', 'color' => '', 'background' => '', 'published' => true, 'keywords' => ['cs','csgo']],
        'LOL'      => ['name' => 'League of Legends', 'short' => 'LOL',   'icon' => '', 'color' => '', 'background' => '', 'published' => true, 'keywords' => ['lol','LOL','leagueoflegends']],
        'FIFA'     => ['name' => 'FIFA',              'short' => 'FIFA',  'icon' => '', 'color' => '', 'background' => '', 'published' => true, 'keywords' => ['fifa']]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $games = collect($this->games);

        $games->each(function($game) {

            $gameModel = Game::where('name',$game['name'])->first();

            if ($gameModel === null)
                  {
                  $gameModel = Game::create([
                     'name' => $game['name']
                  ]);
                  }

            if ($gameModel !== null)
                  {
                  $gameModel->name        = $game['name'];
                  $gameModel->short       = $game['short'];
                  $gameModel->icon        = $game['icon'];
                  $gameModel->color       = $game['color'];
                  $gameModel->background  = $game['background'];
                  $gameModel->published   = $game['published'];
                  $gameModel->save();
                  }

            if(isset($game['keywords']))
                  {
                  foreach ($game['keywords'] as $keyW => $valueW)
                    {
                        $keyword = GameKeyword::where('game_id', $gameModel->id)->where('keyword',$valueW)->first();
                        if ($keyword === null)
                              {
                                GameKeyword::create([
                                  'game_id' => $gameModel->id,
                                  'keyword' => $valueW
                                ]);
                              }
                    }
                  }

        });
    }
}
