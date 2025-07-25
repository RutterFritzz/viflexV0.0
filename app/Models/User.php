<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
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
    public function homeCoachGames()
    {
        return $this->hasMany(Game::class, 'home_coach_id');
    }

    public function awayCoachGames()
    {
        return $this->hasMany(Game::class, 'away_coach_id');
    }

    public function homeRefereeGames()
    {
        return $this->hasMany(Game::class, 'home_referee_id');
    }

    public function awayRefereeGames()
    {
        return $this->hasMany(Game::class, 'away_referee_id');
    }

    public function allOfficiatedGames()
    {
        return $this->homeCoachGames->merge($this->awayCoachGames)->merge($this->homeRefereeGames)->merge($this->awayRefereeGames);
    }
}
