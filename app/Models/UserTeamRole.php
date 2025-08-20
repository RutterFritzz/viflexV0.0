<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserTeamRole extends Model
{
    protected $fillable = ['user_id', 'team_id', 'role_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    // check if the user is a player
    public function isPlayer(): bool
    {
        return $this->role->name === 'player';
    }

    // check if the user is a coach
    public function isCoach(): bool
    {
        return $this->role->name === 'coach';
    }
}
