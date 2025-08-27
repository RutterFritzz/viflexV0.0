<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    /** @use HasFactory<\Database\Factories\ClubFactory> */
    use HasFactory;

    protected $fillable = ['name', 'location'];

    // get all the teams in the club
    public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
