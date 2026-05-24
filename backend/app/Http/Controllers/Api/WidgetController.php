<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Widget;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    public function index()
    {
        $items = Widget::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $item = Widget::create($data);
        return $this->successResponse($item, 'Created successfully', 201);
    }

    public function show($id)
    {
        $item = Widget::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = Widget::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function destroy($id)
    {
        $item = Widget::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }
}