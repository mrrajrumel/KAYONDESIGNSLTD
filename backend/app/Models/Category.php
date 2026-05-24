<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = ['title', 'slug', 'description', 'image', 'status', 'order'];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function showcases()
    {
        return $this->hasMany(WorkShowcase::class);
    }
}
