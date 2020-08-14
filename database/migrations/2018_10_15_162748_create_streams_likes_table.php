<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStreamsLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stream_likes', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('stream_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->enum('type',  ['like', 'heart', 'hate', 'woot', 'sad']);
            $table->timestamps();
        });

        if(Schema::hasTable('stream_likes'))
          {

            Schema::table('stream_likes', function ($table) {

                // Relations

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

            });

            Schema::table('stream_likes', function ($table) {

                // Relations

                $table->foreign('stream_id')
                    ->references('id')
                    ->on('stream')
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
        Schema::dropIfExists('stream_likes');
    }
}
