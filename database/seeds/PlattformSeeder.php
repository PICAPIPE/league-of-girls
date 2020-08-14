<?php

use Illuminate\Database\Seeder;

use App\Models\Esport\Plattform;

class PlattformSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $plattforms = [
              'PS4'     => ['name' => 'Playstation', 'icon' => 'fab fa-playstation', 'placeholder' => _i('Benutzername'), 'help' => _i('Gib deinen Benutzernamen ein.'), 'published' => true],
      ];

      $plattforms = collect($plattforms);

      $plattforms->each(function($plattform) {

          $plattformModel = Plattform::where('name',$plattform['name'])->first();

          if ($plattformModel === null)
                {
                $plattformModel = Plattform::create([
                   'name' => $plattform['name']
                ]);
                }

          if ($plattformModel !== null)
                {
                $plattformModel->name        = $plattform['name'];
                $plattformModel->icon        = $plattform['icon'];
                $plattformModel->placeholder = $plattform['placeholder'];
                $plattformModel->help        = $plattform['help'];
                $plattformModel->published   = $plattform['published'];
                $plattformModel->save();
                }

      });
    }
}
