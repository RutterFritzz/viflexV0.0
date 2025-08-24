<?php

use App\Http\Controllers\ClubController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\GamedayController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\RefereeController;
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
Route::resource('team', TeamController::class)->except(['create', 'store']);
Route::get('team/create/{club}', [TeamController::class, 'create'])->name('team.create');
Route::post('team/{club}', [TeamController::class, 'store'])->name('team.store');
Route::post('team/{team}/add-player', [TeamController::class, 'addPlayer'])->name('team.add-player');
Route::post('team/{team}/add-coach', [TeamController::class, 'addCoach'])->name('team.add-coach');
Route::get('team/{team}/get-members', [TeamController::class, 'getMembers'])->name('team.get-members');

// Competitions
Route::resource('competition', CompetitionController::class);
Route::post('competition/add-team', [CompetitionController::class, 'addTeam'])->name('competition.add-team');

// Games
Route::post('game/update-time', [GameController::class, 'updateTime'])->name('game.update-time');
Route::post('game/update-users', [GameController::class, 'updateUsers'])->name('game.update-users');
Route::resource('game', GameController::class)->except(['create', 'store']);
Route::get('game/create/{competition}', [GameController::class, 'create'])->name('game.create');
Route::post('game/{competition}', [GameController::class, 'store'])->name('game.store');
Route::post('game/{game}/submit-presence', [GameController::class, 'submitPresence'])->name('game.submit-presence');

// Locations
Route::resource('location', LocationController::class);

// Gamedays
Route::resource('gameday', GamedayController::class);
// Route::post('gameday/{gameday}/submit-presence', [GamedayController::class, 'submitPresence'])->name('gameday.submit-presence');

// Referees
Route::resource('referee', RefereeController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
