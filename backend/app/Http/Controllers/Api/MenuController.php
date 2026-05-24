<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $items = Menu::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $item = Menu::create($data);
        return $this->successResponse($item, 'Created successfully', 201);
    }

    public function show($id)
    {
        $item = Menu::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = Menu::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function destroy($id)
    {
        $item = Menu::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }

    public function showPublic($location)
    {
        $item = Menu::where('location', $location)->first();
        return $this->successResponse($item);
    }
}