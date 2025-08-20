<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserTeamRole>
 */
class UserTeamRoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'team_id' => Team::factory(),
            'role_id' => Role::factory(),
        ];
    }

    /**
     * Create a player role assignment
     */
    public function player(): static
    {
        return $this->state(fn (array $attributes) => [
            'role_id' => Role::where('name', 'player')->first()->id,
        ]);
    }

    /**
     * Create a coach role assignment
     */
    public function coach(): static
    {
        return $this->state(fn (array $attributes) => [
            'role_id' => Role::where('name', 'coach')->first()->id,
        ]);
    }
}
