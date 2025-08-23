<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gameday;
use App\Models\Location;
use App\Models\Team;
use App\Models\GamePlayer;
use App\Models\GameCoach;
use App\Models\User;

class GamedayController extends Controller
{
    public function index()
    {
        $gamedays = Gameday::with('location')->withCount('games')->get();
        return Inertia::render('Gameday/index', [
            'gamedays' => $gamedays,
        ]);
    }

    public function show(Gameday $gameday)
    {
        $gameday->load(
            'location',
            'games',
            'games.competition',
            'games.homeTeam',
            'games.awayTeam',
            'games.homeReferee',
            'games.awayReferee',
            'teams'
        );
        return Inertia::render('Gameday/show', [
            'gameday' => $gameday,
            'games' => $gameday->games->sortBy('time')->values()->toArray(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Gameday/create', [
            'locations' => Location::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_id' => 'required|exists:locations,id',
            'date' => 'required|date',
        ]);
        Gameday::create($validated);
        return redirect()->route('gameday.index');
    }

    public function edit(Gameday $gameday)
    {
        $gameday->load('location');
        return Inertia::render('Gameday/edit', [
            'gameday' => $gameday,
            'locations' => Location::all(),
            'location_id' => $gameday->location_id,
        ]);
    }

    public function update(Request $request, Gameday $gameday)
    {
        $gameday->update($request->validate([
            'location_id' => 'required|exists:locations,id',
            'date' => 'required|date',
        ]));
        return redirect()->route('gameday.index');
    }
    public function destroy(Gameday $gameday)
    {
        $gameday->delete();
        return redirect()->route('gameday.index');
    }

    public function submitPresence(Request $request, Gameday $gameday)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'presence' => 'required|array',
            'presence.coaches' => 'sometimes|array',
            'presence.players' => 'sometimes|array',
        ]);

        $team = Team::find($validated['team_id']);
        $games = Game::where('gameday_id', $gameday->id)->pluck('id');

        if (isset($validated['presence']['coaches'])) {
            foreach ($validated['presence']['coaches'] as $userId => $isPresent) {
                $userId = (int) $userId;
                GameCoach::whereIn('game_id', $games)
                    ->where('team_id', $team->id)
                    ->where('user_id', $userId)
                    ->update(['present' => $isPresent]);
            }
        }

        if (isset($validated['presence']['players'])) {
            foreach ($validated['presence']['players'] as $userId => $isPresent) {
                $userId = (int) $userId;
                GamePlayer::whereIn('game_id', $games)
                    ->where('team_id', $team->id)
                    ->where('user_id', $userId)
                    ->update(['present' => $isPresent]);
            }
        }

        return response()->json(['message' => 'Presence updated successfully']);
    }
}
