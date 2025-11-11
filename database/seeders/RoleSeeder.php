<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    protected $roles = ['Admin', 'User', 'Coach', 'Teamleider', 'Scheidsrechter'];

    /**
        * Run the database seeds.
    */
    public function run(): void
    {
        foreach($this->roles as $name) {
            $role = new Role();

            $role->name = $name;
            $role->save();
        }
    }
}
