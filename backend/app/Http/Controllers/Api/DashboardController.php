<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\ContactMessage;
use App\Models\WorkShowcase;

class DashboardController extends Controller
{
    public function stats()
    {
        return $this->successResponse([
            'pages' => Page::count(),
            'messages' => ContactMessage::count(),
            'showcases' => WorkShowcase::count(),
            'unread_messages' => ContactMessage::where('is_read', false)->count()
        ]);
    }
}