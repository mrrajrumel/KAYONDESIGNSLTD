<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::orderBy('order');
        
        if ($request->has('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        return $this->successResponse($query->get());
    }

    public function store(StoreCategoryRequest $request)
    {
        $item = Category::create($request->validated());
        return $this->successResponse($item, 'Category created successfully', 201);
    }

    public function show($id)
    {
        $item = Category::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $item = Category::findOrFail($id);
        $item->update($request->validated());
        return $this->successResponse($item, 'Category updated successfully');
    }

    public function destroy($id)
    {
        $item = Category::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }
}