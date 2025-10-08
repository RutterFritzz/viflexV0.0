<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Http\Requests\Club\ClubRequest;
use Inertia\Inertia;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::all();
        return Inertia::render('Club/index', compact('clubs'));
    }

    public function show(Club $club)
    {
        $club->load(['teams' => function ($query) {
            $query->select('id', 'name', 'club_id')->with('players');
        }]);
        $teams = $club->teams;
        return Inertia::render('Club/show', compact('club', 'teams'));
    }

    public function create()
    {
        return Inertia::render('Club/create');
    }

    public function store(ClubRequest $request)
    {
        Club::create($request->validated());
        return redirect()->route('club.index');
    }

    public function edit(Club $club)
    {
        return Inertia::render('Club/edit', compact('club'));
    }

    public function update(ClubRequest $request, Club $club)
    {
        $club->update($request->validated());
        return redirect()->route('club.index');
    }

    public function destroy(Club $club)
    {
        $club->delete();
        return redirect()->route('club.index');
    }
}
