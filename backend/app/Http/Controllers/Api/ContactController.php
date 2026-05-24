<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use App\Http\Requests\StoreContactMessageRequest;

class ContactController extends Controller
{
    public function index()
    {
        $items = ContactMessage::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(StoreContactMessageRequest $request)
    {
        $validatedData = $request->validated();
        $item = ContactMessage::create($validatedData);

        return $this->successResponse($item, 'Your message has been received. We will get back to you shortly.', 201);
    }

    public function show($id)
    {
        $item = ContactMessage::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = ContactMessage::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function markAsRead($id)
    {
        $item = ContactMessage::findOrFail($id);
        $item->update(['is_read' => true]);
        return $this->successResponse($item, 'Marked as read');
    }

    public function destroy($id)
    {
        $item = ContactMessage::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }
}