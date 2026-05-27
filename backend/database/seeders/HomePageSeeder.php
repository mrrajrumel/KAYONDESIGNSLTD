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
            'type' => 'about',
            'order' => 2,
            'is_active' => true,
            'content' => []
        ]);

        // 5. Seed Services Section
        Section::create([
            'page_id' => $homePage->id,
            'name' => 'Services',
            'type' => 'services',
            'order' => 3,
            'is_active' => true,
            'content' => []
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
