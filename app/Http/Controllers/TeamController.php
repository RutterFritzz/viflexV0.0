<?php

namespace App\Http\Controllers;

use App\Http\Requests\Team\AddCoachRequest;
use App\Http\Requests\Team\AddPlayerRequest;
use App\Http\Requests\Team\StoreTeamRequest;
use App\Http\Requests\Team\UpdateTeamRequest;

use App\Models\Club;
use App\Models\Team;
use App\Models\TeamValue;
use App\Models\UserTeamRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        }, 'players', 'coaches', 'values']);
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
        $team = new Team();
        $team->name = $request->name;
        // $team->category = $request->category;
        $team->club_id = $request->club_id;

        $team->save();

        if ($request->hasFile('logo')) {
            $uploadedFile = $request->file('logo');
            $filename = uniqid() . '-' . $uploadedFile->getClientOriginalName();
            $uploadedFile->move(public_path('images/teams/' . $team->id), $filename);

            $team->logo = $filename;
            $team->save();
        }

        return redirect()->route('club.show', $club);
    }

    public function edit(Team $team)
    {
        return Inertia::render('Team/edit', compact('team'));
    }

    public function update(UpdateTeamRequest $request, Team $team)
    {
        $team->name = $request->name;
        // $team->category = $request->category;

        // dd($request->logo);

        if ($request->hasFile('logo')) {
            if ($team->logo) {
                Storage::delete('images/teams/' . $team->id . '/' . $team->logo);
            }

            $logo = $request->file('logo');
            $logoName =  uniqid() . "-" . Str::slug($team->name) . "." . $logo->extension();
            $logo->storeAs('images/teams/' . $team->id . '/', $logoName);

            $team->logo = $logoName;
        }

        $team->save();

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

    public function addValue(Request $request, Team $team)
    {
        $teamValue = new TeamValue();
        $teamValue->team_id = $team->id;
        $teamValue->value = $request->value;

        $teamValue->save();

        return redirect()->back()->with('success', 'Value is toegevoegd');
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
