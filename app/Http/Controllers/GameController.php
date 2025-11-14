<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\Game;
use App\Models\Gameday;
use App\Models\GameReferee;
use App\Models\GameCoach;
use App\Models\GamePlayer;
use App\Models\Location;
use App\Models\Team;
use App\Http\Requests\Game\GameRequest;
use App\Models\CompetitionTeam;
use App\Models\MessageTemplate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    private function addPlayersAndCoachesToGame(Game $game, Team $team)
    {
        $players = $team->players();
        $coaches = $team->coaches();
        $players->each(function ($player) use ($team, $game) {
            GamePlayer::create([
                'game_id' => $game->id,
                'user_id' => $player->id,
                'team_id' => $team->id,
            ]);
        });
        $coaches->each(function ($coach) use ($team, $game) {
            GameCoach::create([
                'game_id' => $game->id,
                'user_id' => $coach->id,
                'team_id' => $team->id,
            ]);
        });
    }

    private function removePlayersAndCoachesFromGame(Game $game, Team $team)
    {
        GamePlayer::where('game_id', $game->id)->where('team_id', $team->id)->delete();
        GameCoach::where('game_id', $game->id)->where('team_id', $team->id)->delete();
    }

    public function index()
    {
        $games = Game::with(['competition', 'homeTeam', 'awayTeam', 'location', 'gameday'])->get();
        return Inertia::render('Game/index', compact('games'));
    }

    public function show(Competition $competition, Game $game)
    {
        $game->load([
            'competition', 'location', 'gameday', 'homeReferee', 'awayReferee', 'messages.user',
            'homeTeam.players', 'homeTeam.values', 'homeTeam.gameValues.teamValue', 'homeTeam.coaches',
            'awayTeam.players', 'awayTeam.values', 'awayTeam.gameValues.teamValue', 'awayTeam.coaches'
        ]);

        $game->homeTeamPresences = $game->homeTeam->getPresences($game);
        $game->awayTeamPresences = $game->awayTeam->getPresences($game);

        $templates = MessageTemplate::orderBy('name')->get();

        return Inertia::render('Game/show', compact('game', 'templates'));
    }

    public function create(Competition $competition)
    {
        $competition->load('teams');
        return Inertia::render('Game/create', [
            'competition' => $competition,
            'teams' => $competition->teams,
            'locations' => Location::all(),
        ]);
    }

    public function store(GameRequest $request, Competition $competition)
    {
        $validated = $request->validated();
        $validated['competition_id'] = $competition->id;
        $validated['date'] = Carbon::parse($validated['date'])->format('Y-m-d');
        $validated['time'] = Carbon::parse($validated['time'])->format('H:i');
        $gameday = Gameday::where('location_id', $validated['location_id'])->where('date', $validated['date'])->first();
        if (!$gameday) {
            $gameday = Gameday::create([
                'location_id' => $validated['location_id'],
                'date' => $validated['date'],
            ]);
        }
        $validated['gameday_id'] = $gameday->id;
        unset($validated['location_id']);
        unset($validated['date']);
        $game = Game::create($validated);
        $homeTeam = Team::find($validated['home_team_id']);
        $this->addPlayersAndCoachesToGame($game, $homeTeam);
        $awayTeam = Team::find($validated['away_team_id']);
        $this->addPlayersAndCoachesToGame($game, $awayTeam);
        $game->teams()->attach([$homeTeam->id, $awayTeam->id]);
        return redirect()->route('competition.show', $competition);
    }

    public function edit(Game $game)
    {
        $game->load([
            'competition',
            'homeTeam',
            'homeTeam',
            'awayTeam',
            'competition.teams',
            'location',
            'gameday',
            'gamePlayers',
            'gamePlayers.user'
        ]);

        $competitionTeams = [
            'home_team' => (object) $game->competitionTeam($game->homeTeam->id),
            'away_team' => (object) $game->competitionTeam($game->awayTeam->id)
        ];

        return Inertia::render('Game/edit', [
            'game' => $game,
            'competition' => $game->competition,
            'teams' => $game->competition->teams,
            'locations' => Location::all(),
            'competitionTeams' => $competitionTeams
        ]);
    }

    public function update(GameRequest $request, Game $game)
    {
        $game->home_team_id = $request->home_team_id;
        $game->away_team_id = $request->away_team_id;
        // $game->location_id = $request->location_id;
        // $game->date = $request->date;
        $game->time = $request->time;
        $game->arrival_time = $request->arrival_time;

        if ($request->home_team_id !== $game->home_team_id) {
            $this->removePlayersAndCoachesFromGame($game, Team::find($game->home_team_id));
            $this->addPlayersAndCoachesToGame($game, Team::find($request->home_team_id));
        }

        if ($request->away_team_id !== $game->away_team_id) {
            $this->removePlayersAndCoachesFromGame($game, Team::find($game->away_team_id));
            $this->addPlayersAndCoachesToGame($game, Team::find($request->away_team_id));
        }

        $game->save();

        return redirect()->route('game.index');
    }

    public function destroy(Game $game)
    {
        $game->delete();
        return redirect()->route('game.index');
    }

    public function updateTime(Request $request)
    {
        $games = $request->games;

        foreach ($games as $game) {
            Game::where('id', $game['id'])->update(['time' => $game['time']]);
        }
        return response()->json(['message' => 'Time updated successfully']);
    }

    public function updateUsers(Request $request)
    {
        $updates = $request->updates;

        foreach ($updates as $update) {
            $game = Game::where('id', $update['gameId'])->first();
            foreach ($update['changes'] as $change) {
                if ($change['key'] === 'home_referee' || $change['key'] === 'away_referee') {
                    $change['key'] = $change['key'] . "_id";

                    $currentRefereeId = $game->{$change['key']};

                    if ($currentRefereeId !== null) {
                        GameReferee::where('game_id', $game->id)->where('user_id', $currentRefereeId)->delete();
                    }
                    if ($change['value'] !== null) {
                        GameReferee::create([
                            'game_id' => $game->id,
                            'user_id' => $change['value'],
                        ]);
                    }
                    $game->{$change['key']} = $change['value'];
                    $game->save();
                } else if ($change['key'] === 'home_coach_id' || $change['key'] === 'away_coach_id') {
                }
            }
        }
        return response()->json(['message' => 'Users updated successfully']);
    }

    public function updateScore(Request $request, Game $game)
    {
        $game->home_team_score = $request->home_team_score;
        $game->away_team_score = $request->away_team_score;

        $game->save();

        return redirect()->back()->with('success', 'Score is bijgewerkt');
    }


    public function submitPresence(Request $request, Game $game)
    {
        $validated = $request->validate([
            'team_id' => 'required|exists:teams,id',
            'presence' => 'required|array',
        ]);

        $team = Team::find($validated['team_id']);

        foreach ($validated['presence']['coaches'] as $presence) {
            GameCoach::where('game_id', $game->id)
                ->where('team_id', $team->id)
                ->where('user_id', $presence['user_id'])
                ->update(['present' => $presence['present']]);
        }

        foreach ($validated['presence']['players'] as $presence) {
            GamePlayer::where('game_id', $game->id)
                ->where('team_id', $team->id)
                ->where('user_id', $presence['user_id'])
                ->update(['present' => $presence['present']]);
        }

        return redirect()->back()->with('success', 'Aanwezigheid succesvol ingediend');
    }
}
