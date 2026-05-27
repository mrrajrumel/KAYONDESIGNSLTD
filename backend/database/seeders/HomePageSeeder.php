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

        // 3. Seed Hero Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Hero',
            'type' => 'hero',
            'order' => 1,
            'is_active' => true,
            'content' => [
                'title' => 'Planning Focus.<br />Delivery Success.',
                'subtitle' => 'Est. London &middot; Supporting Developers & Contractors',
                'description' => 'Strategic logistics planning that supports project success from the start. We bridge the gap between architectural vision and buildable reality.',
                'bullets' => ['Buildable.', 'Compliant.', 'Efficient.'],
                'buttonText' => 'Get a Quote',
                'buttonUrl' => '/#contact',
                'backgroundImage' => 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1600',
                'sideImage' => 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'
            ]
        ]);

        // 4. Seed About Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'About',
            'type' => 'features',
            'order' => 2,
            'is_active' => true,
            'content' => [
                'title' => 'About Kayon Designs',
                'description' => 'We are an industry-leading construction logistics consultancy. We provide comprehensive logistics plans tailored to secure planning approvals and ensure site feasibility for any development across London and the UK.',
                'items' => [
                    ['icon' => 'CheckCircle2', 'title' => 'Reduce Risk', 'desc' => 'Identifying bottlenecks before they impact your programme.'],
                    ['icon' => 'TrendingUp', 'title' => 'Improve Approvals', 'desc' => 'Expert knowledge of local authority requirements.'],
                    ['icon' => 'Zap', 'title' => 'Save Time', 'desc' => 'Streamlined processes developed through years of experience.'],
                ]
            ]
        ]);

        // 5. Seed Services Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Services',
            'type' => 'services_list',
            'order' => 3,
            'is_active' => true,
            'content' => [
                'title' => 'Our Core Services',
                'description' => 'Explore our specialized logistics and planning support solutions.',
                'items' => [
                    [
                        'icon' => 'ClipboardList',
                        'title' => 'CLPs',
                        'desc' => 'Comprehensive Construction Logistics Plans tailored to secure planning approvals and ensure site feasibility.',
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

        // 6. Seed Contact Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Contact',
            'type' => 'contact',
            'order' => 4,
            'is_active' => true,
            'content' => [
                'title' => 'Let\'s Talk About Your Project',
                'description' => 'We are here to help with your project needs. Fill out the form or reach out directly.'
            ]
        ]);
    }
}
