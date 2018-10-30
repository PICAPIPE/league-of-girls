<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('users_categories', function (Blueprint $table) {

          $table->increments('id');
          $table->uuid('uuid');

          $table->integer('user_id')->unsigned();
          $table->integer('category_id')->unsigned();
          $table->boolean('active');

          $table->timestamps();
      });

      // Setup the Relations

      if (Schema::hasTable('users_categories')) {

          Schema::table('users_categories', function ($table) {

              // Relations

              $table->foreign('category_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade');

          });

      }

      if (Schema::hasTable('users_categories')) {

          Schema::table('users_categories', function ($table) {

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
        Schema::dropIfExists('users_categories');
    }
}
