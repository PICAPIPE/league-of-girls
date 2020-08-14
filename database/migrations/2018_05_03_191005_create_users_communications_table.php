<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersCommunicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_communications', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('user_id')->unsigned();
            $table->integer('communication_id')->unsigned();
            $table->longText('value');
            $table->boolean('active');
            $table->timestamps();
        });

        if (Schema::hasTable('users_communications')) {

            Schema::table('users_communications', function ($table) {

                // Relations

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

            });

        }

        if (Schema::hasTable('users_communications')) {

            Schema::table('users_communications', function ($table) {

                // Relations

                $table->foreign('communication_id')
                    ->references('id')
                    ->on('communications')
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
        Schema::dropIfExists('users_communications');
    }
}
