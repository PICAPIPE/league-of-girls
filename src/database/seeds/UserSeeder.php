<?php

use Illuminate\Database\Seeder;

use App\Models\User\User;

use Carbon\Carbon;



class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create an adminstration account
        $admin_email = env('ADMIN_EMAIL',null);
        $admin_pw    = env('ADMIN_PW',   null);
        $user        = null;

        if($admin_email !== null &&
           $admin_pw    !== null)
             {
             $user = User::where('email', $admin_email)->first();

             // Only create user if the user doesn't already exists
             if ($user === null)
                    {
                    $user = User::create([
                        'email'     => $admin_email,
                        'password'  => bcrypt($admin_pw),
                        'username'  => 'Administrator',
                        'firstname' => 'Administrator',
                        'lastname'  => '',
                        'active'    => true,
                        'trusted'   => true,
                        'birthdate' => Carbon::now()->toDateTimeString()
                    ]);
                    }

             }

    }
}
