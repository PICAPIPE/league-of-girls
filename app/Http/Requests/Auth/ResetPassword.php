<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPassword extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user'                => 'required',
            'password1'           => 'required|same:password2',
            'password2'           => 'required|same:password1',
        ];
    }

    public function messages()
    {
        return [
            'user.required'       => _i('Die Benutzer-ID ist nicht vorhanden'),
            'password1.required'  => _i('Das neue Passwort ist nicht vorhanden.'),
            'password2.required'  => _i('Die Passwortwiederholung ist nicht vorhanden.'),
            'password1.same'     => _i('Das neue Passwort stimmt nicht mit der Passwortwiederholung überein.'),
            'password2.same'     => _i('Die Passwortwiederholung stimmt nicht mit dem Passwort überein.')
        ];
    }
}
