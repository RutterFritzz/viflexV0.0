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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_team_id')->nullable()->constrained('teams')->onDelete('set null');
            $table->foreignId('away_team_id')->nullable()->constrained('teams')->onDelete('set null');
            $table->foreignId('home_coach_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('away_coach_id')->nullable()->constrained('users')->onDelete('set null');
            $table->date('date')->nullable();
            $table->time('time')->nullable();
            $table->string('status')->nullable();
            $table->string('location')->nullable();
            $table->foreignId('home_referee_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('away_referee_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('home_score')->nullable();
            $table->string('away_score')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
