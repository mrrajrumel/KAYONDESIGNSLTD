<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::latest();
        
        if ($request->has('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        return $this->successResponse($query->paginate(10));
    }

    public function store(StorePageRequest $request)
    {
        $item = Page::create($request->validated());
        return $this->successResponse($item, 'Page created successfully', 201);
    }

    public function show($id)
    {
        $item = Page::with('sections')->findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(UpdatePageRequest $request, $id)
    {
        $item = Page::findOrFail($id);
        $item->update($request->validated());
        return $this->successResponse($item, 'Page updated successfully');
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