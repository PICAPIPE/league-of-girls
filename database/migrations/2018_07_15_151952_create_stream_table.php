<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStreamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stream', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('creator');
            $table->enum('type',  ['blog', 'twitch', 'youtube', 'link', 'twitter', 'facebook']);
            $table->string('channel');
            $table->string('headline');
            $table->longText('text');
            $table->longText('url');
            $table->longText('image');
            $table->boolean('live');
            $table->boolean('featured');
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
        Schema::dropIfExists('stream');
    }
}
