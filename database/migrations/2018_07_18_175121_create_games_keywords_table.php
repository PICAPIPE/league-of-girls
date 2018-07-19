<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesKeywordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games_keywords', function (Blueprint $table) {
            $table->increments('id');
              $table->uuid('uuid');
            $table->integer('game_id')->unsigned();
            $table->string('keyword');
            $table->timestamps();
        });

        if (Schema::hasTable('games_keywords'))
        {

            Schema::table('games_keywords', function ($table) {

                // Relations

                $table->foreign('game_id')
                    ->references('id')
                    ->on('games')
                    ->onDelete('cascade');

            });

        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games_keywords');
    }
}
