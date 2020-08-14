<?php


use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersForGenderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('users') === true) {

            \DB::statement("ALTER TABLE users CHANGE COLUMN gender gender ENUM('female', 'male', 'misc') NOT NULL DEFAULT 'female'");
  
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('users') === true) {

            \DB::statement("ALTER TABLE users CHANGE COLUMN gender gender ENUM('female', 'male') NOT NULL DEFAULT 'female'");
  
        }
    }
}
