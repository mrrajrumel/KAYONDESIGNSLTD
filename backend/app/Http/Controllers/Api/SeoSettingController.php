<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SeoSetting;

class SeoSettingController extends Controller
{
    public function show($model, $id)
    {
        $modelClass = "App\\Models\\" . ucfirst($model);
        if (!class_exists($modelClass)) {
            return $this->errorResponse('Model not found', 404);
        }

        $seo = SeoSetting::where('seoable_type', $modelClass)->where('seoable_id', $id)->first();
        return $this->successResponse($seo);
    }

    public function update(Request $request, $model, $id)
    {
        $modelClass = "App\\Models\\" . ucfirst($model);
        if (!class_exists($modelClass)) {
            return $this->errorResponse('Model not found', 404);
        }

        $seo = SeoSetting::updateOrCreate(
            ['seoable_type' => $modelClass, 'seoable_id' => $id],
            $request->only(['meta_title', 'meta_description', 'meta_keywords', 'og_image', 'twitter_card', 'canonical_url'])
        );

        return $this->successResponse($seo, 'SEO settings updated successfully');
    }
}
