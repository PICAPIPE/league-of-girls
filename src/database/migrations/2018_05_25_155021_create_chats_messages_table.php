<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatsMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('chat_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->boolean('reported');
            $table->longText('text');
            $table->timestamps();
        });

        if(Schema::hasTable('chats_messages'))
          {

            Schema::table('chats_messages', function ($table) {

                // Relations

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

            });

            Schema::table('chats_messages', function ($table) {

                // Relations

                $table->foreign('chat_id')
                    ->references('id')
                    ->on('chats')
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
        Schema::dropIfExists('chats_messages');
    }
}
