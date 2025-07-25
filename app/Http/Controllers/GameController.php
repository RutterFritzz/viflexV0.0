<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::orderBy('date')->orderBy('time')->with(['homeTeam', 'awayTeam', 'homeCoach', 'awayCoach', 'homeReferee', 'awayReferee'])->get();
        return Inertia::render('Games/index', [
            '_games' => $games
        ]);
    }

    public function updateTime(Request $request) {
        $games = $request->games;

        foreach ($games as $game) {
            Game::where('id', $game['id'])->update(['time' => $game['time']]);
        }

        return response()->json(['message' => 'Time updated successfully']);
    }

    public function updateUsers(Request $request) {
        dd($request->all());
    }
}
