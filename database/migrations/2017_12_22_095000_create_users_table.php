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

            $table->string('username');

            $table->string('firstname');
            $table->string('lastname');

            $table->string('password');
            $table->rememberToken();

            $table->longText('about');

            $table->date('birthdate');
            $table->enum('gender',  config('user.enums.types'));
            $table->integer('avatar_id')->default(0);

            $table->boolean('locked')->default(false);
            $table->boolean('active');
            $table->boolean('newsletter')->default(false);

            $table->timestamp('loginAttempTimestamp');
            $table->integer('loginAttemps')->default(0);

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
