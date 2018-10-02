<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersFriendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::create('users_friends', function (Blueprint $table) {
             $table->increments('id');
             $table->uuid('uuid');
             $table->integer('user_id')->unsigned();
             $table->integer('from_id')->unsigned();
             $table->timestamps();
         });

         if (Schema::hasTable('users_friends')) {

             Schema::table('users_friends', function ($table) {

                 // Relations

                 $table->foreign('user_id')
                     ->references('id')
                     ->on('users')
                     ->onDelete('cascade');

             });

             Schema::table('users_friends', function ($table) {

                 // Relations

                 $table->foreign('from_id')
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
         Schema::dropIfExists('users_friends');
     }
}
