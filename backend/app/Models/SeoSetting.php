<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    protected $fillable = ['seoable_id', 'seoable_type', 'meta_title', 'meta_description', 'meta_keywords', 'og_image', 'twitter_card', 'canonical_url'];

    public function seoable()
    {
        return $this->morphTo();
    }
}
