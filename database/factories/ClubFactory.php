<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Club>
 */
class ClubFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Thunder', 'Lightning', 'Storm', 'Phoenix', 'Dragon', 'Eagle', 'Lion', 'Tiger',
                'Shark', 'Bear', 'Wolf', 'Hawk', 'Falcon', 'Panther', 'Cobra', 'Viper'
            ]) . ' ' . $this->faker->randomElement(['Club', 'Association', 'Society', 'Guild', 'Academy']),
            'location' => $this->faker->city,
        ];
    }
}
