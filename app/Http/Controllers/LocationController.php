<?php

namespace App\Http\Controllers;

use App\Http\Requests\Location\LocationRequest;
use App\Models\Location;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return Inertia::render('Location/index', compact('locations'));
    }

    public function show(Location $location)
    {
        $location->load('upcomingGames', 'pastGames');
        return Inertia::render('Location/show', compact('location'));
    }

    public function create()
    {
        return Inertia::render('Location/create');
    }

    public function store(LocationRequest $request)
    {
        $validated = $request->validated();
        Location::create($validated);
        return redirect()->route('location.index');
    }

    public function edit(Location $location)
    {
        return Inertia::render('Location/edit', compact('location'));
    }

    public function update(LocationRequest $request, Location $location)
    {
        $location->update($request->validated());
        return redirect()->route('location.index');
    }

    public function destroy(Location $location)
    {
        $location->delete();
        return redirect()->route('location.index');
    }
}
