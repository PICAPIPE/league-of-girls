<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('games') === true) {

            if (Schema::hasColumn('games', 'twitch_game') === false) {
  
                Schema::table('games', function ($table) {
                    $table->string('twitch_game');
                });
  
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
        if (Schema::hasTable('games') === true) {

            if (Schema::hasColumn('games', 'twitch_game')) {
                Schema::table('games', function (Blueprint $table) {
                    $table->dropColumn('twitch_game');
                });
            }

        }
    }
}
