<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;
    protected $fillable = ['name'];

    public function userTeamRoles(): HasMany
    {
        return $this->hasMany(UserTeamRole::class);
    }

    // get all the users with the player role
    public function usersAsPlayer(): HasMany
    {
        return $this->userTeamRoles()->where('role_id', Role::where('name', 'player')->first()->id)->with('user');
    }

    // get all the users with the coach role
    public function usersAsCoach(): HasMany
    {
        return $this->userTeamRoles()->where('role_id', Role::where('name', 'coach')->first()->id)->with('user');
    }
}
