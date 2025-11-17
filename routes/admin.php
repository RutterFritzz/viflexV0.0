<?php

use App\Http\Controllers\Admin\MessageTemplateController as AdminMessageTemplateController;
use App\Http\Controllers\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::prefix('admin')->name('admin')->group(function() {
        Route::controller(AdminMessageTemplateController::class)->prefix('templates')->name('.templates')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{messageTemplate}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });

        Route::controller(AdminTeamController::class)->prefix('teams')->name('.teams')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{team}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::post('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');

                Route::prefix('players')->name('.players.')->group(function() {
                    Route::get('store', 'addPlayer')->name('addPlayer');
                    Route::delete('{player}/delete', 'delete')->name('delete');
                });
            });
        });

        Route::controller(AdminUserController::class)->prefix('gebruikers')->name('.users')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{user}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::put('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });

        Route::controller(AdminRoleController::class)->prefix('rollen')->name('.roles')->group(function() {
            Route::get(null, 'index');
            Route::post('store', 'store')->name('.store');

            Route::prefix('{role}')->group(function() {
                Route::get('edit', 'edit')->name('.edit');
                Route::put('update', 'update')->name('.update');
                Route::delete('delete', 'delete')->name('.delete');
            });
        });
    });
});
