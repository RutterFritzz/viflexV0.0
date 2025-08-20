<?php

namespace App\Models;

use App\Category;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Competition extends Model
{
    /** @use HasFactory<\Database\Factories\CompetitionFactory> */
    use HasFactory;

    protected $fillable = ['name', 'category', 'year'];

    public function category(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Category::from($value)->label(),
        );
    }

    // get all the teams in the competition
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'competition_teams');

    }

    // get all the games in the competition
    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }
}
