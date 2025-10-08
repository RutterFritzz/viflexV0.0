<?php

namespace App\Http\Controllers;

use App\Http\Requests\Team\AddCoachRequest;
use App\Http\Requests\Team\AddPlayerRequest;
use App\Http\Requests\Team\StoreTeamRequest;
use App\Http\Requests\Team\UpdateTeamRequest;
use App\Models\Club;
use App\Models\Team;
use App\Models\UserTeamRole;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with('players', 'coaches')->get();
        return Inertia::render('Team/index', compact('teams'));
    }

    public function show(Team $team)
    {
        $team->load(['club' => function ($query) {
            $query->select('id', 'name');
        }, 'players', 'coaches']);
        $club = $team->club;
        return Inertia::render('Team/show', compact('team', 'club'));
    }

    public function create(Club $club)
    {
        return Inertia::render('Team/create', [
            'club_id' => $club->id,
        ]);
    }

    public function store(StoreTeamRequest $request, Club $club)
    {
        $validated = $request->validated();
        $validated['club_id'] = $club->id;
        Team::create($validated);
        return redirect()->route('club.show', $club);
    }

    public function edit(Team $team)
    {
        return Inertia::render('Team/edit', compact('team'));
    }

    public function update(UpdateTeamRequest $request, Team $team)
    {
        $team->update($request->validated());
        return redirect()->route('team.index');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('team.index');
    }

    public function addPlayer(AddPlayerRequest $request)
    {
        $validated = $request->validated();
        UserTeamRole::create($validated);
    }
    public function addCoach(AddCoachRequest $request)
    {
        $validated = $request->validated();
        UserTeamRole::create($validated);
    }

    public function getMembers(Team $team)
    {
        $team->load('players', 'coaches');
        return response()->json([
            'coaches' => $team->coaches->map(function($coach) {
                return ['id' => $coach->id, 'name' => $coach->name];
            })->toArray(),
            'players' => $team->players->map(function($player) {
                return ['id' => $player->id, 'name' => $player->name];
            })->toArray(),
        ]);
    }
}
