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
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'email' => 'admin@kayondesigns.com',
            'password' => Hash::make('KayonAdmin!2026'),
            'role' => 'Super Admin',
            'permissions' => json_encode(['all']),
            'is_active' => true,
        ]);
    }
}
