<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkShowcase extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'slug', 'description', 'featured_image', 'images', 'category_id', 'is_featured', 'status'];

    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
        'status' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
