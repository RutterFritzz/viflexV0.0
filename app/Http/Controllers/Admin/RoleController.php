<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Roles\StoreValidation;
use App\Http\Requests\Roles\UpdateValidation;

use Illuminate\Support\Facades\Auth;

use App\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index() {
        $roles = Role::orderBy('name')->get();

        return Inertia::render('Admin/Roles/Index', compact('roles'));
    }

    public function store(StoreValidation $request)
    {
        $role = new Role();

        $role->name = $request->name;
        $role->save();

        return redirect()->route('admin.roles')->with('success', 'De rol is toegevoegd');
    }

    public function update(UpdateValidation $request, Role $role)
    {
        $role->name = $request->name;
        $role->save();

        return redirect()->route('admin.roles')->with('success', 'De rol is bijgewerkt');
    }

    public function delete(Role $role)
    {
        if ($role->id <= 4) {
            return redirect()->route('admin.roles')->with('error', 'De rol kan niet verwijderd worden');
        }

        $role->delete();

        return redirect()->route('admin.roles')->with('success', 'De rol is verwijderd');
    }


}
