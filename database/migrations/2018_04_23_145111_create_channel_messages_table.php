<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChannelMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('channel_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->longText('message');
            $table->timestamps();
        });

        if (Schema::hasTable('channels')) {

            Schema::table('channel_messages', function ($table) {

                // Relations

                $table->foreign('channel_id')
                    ->references('id')
                    ->on('channels')
                    ->onDelete('cascade');

            });

        }

        if (Schema::hasTable('users')) {

            Schema::table('channel_messages', function ($table) {

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
        Schema::dropIfExists('channel_messages');
    }
}
