<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('users_links') === true) {

            if (Schema::hasColumn('users_links', 'allow_crawler') === false) {
  
                Schema::table('users_links', function ($table) {
                    $table->boolean('allow_crawler');
                });
  
            }
  
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('users_links') === true) {

            if (Schema::hasColumn('users_links', 'allow_crawler')) {
                Schema::table('users_links', function (Blueprint $table) {
                    $table->dropColumn('allow_crawler');
                });
            }

        }
    }
}
