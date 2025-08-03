<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user)
    {
        return Inertia::render('Users/show', [
            'user' => $user,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->query('query');
        $users = User::where('name', 'like', "$query%")->limit(10)->get(['id', 'name']);
        return response()->json($users);
    }
}
