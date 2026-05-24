<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    protected $fillable = ['site_name', 'site_description', 'logo', 'favicon', 'contact_email', 'phone', 'address', 'social_links', 'maintenance_mode'];

    protected $casts = [
        'social_links' => 'array',
        'maintenance_mode' => 'boolean',
    ];
}
