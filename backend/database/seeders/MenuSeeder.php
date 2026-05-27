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
                    ['label' => 'Home', 'url' => '/#hero'],
                    ['label' => 'About', 'url' => '/#about'],
                    ['label' => 'Services', 'url' => '/#services'],
                    ['label' => 'Planning Showcase', 'url' => '/#showcase'],
                    ['label' => 'Contact', 'url' => '/#contact'],
                ]
            ]
        );

        Menu::updateOrCreate(
            ['location' => 'footer'],
            [
                'name' => 'Footer Links',
                'items' => [
                    ['label' => 'Home', 'url' => '/#hero'],
                    ['label' => 'About', 'url' => '/#about'],
                    ['label' => 'Services', 'url' => '/#services'],
                    ['label' => 'Planning Showcase', 'url' => '/#showcase'],
                    ['label' => 'Contact', 'url' => '/#contact'],
                    ['label' => 'Privacy Policy', 'url' => '/privacy-policy'],
                    ['label' => 'Terms of Service', 'url' => '/terms-of-service'],
                ]
            ]
        );
    }
}
