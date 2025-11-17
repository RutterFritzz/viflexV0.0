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
        Schema::table('games', function (Blueprint $table) {
            $table->dropConstrainedForeignId('gameday_id');
        });
        Schema::dropIfExists('gamedays');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('gamedays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained('locations');
            $table->date('date');
            $table->timestamps();
        });

        Schema::table('games', function (Blueprint $table) {
            $table->foreignId('gameday_id')->constrained('gamedays');
        });
    }
};
