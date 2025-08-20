<?php

use App\Http\Controllers\SearchController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/search', [SearchController::class, 'search'])->name('search');

Route::get('/user/{id}', function (Request $request, $id) {
    return User::find($id);
})->name('user');