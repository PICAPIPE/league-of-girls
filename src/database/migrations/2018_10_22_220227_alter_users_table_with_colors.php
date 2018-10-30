<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTableWithColors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('users') === true) {

            if (Schema::hasColumn('users', 'color') === false) {
  
                Schema::table('users', function ($table) {
                    $table->string('color');
                });
  
            }

            if (Schema::hasColumn('users', 'background') === false) {
  
                Schema::table('users', function ($table) {
                    $table->string('background');
                });
  
            }

            \DB::statement("UPDATE users SET color='#FFFFFF'");
  
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

            if (Schema::hasColumn('users', 'color')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->dropColumn('color');
                });
            }

            if (Schema::hasColumn('users', 'background')) {
                Schema::table('users', function (Blueprint $table) {
                    $table->dropColumn('background');
                });
            }

        }
    }
}
