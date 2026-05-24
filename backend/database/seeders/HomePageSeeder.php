<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\Section;

class HomePageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create the Home Page
        $homePage = Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Home',
                'status' => 'published',
                'is_home' => true,
            ]
        );

        // 2. Clear any existing sections to avoid duplicates
        $homePage->sections()->delete();

        // 3. Seed Services Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Services',
            'type' => 'services_list',
            'order' => 1,
            'is_active' => true,
            'content' => [
                'items' => [
                    [
                        'icon' => 'ClipboardList',
                        'title' => 'CLPs',
                        'desc' => 'Comprehensive Construction Logistics Plans tailored to secure planning approvals and ensure site feasibility for any development.',
                    ],
                    [
                        'icon' => 'Truck',
                        'title' => 'Swept Paths',
                        'desc' => 'Vehicle tracking analysis for precise site access and clearance verification across all vehicle types.',
                    ],
                    [
                        'icon' => 'Map',
                        'title' => 'Access Plans',
                        'desc' => 'Strategic entry and exit route design for optimal site efficiency and pedestrian safety.',
                    ],
                    [
                        'icon' => 'TrafficCone',
                        'title' => 'Traffic Management',
                        'desc' => 'Advanced planning for urban streetworks and complex logistics coordination in busy city environments.',
                    ],
                    [
                        'icon' => 'Handshake',
                        'title' => 'Tender Support',
                        'desc' => 'Professional logistics visualisation and strategic planning that gives your bids the winning edge.',
                    ],
                ]
            ]
        ]);

        // 4. Seed Values Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Core Values',
            'type' => 'values_list',
            'order' => 2,
            'is_active' => true,
            'content' => [
                'items' => [
                    ['icon' => 'CheckCircle2', 'title' => 'Reduce Risk', 'desc' => 'Identifying bottlenecks before they impact your programme.'],
                    ['icon' => 'TrendingUp', 'title' => 'Improve Approvals', 'desc' => 'Expert knowledge of local authority requirements.'],
                    ['icon' => 'Zap', 'title' => 'Save Time', 'desc' => 'Streamlined processes developed through years of experience.'],
                    ['icon' => 'Target', 'title' => 'Protect Programme', 'desc' => 'Resilient logistics that adapt to site-specific challenges.'],
                ]
            ]
        ]);
        
        // 5. Seed Qualities Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Our Qualities',
            'type' => 'qualities_list',
            'order' => 3,
            'is_active' => true,
            'content' => [
                'items' => [
                    ['icon' => 'Users', 'title' => 'Collaborative', 'desc' => 'We work as an extension of your project team.'],
                    ['icon' => 'Zap', 'title' => 'Responsive', 'desc' => 'Agile turnarounds to meet tight submission windows.'],
                    ['icon' => 'TrendingUp', 'title' => 'Commercially Aware', 'desc' => 'Balancing compliance with cost-effective strategies.'],
                    ['icon' => 'Target', 'title' => 'Delivery Driven', 'desc' => 'Real-world solutions that keep your programme on track.'],
                ]
            ]
        ]);
    }
}
