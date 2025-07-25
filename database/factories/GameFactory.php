<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'home_team_id' => $this->faker->numberBetween(1, 10),
            'away_team_id' => $this->faker->numberBetween(1, 10),
            'date' => '2025-06-27',
            'time' => $this->faker->time,
            'status' => 'waiting',
            'location' => $this->faker->word,
            'home_referee_id' => $this->faker->numberBetween(1, 10),
            'away_referee_id' => $this->faker->numberBetween(1, 10),
            'home_coach_id' => $this->faker->numberBetween(1, 10),
            'away_coach_id' => $this->faker->numberBetween(1, 10),
            'home_score' => $this->faker->numberBetween(0, 10),
            'away_score' => $this->faker->numberBetween(0, 10),
        ];
    }
}
