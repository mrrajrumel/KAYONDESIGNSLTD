<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkShowcase;
use Illuminate\Http\Request;
use App\Http\Requests\StoreShowcaseRequest;
use App\Http\Requests\UpdateShowcaseRequest;

class WorkShowcaseController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkShowcase::with('category')->latest();
        
        if ($request->has('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return $this->successResponse($query->paginate(10));
    }

    public function store(StoreShowcaseRequest $request)
    {
        $item = WorkShowcase::create($request->validated());
        return $this->successResponse($item, 'Project added successfully', 201);
    }

    public function show($id)
    {
        $item = WorkShowcase::with('category')->findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(UpdateShowcaseRequest $request, $id)
    {
        $item = WorkShowcase::findOrFail($id);
        $item->update($request->validated());
        return $this->successResponse($item, 'Project updated successfully');
    }

    public function destroy($id)
    {
        $item = WorkShowcase::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }

    public function indexPublic()
    {
        $items = WorkShowcase::where('status', true)->with('category')->latest()->get();
        return $this->successResponse($items);
    }
}