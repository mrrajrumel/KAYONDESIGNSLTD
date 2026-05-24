<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index()
    {
        $items = Media::latest()->paginate(24);
        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|image|mimes:jpeg,png,jpg,webp,svg|max:5120',
        ]);

        $uploadedMedia = [];

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('media', 'public');
                $url = asset('storage/' . $path);

                $media = Media::create([
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $url,
                    'file_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                ]);

                $uploadedMedia[] = $media;
            }
        }

        return $this->successResponse($uploadedMedia, 'Files uploaded successfully', 201);
    }

    public function show($id)
    {
        $item = Media::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $item = Media::findOrFail($id);
        $item->update($request->all());
        return $this->successResponse($item, 'Updated successfully');
    }

    public function destroy($id)
    {
        $item = Media::findOrFail($id);

        // Extract relative path from URL
        $path = str_replace(asset('storage/'), '', $item->file_path);
        Storage::disk('public')->delete($path);

        $item->delete();
        return $this->successResponse(null, 'File deleted successfully');
    }
}