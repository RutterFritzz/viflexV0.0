<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('query');
        $type = $request->input('type');
        $data = [];

        if ($type === 'user') {
            $users = User::where('name', 'like', "%$query%")->limit(10)->get(['id', 'name']);
            $data = $users;
        }

        if ($type === 'team') {
            $teams = Team::where('name', 'like', "%$query%")->with('club')->limit(10)->get(['id', 'name', 'club_id']);
            $data = $teams;
        }

        if ($type === 'referee') {
            $referees = User::where('name', 'like', "%$query%")->whereHas('referee')->with('referee')->limit(10)->get(['id', 'name'])->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'category' => $user->referee->category ?? null,
                ];
            });
            $data = $referees;
        }

        return response()->json($data);
    }
}
