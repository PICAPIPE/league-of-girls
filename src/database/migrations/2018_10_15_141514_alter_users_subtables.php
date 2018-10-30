<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersSubtables extends Migration
{

    public $addToTables = [
        'users_plattforms',
        'users_communications'
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach($this->addToTables as $k => $value)
        {
            if (Schema::hasTable($value) === true) {

                if (Schema::hasColumn($value, 'public') === false) {
      
                    Schema::table($value, function ($table) {
                        $table->boolean('public');
                    });
      
                }
      
            }
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach($this->addToTables as $k => $value)
        {
            if (Schema::hasTable($value) === true) {

                if (Schema::hasColumn($value, 'public')) {
                    Schema::table($value, function (Blueprint $table) {
                        $table->dropColumn('public');
                    });
                }
    
            }
        }
    }
}
