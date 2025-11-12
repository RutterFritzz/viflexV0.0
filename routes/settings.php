<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\MessageTemplateController;
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

        Route::controller(MessageTemplateController::class)->prefix('templates')->name('.templates')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{messageTemplate}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });

        Route::get('appearance', function () {
            return Inertia::render('settings/appearance');
        })->name('appearance');
    });
});
