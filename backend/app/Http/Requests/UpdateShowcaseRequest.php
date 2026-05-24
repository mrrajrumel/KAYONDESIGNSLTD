<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateShowcaseRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:work_showcases,slug,' . $this->route('showcase'),
            'description' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'images' => 'nullable|array',
            'category_id' => 'nullable|exists:categories,id',
            'is_featured' => 'boolean',
            'status' => 'boolean',
        ];
    }
}
