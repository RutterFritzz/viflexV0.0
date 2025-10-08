<?php

namespace App\Http\Controllers;

use App\Category;
use App\Models\Competition;
use App\Models\CompetitionTeam;
use App\Http\Requests\Competition\CompetitionRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CompetitionController extends Controller
{
    public function index()
    {
        $competitions = Competition::all();
        return Inertia::render('Competition/index', compact('competitions'));
    }

    public function show(Competition $competition)
    {
        $competition->load('teams', 'games', 'teams.players', 'teams.coaches', 'games.location', 'games.gameday', 'games.homeTeam', 'games.awayTeam');
        $teams = $competition->teams;
        $games = $competition->games;
        return Inertia::render('Competition/show', compact('competition', 'teams', 'games'));
    }

    public function create()
    {
        return Inertia::render('Competition/create', [
            'categories' => Category::cases(),
        ]);
    }

    public function store(CompetitionRequest $request)
    {
        $validated = $request->validated();
        Competition::create($validated);
        return redirect()->route('competition.index');
    }

    public function edit(Competition $competition)
    {
        return Inertia::render('Competition/edit', [
            'competition' => $competition,
            'categories' => Category::cases(),
        ]);
    }

    public function update(CompetitionRequest $request, Competition $competition)
    {
        $competition->update($request->validated());
        return redirect()->route('competition.index');
    }

    public function destroy(Competition $competition)
    {
        $competition->delete();
        return redirect()->route('competition.index');
    }

    public function addTeam(Request $request)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'competition_id' => 'required|exists:competitions,id',
        ]);
        CompetitionTeam::create($validated);
    }
}
