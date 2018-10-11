<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStreamReadlaterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stream_readlater', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('stream_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });

        if(Schema::hasTable('stream_readlater'))
          {

            Schema::table('stream_readlater', function ($table) {

                // Relations

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('cascade');

            });

            Schema::table('stream_readlater', function ($table) {

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
        Schema::dropIfExists('stream_readlater');
    }
}
