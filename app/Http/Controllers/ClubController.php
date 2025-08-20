<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::all();
        return Inertia::render('Club/index', [
            'clubs' => $clubs,
        ]);
    }

    public function show(Club $club)
    {
        $club->load(['teams' => function ($query) {
            $query->select('id', 'name', 'club_id')->with('players');
        }]);
        return Inertia::render('Club/show', [
            'club' => $club,
            'teams' => $club->teams,
        ]);
    }

    public function create()
    {
        return Inertia::render('Club/create');
    }

    public function store(Request $request)
    {
        Club::create($request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]));
        return redirect()->route('club.index');
    }

    public function edit(Club $club)
    {
        return Inertia::render('Club/edit', [
            'club' => $club,
        ]);
    }

    public function update(Request $request, Club $club)
    {
        $club->update($request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]));
        return redirect()->route('club.index');
    }

    public function destroy(Club $club)
    {
        $club->delete();
        return redirect()->route('club.index');
    }
}
