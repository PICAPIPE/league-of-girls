<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('communications', function (Blueprint $table) {

          $table->increments('id');
          $table->uuid('uuid');

          $table->string('name');
          $table->string('icon');

          $table->string('placeholder');
          $table->string('help');

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
        Schema::dropIfExists('communications');
    }
}
