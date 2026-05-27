<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        $items = Section::latest()->paginate(10);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $item = Section::create($data);
        return $this->successResponse($item, 'Created successfully', 201);
    }

    public function show($id)
    {
        $item = Section::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = Section::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|exists:sections,id',
            'sections.*.order' => 'required|integer',
        ]);

        foreach ($request->sections as $sectionData) {
            Section::where('id', $sectionData['id'])->update(['order' => $sectionData['order']]);
        }

        return $this->successResponse(null, 'Sections reordered successfully');
    }

    public function destroy($id)
    {
        $item = Section::findOrFail($id);
        $item->delete();
        return $this->successResponse(null, 'Deleted successfully');
    }
}