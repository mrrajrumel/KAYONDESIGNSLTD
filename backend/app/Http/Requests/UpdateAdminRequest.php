<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'username' => 'sometimes|required|string|max:255|unique:admins,username,' . $this->route('admin'),
            'email' => 'sometimes|required|email|max:255|unique:admins,email,' . $this->route('admin'),
            'password' => 'nullable|string|min:6',
            'role' => 'sometimes|required|string',
            'permissions' => 'nullable|array',
            'is_active' => 'boolean',
        ];
    }
}
