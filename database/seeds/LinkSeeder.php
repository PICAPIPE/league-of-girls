<?php

use Illuminate\Database\Seeder;

use App\Models\Esport\Link;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $links = [
              'Twitch'     => ['name' => 'Twitch',  'icon' => 'fab fa-twitch',  'placeholder' => _i('Benutzername'), 'help' => _i('Gib deinen Twitch Username ein.'), 'type' => 'twitch', 'published' => true],
              'Youtube'    => ['name' => 'Youtube', 'icon' => 'fab fa-youtube', 'placeholder' => _i('Channel-ID'), 'help' => _i('Gib deine Channel-ID ein.'), 'type' => 'youtube', 'published' => true],
      ];

      $links = collect($links);

      $links->each(function($link) {

          $linkModel = Link::where('name',$link['name'])->first();

          if ($linkModel === null)
                {
                $linkModel = Link::create([
                   'name' => $link['name']
                ]);
                }

          if ($linkModel !== null)
                {
                $linkModel->name        = $link['name'];
                $linkModel->icon        = $link['icon'];
                $linkModel->placeholder = $link['placeholder'];
                $linkModel->help        = $link['help'];
                $linkModel->published   = $link['published'];
                $linkModel->save();
                }

        });

    }
}
