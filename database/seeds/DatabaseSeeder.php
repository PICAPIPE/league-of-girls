<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $resources = ResourceHelper::getClasses(base_path('database/seeds'),'Seeder',true,'DatabaseSeeder',true);

         if(sizeOf($resources) > 0)
             {
             asort($resources);
             foreach($resources as $kResource => $vResource)
                {
                $this->call($vResource);
                }
             }

      }
}
