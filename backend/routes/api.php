<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\WorkShowcaseController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\WidgetController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\SeoSettingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ActivityLogController;

Route::post('/auth/login', [AdminController::class, 'login']);

// Public Routes
Route::get('/pages', [PageController::class, 'indexPublic']);
Route::get('/pages/{slug}', [PageController::class, 'showPublic']);
Route::get('/settings/public', [SettingController::class, 'publicSettings']);
Route::post('/contact', [ContactController::class, 'store']); // Use store method for public submission
Route::get('/showcases', [WorkShowcaseController::class, 'indexPublic']);
Route::get('/categories', [CategoryController::class, 'indexPublic']);
Route::get('/menus/{location}', [MenuController::class, 'showPublic']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AdminController::class, 'logout']);
    Route::get('/auth/me', [AdminController::class, 'me']);
    
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    
    Route::apiResource('pages', PageController::class);
    Route::apiResource('sections', SectionController::class);
    Route::apiResource('widgets', WidgetController::class);
    Route::apiResource('menus', MenuController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('showcases', WorkShowcaseController::class);
    Route::apiResource('media', MediaController::class);
    Route::apiResource('contact-messages', ContactController::class)->except(['store']);
    Route::put('/contact-messages/{id}/read', [ContactController::class, 'markAsRead']);
    
    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
    
    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings', [SettingController::class, 'update']);
    
    Route::get('/seo/{model}/{id}', [SeoSettingController::class, 'show']);
    Route::put('/seo/{model}/{id}', [SeoSettingController::class, 'update']);
    
    Route::apiResource('admins', AdminController::class)->except(['login', 'logout', 'me']);
});
