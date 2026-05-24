<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        $items = Page::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $item = Page::create($data);
        return $this->successResponse($item, 'Created successfully', 201);
    }

    public function show($id)
    {
        $item = Page::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = Page::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function destroy($id)
    {
        $item = Page::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }

    public function indexPublic()
    {
        $items = Page::where('status', 'published')->get();
        return $this->successResponse($items);
    }

    public function showPublic($slug)
    {
        $item = Page::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return $this->successResponse($item);
    }
}