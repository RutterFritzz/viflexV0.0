<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/games', [GameController::class, 'index'])->name('games.index');
Route::post('/games/update-time', [GameController::class, 'updateTime'])->name('games.update-time');
Route::post('/games/update-users', [GameController::class, 'updateUsers'])->name('games.update-users');

Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
