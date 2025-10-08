<?php

namespace App\Http\Requests\Gameday;

use Illuminate\Foundation\Http\FormRequest;

class SubmitPresenceRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'team_id' => 'required|exists:teams,id',
            'presence' => 'required|array',
            'presence.coaches' => 'sometimes|array',
            'presence.players' => 'sometimes|array',
        ];
    }
}
