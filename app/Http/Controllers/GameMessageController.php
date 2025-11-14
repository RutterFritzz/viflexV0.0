<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameMessageController extends Controller
{
    public function send(Request $request, Game $game)
    {
        $message = new Message();

        $message->game_id = $game->id;
        $message->team_id = $request->team_id;
        $message->user_id = Auth::id();
        $message->content = $request->content;

        $message->save();

        return redirect()->back()->with('success', 'Het bericht is verstuurd');
    }

    public function update(Request $request, Game $game, Message $message)
    {
        $message->content = $request->content;

        $message->save();

        return redirect()->back()->with('success', 'Het bericht is aangepast');
    }

    public function delete(Request $request, Game $game, Message $message)
    {
        $message->delete();

        return redirect()->back()->with('success', 'Het bericht is verwijderd');
    }
}
