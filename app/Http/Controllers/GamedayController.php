<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gameday;
use App\Models\Location;

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
        $gameday->load('location', 'games', 'games.competition', 'games.homeTeam', 'games.awayTeam', 'games.homeReferee', 'games.awayReferee', 'teams',
            'teams.players', 'teams.coaches');
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
}
