<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Gameday extends Model
{
    /** @use HasFactory<\Database\Factories\GamedayFactory> */
    use HasFactory;

    protected $fillable = ['location_id', 'date'];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

    public function teams(): HasManyThrough
    {
        return $this->hasManyThrough(Team::class, Game::class, 'gameday_id', 'id', 'id', 'id');
    }
}
