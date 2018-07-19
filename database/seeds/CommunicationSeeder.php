<?php

use Illuminate\Database\Seeder;

use App\Models\Esport\Communication;

class CommunicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $communications = [
              'Skype'     => ['name' => 'Skype', 'icon' => 'fab fa-skype', 'placeholder' => _i('Benutzername'), 'help' => _i('Gib deinen Benutzernamen ein.'), 'published' => true],
      ];

      $communications = collect($communications);

      $communications->each(function($communication) {

          $communicationModel = Communication::where('name',$communication['name'])->first();

          if ($communicationModel === null)
                {
                $communicationModel = Communication::create([
                   'name' => $communication['name']
                ]);
                }

          if ($communicationModel !== null)
                {
                $communicationModel->name        = $communication['name'];
                $communicationModel->icon        = $communication['icon'];
                $communicationModel->placeholder = $communication['placeholder'];
                $communicationModel->help        = $communication['help'];
                $communicationModel->published   = $communication['published'];
                $communicationModel->save();
                }

      });
    }
}
