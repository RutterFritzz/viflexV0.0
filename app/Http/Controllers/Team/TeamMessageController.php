<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeamMessageController extends Controller
{
    public function send(Request $request, Team $team)
    {
        $message = new Message();

        $message->team_id = $team->id;
        $message->user_id = Auth::id();
        $message->content = $request->content;

        $message->save();

        return redirect()->back()->with('success', 'Het bericht is verstuurd');
    }

    public function update(Request $request, Team $team, Message $message)
    {
        $message->content = $request->content;

        $message->save();

        return redirect()->back()->with('success', 'Het bericht is aangepast');
    }

    public function delete(Request $request, Team $team, Message $message)
    {
        $message->delete();

        return redirect()->back()->with('success', 'Het bericht is verwijderdw');
    }
}
