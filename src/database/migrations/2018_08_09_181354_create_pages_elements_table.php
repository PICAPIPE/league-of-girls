<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesElementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages_elements', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('sort');
            $table->integer('page_id')->unsigned();
            $table->enum('type',['headline','text','image','html','custom','youtube','twitter','twitch',]);
            $table->string('headline')->nullable();
            $table->string('headlineSize')->nullable();
            $table->longText('html')->nullable();
            $table->longText('text')->nullable();
            $table->string('image')->nullable();
            $table->string('imageClass')->nullable();
            $table->string('youtube')->nullable();
            $table->string('twitch')->nullable();
            $table->string('twitter')->nullable();
            $table->string('url')->nullable();
            $table->string('cssClass');
            $table->boolean('published');

            $table->timestamps();
        });

        if (Schema::hasTable('pages_elements')) {

            Schema::table('pages_elements', function ($table) {

                // Relations

                $table->foreign('page_id')
                    ->references('id')
                    ->on('pages')
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
        Schema::dropIfExists('pages_elements');
    }
}
