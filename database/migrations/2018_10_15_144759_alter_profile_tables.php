<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProfileTables extends Migration
{
    public $addToTables = [
        'plattforms',
        'communications'
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

                if (Schema::hasColumn($value, 'action') === false) {
      
                    Schema::table($value, function ($table) {
                        $table->string('action');
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

                if (Schema::hasColumn($value, 'action')) {
                    Schema::table($value, function (Blueprint $table) {
                        $table->dropColumn('action');
                    });
                }
    
            }
        }
    }
}
