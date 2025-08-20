<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // get all the team roles for the user (player and coach)
    public function teamRoles(): HasMany
    {
        return $this->hasMany(UserTeamRole::class);
    }

    // get all the teams the user is a player in
    public function teamsAsPlayer(): HasMany
    {
        return $this->teamRoles()->where('role_id', Role::where('name', 'player')->first()->id)->with('team');
    }

    // get all the teams the user is a coach in
    public function teamsAsCoach(): HasMany
    {
        return $this->teamRoles()->where('role_id', Role::where('name', 'coach')->first()->id)->with('team');
    }

    // get the referee for the user
    public function referee(): HasOne
    {
        return $this->hasOne(Referee::class);
    }

    // get all the games the user is a player in
    public function gamesAsPlayer(): HasMany
    {
        return $this->hasMany(GamePlayer::class);
    }

    // get all the games the user is a coach in
    public function gamesAsCoach(): HasMany
    {
        return $this->hasMany(GameCoach::class);
    }

    // get all the games the user is a referee in
    public function gamesAsReferee(): HasMany
    {
        return $this->hasMany(GameReferee::class);
    }
}
