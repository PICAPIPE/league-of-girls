<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_roles', function (Blueprint $table) {

            $table->increments('id');
            $table->uuid('uuid');

            $table->integer('user_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->timestamps();
        });

        // Setup the Relations

        if (Schema::hasTable('users_roles')) {

            Schema::table('users_roles', function ($table) {

                // Relations

                $table->foreign('role_id')
                    ->references('id')
                    ->on('roles')
                    ->onDelete('cascade');

            });

        }

        if (Schema::hasTable('users_roles')) {

            Schema::table('users_roles', function ($table) {

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
        Schema::dropIfExists('users_roles');
    }
}
