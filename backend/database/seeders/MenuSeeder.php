<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        Menu::updateOrCreate(
            ['location' => 'header'],
            [
                'name' => 'Main Navigation',
                'items' => [
                    ['label' => 'Home', 'url' => '/'],
                    ['label' => 'About', 'url' => '/about'],
                    ['label' => 'Services', 'url' => '/services'],
                    ['label' => 'Planning', 'url' => '/planning'],
                    ['label' => 'Contact', 'url' => '/contact'],
                ]
            ]
        );

        Menu::updateOrCreate(
            ['location' => 'footer'],
            [
                'name' => 'Footer Links',
                'items' => [
                    ['label' => 'About Us', 'url' => '/about'],
                    ['label' => 'Our Services', 'url' => '/services'],
                    ['label' => 'Planning', 'url' => '/planning'],
                    ['label' => 'Contact', 'url' => '/contact'],
                    ['label' => 'Privacy Policy', 'url' => '/privacy-policy'],
                    ['label' => 'Terms of Service', 'url' => '/terms-of-service'],
                ]
            ]
        );
    }
}
