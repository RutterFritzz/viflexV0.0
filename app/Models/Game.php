<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Collection;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = ['gameday_id', 'competition_id', 'home_team_id', 'away_team_id', 'home_referee_id', 'away_referee_id', 'home_team_score', 'away_team_score', 'time'];

    protected $casts = [
        'time' => 'datetime:H:i',
    ];

    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class);
    }

    public function homeTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function getTeams(): Collection
    {
        return collect([$this->homeTeam, $this->awayTeam])->filter();
    }

    public function gameday(): BelongsTo
    {
        return $this->belongsTo(Gameday::class);
    }

    public function location(): HasOneThrough
    {
        return $this->hasOneThrough(Location::class, Gameday::class, 'id', 'id', 'gameday_id', 'location_id');
    }

    public function homeReferee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'home_referee_id');
    }

    public function awayReferee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'away_referee_id');
    }

    public function gamePlayers(): HasMany
    {
        return $this->hasMany(GamePlayer::class);
    }

    public function gameCoaches(): HasMany
    {
        return $this->hasMany(GameCoach::class);
    }

    public function hasPresences(Team $team): bool
    {
        if ($this->gamePlayers->where('game_id', $team->id)->whereNull('present')->count() > 0) {
            return false;
        }
        if ($this->gameCoaches->where('game_id', $team->id)->whereNull('present')->count() > 0) {
            return false;
        }
        return true;
    }
}
