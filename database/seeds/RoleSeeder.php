<?php

use Illuminate\Database\Seeder;

use App\Models\User\User;
use App\Models\User\UserRole;

use App\Models\Permissions\Role;
use App\Models\Permissions\RolePermission;

class RoleSeeder extends Seeder
{

    protected $roles = [
        'Admin'     => ['default' => false,'permissions' => ['Admin'], 'active' => true],
        'Standard'  => ['default' => true, 'permissions' => ['User'],  'active' => true]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $roles = collect(array_keys($this->roles));

      $roles->each(function($roleItem){

          $role = Role::where('name',$roleItem)->first();
          $roleData = $this->roles[$roleItem];

          if($role === null)
            {
               $role = Role::create(['name' => $roleItem]);
            }

          if($role !== null)
            {

                // Check if the role is the default role

                if(isset($roleData['default']))
                   {
                     $role->default = $roleData['default'];
                   }

                // Check if active

                if(isset($roleData['active']))
                  {
                    $role->active = $roleData['active'];
                  }

                if(isset($roleData['permissions']) === false)
                  {
                    $roleData['permissions'] = [];
                  }

                $role->setPermissions($roleData['permissions']);
                $role->save();

            }

      });

      // Update users

      $users      = User::where('id','>',0)->get();
      $rolesToSet = array_keys(collect($this->roles)->where('default',true)->toArray());

      $users->each(function($user) use ($rolesToSet){
          $user->setRoles($rolesToSet);
      });

    }
}
