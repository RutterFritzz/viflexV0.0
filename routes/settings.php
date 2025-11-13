<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    Route::prefix('settings')->name('settings')->group(function() {
        Route::redirect(null, 'settings/profile');

        Route::controller(ProfileController::class)->prefix('profile')->name('.profile')->group(function() {
            Route::get(null, 'edit');
            Route::patch('update', 'update')->name('.update');
            Route::delete('destroy', 'destroy')->name('.destroy');
        });

        Route::controller(PasswordController::class)->prefix('password')->name('.password.')->group(function() {
            Route::get(null, 'edit')->name('edit');
            Route::put('update', 'update')->name('update');
        });

        Route::get('appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
});
