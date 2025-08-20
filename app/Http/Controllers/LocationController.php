<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return Inertia::render('Location/index', [
            'locations' => $locations,
        ]);
    }

    public function show(Location $location)
    {
        $location->load('gamedays.games');
        return Inertia::render('Location/show', [
            'location' => $location,
            'games' => $location->gamedays->flatMap(function ($gameday) {
                return $gameday->games;
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('Location/create');
    }

    public function store(Request $request)
    {
        Location::create($request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]));
        return redirect()->route('location.index');
    }

    public function edit(Location $location)
    {
        return Inertia::render('Location/edit', [
            'location' => $location,
        ]);
    }

    public function update(Request $request, Location $location)
    {
        $location->update($request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
        ]));
        return redirect()->route('location.index');
    }

    public function destroy(Location $location)
    {
        $location->delete();
        return redirect()->route('location.index');
    }
}
