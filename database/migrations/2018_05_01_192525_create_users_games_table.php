<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('users_games', function (Blueprint $table) {

          $table->increments('id');
          $table->uuid('uuid');

          $table->integer('user_id')->unsigned();
          $table->integer('game_id')->unsigned();
          $table->boolean('active');

          $table->timestamps();
      });

      // Setup the Relations

      if (Schema::hasTable('users_games')) {

          Schema::table('users_games', function ($table) {

              // Relations

              $table->foreign('game_id')
                  ->references('id')
                  ->on('games')
                  ->onDelete('cascade');

          });

      }

      if (Schema::hasTable('users_games')) {

          Schema::table('users_games', function ($table) {

              // Relations

              $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
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
        Schema::dropIfExists('users_games');
    }
}
