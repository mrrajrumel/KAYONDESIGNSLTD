<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkShowcase;
use Illuminate\Http\Request;

class WorkShowcaseController extends Controller
{
    public function index()
    {
        $items = WorkShowcase::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $item = WorkShowcase::create($data);
        return $this->successResponse($item, 'Created successfully', 201);
    }

    public function show($id)
    {
        $item = WorkShowcase::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = WorkShowcase::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
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