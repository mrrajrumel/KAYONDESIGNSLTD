<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WebsiteSetting;

class WebsiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        WebsiteSetting::updateOrCreate(
            ['id' => 1], // Assuming single row setup
            [
                'site_name' => 'Kayon Designs Ltd',
                'site_description' => 'London-based construction logistics and planning consultancy. CLPs, Swept Paths, Access Plans, Traffic Management and Tender Support.',
                'contact_email' => 'rajrumel@gmail.com',
                'phone' => '+44 (0) 123 456 789',
                'address' => 'London, United Kingdom',
                'social_links' => [
                    'facebook' => 'https://facebook.com/kayondesigns',
                    'twitter' => 'https://twitter.com/kayondesigns',
                    'linkedin' => 'https://linkedin.com/company/kayondesigns',
                    'instagram' => 'https://instagram.com/kayondesigns',
                ],
                'maintenance_mode' => false,
            ]
        );
    }
}
