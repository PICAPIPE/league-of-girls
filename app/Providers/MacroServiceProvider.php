<?php

namespace App\Providers;

use Schema;

use Illuminate\Support\ServiceProvider;

use ResourceHelper;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        $classes = ResourceHelper::getClasses(app_path('Macros'),'Macro',true,false);

        foreach ($classes as $kC => $vC) {

           $className = $vC;
           $cl        = new $className();

           if(method_exists($cl,'register') === true){
             $cl->register();
           }

        }
    }
}
