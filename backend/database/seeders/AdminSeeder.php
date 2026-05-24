<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'name' => 'Raj Rumel',
            'username' => 'rajrumel',
            'email' => 'Rajrum3l@gmail.com',
            'password' => Hash::make('123456'),
            'role' => 'Super Admin',
            'permissions' => json_encode(['all']),
            'is_active' => true,
        ]);
    }
}
