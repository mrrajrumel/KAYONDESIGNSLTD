<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Admin::latest();
        
        if ($request->has('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('email', 'LIKE', '%' . $request->search . '%');
        }

        return $this->successResponse($query->paginate(10));
    }

    public function store(StoreAdminRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $item = Admin::create($data);
        return $this->successResponse($item, 'Admin created successfully', 201);
    }

    public function show($id)
    {
        $item = Admin::findOrFail($id);
        return $this->successResponse($item);
    }

    public function update(UpdateAdminRequest $request, $id)
    {
        $item = Admin::findOrFail($id);
        $data = $request->validated();
        
        if (isset($data['password']) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $item->update($data);
        return $this->successResponse($item, 'Admin updated successfully');
    }

    public function destroy($id)
    {
        $item = Admin::findOrFail($id);
        if ($item->role === 'Super Admin') {
            return $this->errorResponse('Cannot delete Super Admin', 403);
        }
        $item->delete();
        return $this->successResponse(null, 'Admin deleted successfully');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', 'LIKE', $request->email)->first();

        if (! $admin || ! Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (! $admin->is_active) {
            return response()->json(['message' => 'Account is deactivated'], 403);
        }

        $admin->last_login_at = now();
        $admin->save();

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'admin' => $admin
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
