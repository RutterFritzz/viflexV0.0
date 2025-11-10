<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\Game;
use App\Models\GameTeamValue;
use App\Models\Team;
use Illuminate\Http\Request;

class GameTeamValueController extends Controller
{
    public function store(Request $request, Competition $competition, Game $game) {
        $teamValue = new GameTeamValue();

        $teamValue->game_id = $game->id;
        $teamValue->name = $request->name;
        $teamValue->value = $request->value;

        $teamValue->save();

        return redirect()->back()->with('success', 'Veld is toegevoegd');
    }

    public function update(Request $request, Competition $competition, Game $game, Team $team) {
        foreach($request->fields as $field) {
            GameTeamValue::updateOrCreate(
                ['game_id' => $game->id, 'team_id' => $team->id, 'team_value_id' => $field['team_value_id']],
                ['value' => $field['value']]
            );
        }

        return redirect()->back()->with('info', 'Velden is aangepast');

    }
}
