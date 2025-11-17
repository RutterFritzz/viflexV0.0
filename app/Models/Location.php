<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory;

    protected $fillable = ['name', 'city', 'address'];

    public $appends = [
        'address_url'
    ];

    public function upcomingGames(): HasMany
    {
        return $this->hasMany(Game::class)->where('date', '>=', now())->orderBy('date', 'asc')->with(['homeTeam', 'awayTeam', 'location']);
    }

    public function pastGames(): HasMany
    {
        return $this->hasMany(Game::class)->where('date', '<', now())->orderBy('date', 'desc')->with(['homeTeam', 'awayTeam', 'location']);
    }

    public function addressUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => rawurlencode($this->address),
        );
    }
}
