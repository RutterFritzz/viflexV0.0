<?php

namespace App\Models;

use App\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    protected $fillable = ['name', 'club_id', 'category'];

    public function category(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Category::from($value)->label(),
        );
    }

    // cache the role ids
    private static $playerRoleId = null;
    private static $coachRoleId = null;

    // get the player role id
    private static function getPlayerRoleId()
    {
        if (self::$playerRoleId === null) {
            self::$playerRoleId = Role::where('name', 'player')->first()->id;
        }
        return self::$playerRoleId;
    }

    // get the coach role id
    private static function getCoachRoleId()
    {
        if (self::$coachRoleId === null) {
            self::$coachRoleId = Role::where('name', 'coach')->first()->id;
        }
        return self::$coachRoleId;
    }

    // get the club the team belongs to
    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    // get all the players in the team
    public function players(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_team_roles')->wherePivot('role_id', self::getPlayerRoleId());
    }

    // get all the coaches in the team
    public function coaches(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_team_roles')->wherePivot('role_id', self::getCoachRoleId());
    }
    // get all matches the team has played
    public function matches(): HasMany
    {
        return $this->hasMany(Game::class)->where('home_team_id', $this->id)->orWhere('away_team_id', $this->id);
    }
}
