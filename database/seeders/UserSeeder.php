<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UserSeeder extends Seeder
{
    protected $users = [
        'Aiden', 'Patrick', 'Jesper',
        'Rutger', 'Gebruiker'
    ];

    /**
        * Run the database seeds.
    */
    public function run(): void
    {
        foreach ($this->users as $name) {
            $user = new User();

            $user->name = $name;
            $user->email = strtolower($name) . '@customwebsite.nl';
            $user->password = Hash::make('Welkom123');

            $user->save();
        }
    }
}
