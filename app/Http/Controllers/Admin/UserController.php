<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\Users\StoreValidation;
use App\Http\Requests\Users\UpdateValidaiton;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

use App\Models\Role;
use App\Models\User;

use Inertia\Inertia;

class UserController extends Controller
{
    public function index() {
        $users = User::orderBy('name')->get();
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Index', compact('users', 'roles'));
    }

        public function store(StoreValidation $request)
    {
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        // $user->role_id = $request->role_id;
        $user->password = Hash::make($request->password);
        // $user->is_admin = $request->isAdmin ? 1 : 0;

        $user->save();

        return redirect()->route('admin.users')->with('success', 'De gebruiker is toegevoegd');
    }

    public function edit(User $user)
    {
        // $user->load('role');
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Users/Edit', compact('user', 'roles'));
    }

    public function update(UpdateValidaiton $request, User $user)
    {
        $user->name = $request->name;
        $user->email = $request->email;
        // $user->role_id = $request->role_id;
        // $user->is_admin = $request->isAdmin ? 1 : 0;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('admin.users')->with('success', 'De gebruiker is bijgewerkt');
    }

    public function delete(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'De gebruiker is verwijderd');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return back()->with('success', __($status));
    }
}
