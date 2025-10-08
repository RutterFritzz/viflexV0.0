<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Competition;
use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // Get role IDs
        $playerRoleId = Role::where('name', 'player')->first()->id;
        $coachRoleId = Role::where('name', 'coach')->first()->id;

        // Get user's teams
        $userTeams = $user->teamRoles()->with(['team.club', 'role'])->get();
        $teamsAsPlayer = $user->teamRoles()->where('role_id', $playerRoleId)->with('team.club')->get();
        $teamsAsCoach = $user->teamRoles()->where('role_id', $coachRoleId)->with('team.club')->get();

        // Get user's games as player
        $gamesAsPlayer = Game::whereHas('homeTeam.players', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->orWhereHas('awayTeam.players', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['homeTeam', 'awayTeam', 'competition', 'gameday.location'])
            ->orderBy('gameday_id')
            ->get();

        // Get user's games as coach
        $gamesAsCoach = Game::whereHas('homeTeam.coaches', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->orWhereHas('awayTeam.coaches', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with(['homeTeam', 'awayTeam', 'competition', 'gameday.location'])
            ->orderBy('gameday_id')
            ->get();

        // Get user's games as referee
        $gamesAsReferee = Game::where('home_referee_id', $user->id)
            ->orWhere('away_referee_id', $user->id)
            ->with(['homeTeam', 'awayTeam', 'competition', 'gameday.location'])
            ->orderBy('gameday_id')
            ->get();

        // Get upcoming games (next 30 days)
        $upcomingGames = collect([$gamesAsPlayer, $gamesAsCoach, $gamesAsReferee])
            ->flatten()
            ->unique('id')
            ->filter(function ($game) {
                return $game->gameday && Carbon::parse($game->gameday->date)->isFuture();
            })
            ->sortBy('gameday.date')
            ->take(10);

        // Get recent games (last 30 days)
        $recentGames = collect([$gamesAsPlayer, $gamesAsCoach, $gamesAsReferee])
            ->flatten()
            ->unique('id')
            ->filter(function ($game) {
                return $game->gameday && Carbon::parse($game->gameday->date)->isPast();
            })
            ->sortByDesc('gameday.date')
            ->take(5);

        // Get user's competitions
        $userCompetitions = Competition::whereHas('teams', function ($query) use ($user) {
            $query->whereHas('players', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })->orWhereHas('coaches', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        })->with('teams')->get();

        // Calculate statistics
        $totalGames = $gamesAsPlayer->count() + $gamesAsCoach->count() + $gamesAsReferee->count();
        $upcomingGamesCount = $upcomingGames->count();
        $completedGames = $recentGames->count();
        $totalTeams = $userTeams->count();
        $totalCompetitions = $userCompetitions->count();

        return Inertia::render('dashboard', [
            'userGames' => [
                'asPlayer' => $gamesAsPlayer,
                'asCoach' => $gamesAsCoach,
                'asReferee' => $gamesAsReferee,
            ],
            'upcomingGames' => $upcomingGames,
            'recentGames' => $recentGames,
            'userTeams' => $userTeams,
            'userCompetitions' => $userCompetitions,
            'statistics' => [
                'totalGames' => $totalGames,
                'upcomingGames' => $upcomingGamesCount,
                'completedGames' => $completedGames,
                'totalTeams' => $totalTeams,
                'totalCompetitions' => $totalCompetitions,
            ],
        ]);
    }
}
