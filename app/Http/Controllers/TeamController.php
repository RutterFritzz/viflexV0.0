<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Team;
use App\Models\UserTeamRole;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with('players', 'coaches')->get();
        return Inertia::render('Team/index', [
            'teams' => $teams,
        ]);
    }

    public function show(Team $team)
    {
        $team->load(['club' => function ($query) {
            $query->select('id', 'name');
        }, 'players', 'coaches']);
        return Inertia::render('Team/show', [
            'team' => $team,
            'club' => $team->club,
        ]);
    }

    public function create(Club $club)
    {
        return Inertia::render('Team/create', [
            'club_id' => $club->id,
        ]);
    }

    public function store(Request $request, Club $club)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $validated['club_id'] = $club->id;
        Team::create($validated);
        return redirect()->route('club.show', $club);
    }

    public function edit(Team $team)
    {
        return Inertia::render('Team/edit', [
            'team' => $team,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $team->update($request->validate([
            'name' => 'required|string|max:255',
        ]));
        return redirect()->route('team.index');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('team.index');
    }

    public function addPlayer(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
            'team_id' => 'required|exists:teams,id',
        ]);
        UserTeamRole::create($validated);
    }
    public function addCoach(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role_id' => 'required|exists:roles,id',
            'team_id' => 'required|exists:teams,id',
        ]);
        UserTeamRole::create($validated);
    }
}
