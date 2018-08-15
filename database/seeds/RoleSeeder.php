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

                // Give the admin the admin role

                if (in_array('Admin',$roleData['permissions']) === true)
                     {

                     $user = User::where('email',env('ADMIN_EMAIL',null))->first();

                     if ($user !== null)
                           {

                           // Add user role only if the user does not have the current role
                           $userRoleCnt = UserRole::where('user_id',$user->id)->where('role_id',$role->id)->count()
                           if ($userRoleCnt === 0)
                                 {
                                 UserRole::create([
                                   'user_id' => $user->id,
                                   'role_id' => $role->id
                                 ]);
                                 }
                                 
                           }
                     }


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
