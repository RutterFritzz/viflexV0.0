<?php

use App\Http\Controllers\Admin\MessageTemplateController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->name('admin')->group(function() {
        Route::controller(MessageTemplateController::class)->prefix('templates')->name('.templates')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{messageTemplate}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });

        Route::controller(UserController::class)->prefix('gebruikers')->name('.users')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{user}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });

        Route::controller(RoleController::class)->prefix('rollen')->name('.roles')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{role}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });
    });
});
