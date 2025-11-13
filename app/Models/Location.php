<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Str;
class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory;

    protected $fillable = ['name', 'city', 'address'];

    public $appends = [
        'address_url'
    ];

    public function gamedays(): HasMany
    {
        return $this->hasMany(Gameday::class);
    }

    public function upcomingGames(): HasManyThrough
    {
        return $this->hasManyThrough(Game::class, Gameday::class, 'location_id', 'gameday_id', 'id', 'id')->whereHas('gameday', function ($query) {
            $query->where('date', '>=', now());
            $query->orderBy('date', 'asc');
        })->with(['gameday', 'homeTeam', 'awayTeam', 'gameday.location']);
    }

    public function pastGames(): HasManyThrough
    {
        return $this->hasManyThrough(Game::class, Gameday::class, 'location_id', 'gameday_id', 'id', 'id')->whereHas('gameday', function ($query) {
            $query->where('date', '<', now());
            $query->orderBy('date', 'desc');
        })->with(['gameday', 'homeTeam', 'awayTeam', 'gameday.location']);
    }

    public function addressUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => rawurlencode($this->address),
        );
    }
}
