<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GamedayController;
use App\Http\Controllers\GameTeamValueController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\RefereeController;
use App\Http\Controllers\TeamValueController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [UserController::class, 'dashboard'])->name('dashboard');
});

// Email verification
Route::get('/email/verify', function () {
    return Inertia::render('auth/verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Clubs
Route::resource('club', ClubController::class);

// Teams
Route::controller(TeamController::class)->prefix('team')->name('team')->group(function() {
    Route::get(null, 'index')->name('.index');
    Route::get('create/{club}', 'create')->name('.create');
    Route::post('team/{club}', 'store')->name('.store');

    Route::prefix('{team}')->group(function() {
        Route::get(null, 'show')->name('.show');
        Route::get('edit', 'edit')->name('.edit');
        Route::post('add-player', 'addPlayer')->name('.add-player');
        Route::post('add-coach', 'addCoach')->name('.add-coach');
        Route::get('get-members', 'getMembers')->name('.get-members');
        Route::delete('remove-player/{player}', 'removePlayer')->name('.remove-player');
        Route::delete('remove-coach/{coach}', 'removeCoach')->name('.remove-coach');

        Route::post('update', 'update')->name('.update');
        Route::delete('destroy', 'destroy')->name('.destroy');

        Route::controller(TeamValueController::class)->prefix('value')->name('.teamValue.')->group(function() {
            Route::post('add-value', 'add')->name('add');
            Route::delete('{teamValue}/delete', 'delete')->name('destroy');
        });
    });
});

// Route::resource('team', TeamController::class)->except(['create', 'store']);

// Competitions
Route::resource('competition', CompetitionController::class);
Route::post('competition/add-team', [CompetitionController::class, 'addTeam'])->name('competition.add-team');

// Games

Route::post('game/update-time', [GameController::class, 'updateTime'])->name('game.update-time');
Route::post('game/update-users', [GameController::class, 'updateUsers'])->name('game.update-users');
Route::resource('game', GameController::class)->except(['create', 'store']);
Route::get('game/create/{competition}', [GameController::class, 'create'])->name('game.create');
Route::post('game/{competition}', [GameController::class, 'store'])->name('game.store');
Route::get('competition/{competition}/game/{game}', [GameController::class, 'show'])->name('competition.game.show');

Route::post('competition/{competition}/game/{game}/teamvalues/store', [GameTeamValueController::class, 'store'])->name('competition.game.teamvalues.store');
Route::post('competition/{competition}/game/{game}/teamvalues/{team}/update', [GameTeamValueController::class, 'update'])->name('competition.game.teamvalues.update');

Route::post('game/{game}/submit-presence', [GameController::class, 'submitPresence'])->name('game.submit-presence');
Route::put('game/{game}/updateScore', [GameController::class, 'updateScore'])->name('game.updateScore');

// Locations
Route::resource('location', LocationController::class);

// Gamedays
Route::resource('gameday', GamedayController::class);
// Route::post('gameday/{gameday}/submit-presence', [GamedayController::class, 'submitPresence'])->name('gameday.submit-presence');

// Referees
Route::resource('referee', RefereeController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
