<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WebsiteSetting;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $settings = WebsiteSetting::first();
        return $this->successResponse($settings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $settings = WebsiteSetting::first();
        if (!$settings) {
            $settings = new WebsiteSetting();
        }
        $settings->fill($request->all());
        $settings->save();
        return $this->successResponse($settings, 'Settings updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function publicSettings()
    {
        $settings = WebsiteSetting::first();
        return $this->successResponse($settings);
    }
}
