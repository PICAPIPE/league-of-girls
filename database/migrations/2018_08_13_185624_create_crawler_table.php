<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCrawlerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crawler', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('game');
            $table->enum('type',  ['twitch', 'youtube', 'rss', 'twitter','twitter_hashtag', 'facebook']);
            $table->string('channel');
            $table->string('url');
            $table->string('tag');
            $table->integer('interval');
            $table->boolean('published');
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
        Schema::dropIfExists('crawler');
    }
}
