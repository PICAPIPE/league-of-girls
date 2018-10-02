<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles_permissions', function (Blueprint $table) {

            $table->increments('id');
            $table->uuid('uuid');

            $table->integer('role_id')->unsigned();
            $table->string('permission');

            $table->timestamps();
        });

        // Setup the relations

        if (Schema::hasTable('roles_permissions')) {

            Schema::table('roles_permissions', function ($table) {

                // Relations

                $table->foreign('role_id')
                    ->references('id')
                    ->on('roles')
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
        Schema::dropIfExists('roles_permissions');
    }
}
