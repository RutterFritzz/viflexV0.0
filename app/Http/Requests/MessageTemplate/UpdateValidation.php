<?php

    namespace App\Http\Requests\MessageTemplate;

    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Support\Facades\Auth;

    use App\Models\User;

    class UpdateValidation extends FormRequest
    {
        /**
            * Determine if the user is authorized to make this request.
        */
        public function authorize(): bool
        {
            // return Auth::user()->can('isAdmin', User::class);
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
                'name' => ['required', 'string'],
                'content' => ['required']
            ];
        }
    }
