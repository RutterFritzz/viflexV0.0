<?php

namespace App\Http\Controllers;

use App\Http\Requests\Gameday\GamedayRequest;
use App\Http\Requests\Gameday\SubmitPresenceRequest;
use App\Models\Game;
use Inertia\Inertia;
use App\Models\Gameday;
use App\Models\Location;
use App\Models\Team;
use App\Models\GamePlayer;
use App\Models\GameCoach;

class GamedayController extends Controller
{
    public function index()
    {
        $gamedays = Gameday::with('location')->withCount('games')->get();
        return Inertia::render('Gameday/index', compact('gamedays'));
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

    public function store(GamedayRequest $request)
    {
        $validated = $request->validated();
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

    public function update(GamedayRequest $request, Gameday $gameday)
    {
        $gameday->update($request->validated());
        return redirect()->route('gameday.index');
    }
    public function destroy(Gameday $gameday)
    {
        $gameday->delete();
        return redirect()->route('gameday.index');
    }

    public function submitPresence(SubmitPresenceRequest $request, Gameday $gameday)
    {
        $validated = $request->validated();

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
