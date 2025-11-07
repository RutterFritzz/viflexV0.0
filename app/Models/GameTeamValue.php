<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameTeamValue extends Model
{
    protected $fillable = [
        'game_id', 'team_id', 'team_value_id', 'value'
    ];

    public function game() {
        return $this->belongsTo(Game::class);
    }

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function teamValue() {
        return $this->belongsTo(TeamValue::class);
    }
}
