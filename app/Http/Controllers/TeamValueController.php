<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamValue;
use Illuminate\Http\Request;

class TeamValueController extends Controller
{
    public function add(Request $request, Team $team) {
        $teamValue = new TeamValue();
        $teamValue->team_id = $team->id;
        $teamValue->value = $request->value;

        $teamValue->save();

        return redirect()->back()->with('success', 'Value is toegevoegd');
    }

    public function delete(Team $team, TeamValue $teamValue) {
        $teamValue->delete();

        return redirect()->back()->with('success', 'Value is verwijderd');
    }
}
