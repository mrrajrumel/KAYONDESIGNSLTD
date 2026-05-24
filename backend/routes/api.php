<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\ContactController;

Route::post('/auth/login', [AdminController::class, 'login']);

// Public Routes
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);
Route::get('/settings/public', [SettingController::class, 'publicSettings']);
Route::post('/contact', [ContactController::class, 'submit']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AdminController::class, 'logout']);
    Route::get('/auth/me', [AdminController::class, 'me']);
    
    // Additional protected routes (Pages, Sections, etc.) will go here
});
