<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_links', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('user_id')->unsigned();
            $table->integer('link_id')->unsigned();
            $table->string('value');
            $table->boolean('active');
            $table->timestamps();
        });

        // Setup the Relations

        if (Schema::hasTable('users_links')) {

            Schema::table('users_links', function ($table) {

                // Relations

                $table->foreign('link_id')
                    ->references('id')
                    ->on('links')
                    ->onDelete('cascade');

            });

        }

        if (Schema::hasTable('users_links')) {

            Schema::table('users_links', function ($table) {

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
        Schema::dropIfExists('users_links');
    }
}
