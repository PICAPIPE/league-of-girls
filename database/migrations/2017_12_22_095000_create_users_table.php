<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->increments('id');
            $table->uuid('uuid');

            $table->string('email');
            $table->unique('email');

            $table->string('firstname');
            $table->string('lastname');

            $table->string('password');
            $table->rememberToken();

            $table->date('birthdate');
            $table->integer('gender');
            $table->integer('avatar_id');

            $table->boolean('locked');
            $table->boolean('active');

            $table->timestamp('loginAttempTimestamp');
            $table->integer('loginAttemps');

            $table->softDeletes();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
