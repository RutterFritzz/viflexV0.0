<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /** @use HasFactory<\Database\Factories\GameFactory> */
    use HasFactory;

    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'date',
        'time',
        'status',
        'location',
        'home_referee_id',
        'away_referee_id',
        'home_coach_id',
        'away_coach_id',
        'home_score',
        'away_score',
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function homeCoach()
    {
        return $this->belongsTo(User::class, 'home_coach_id');
    }

    public function awayCoach()
    {
        return $this->belongsTo(User::class, 'away_coach_id');
    }

    public function homeReferee()
    {
        return $this->belongsTo(User::class, 'home_referee_id');
    }

    public function awayReferee()
    {
        return $this->belongsTo(User::class, 'away_referee_id');
    }
}
