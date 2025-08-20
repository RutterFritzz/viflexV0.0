<?php

namespace Database\Factories;

use App\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Competition>
 */
class CompetitionFactory extends Factory
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
                'Spring', 'Summer', 'Autumn', 'Winter', 'Championship', 'Cup', 'League', 'Tournament',
                'Premier', 'Elite', 'Pro', 'Amateur', 'Youth', 'Senior', 'Master', 'Grand'
            ]) . ' ' . $this->faker->randomElement(['Championship', 'Cup', 'League', 'Tournament', 'Series', 'Challenge']),
            'category' => $this->faker->randomElement(Category::cases()),
            'year' => $this->faker->year(),
        ];
    }
}
