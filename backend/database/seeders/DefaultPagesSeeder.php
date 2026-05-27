<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\Section;

class DefaultPagesSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'About Us',
                'slug' => 'about',
                'content' => '<h1>About Kayon Designs Ltd</h1><p>We are a London-based construction logistics consultancy bridging the gap between architectural vision and buildable reality.</p>'
            ],
            [
                'title' => 'Our Services',
                'slug' => 'services',
                'content' => '<h1>Our Services</h1><p>Explore our range of logistics and planning services tailored to developers, contractors, and consultants.</p>'
            ],
            [
                'title' => 'Planning Support',
                'slug' => 'planning',
                'content' => '<h1>Planning Support</h1><p>We help secure planning approvals through comprehensive logistics plans and traffic management.</p>'
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'content' => '<h1>Privacy Policy</h1><p>Your privacy is critically important to us.</p>'
            ],
            [
                'title' => 'Terms of Service',
                'slug' => 'terms-of-service',
                'content' => '<h1>Terms of Service</h1><p>These terms of service outline the rules and regulations for the use of our website.</p>'
            ]
        ];

        foreach ($pages as $pageData) {
            Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                [
                    'title' => $pageData['title'],
                    'status' => 'published',
                    'content' => $pageData['content'],
                    'is_home' => false,
                ]
            );
        }
    }
}
