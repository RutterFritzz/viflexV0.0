<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_team_values', function (Blueprint $table) {
            $table->id();

            $table->foreignId('game_id')->constrained('games')
            ->cascadeOnUpdate()->cascadeOnDelete();

            $table->foreignId('team_id')->constrained('teams')
            ->cascadeOnUpdate()->cascadeOnDelete();

            $table->foreignId('team_value_id')->constrained('team_values')
            ->cascadeOnUpdate()->cascadeOnDelete();

            $table->string('value');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_values');
    }
};
