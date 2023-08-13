<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\SubGameController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ItemController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/games')->group(function () {
    Route::get('/getAll', [GameController::class, 'index']);
    Route::get('/get/{id}', [GameController::class, 'get']);
    Route::get('/getRandom/{n}', [GameController::class, 'getRandom']);
    Route::get('/getCategories/{id}', [GameController::class, 'getCategories']);
});

Route::prefix('/categories')->group(function () {
    Route::get('/getAll', [SubGameController::class, 'index']);
    Route::get('/get/{id}', [SubGameController::class, 'get']);
});

Route::prefix('/items')->group(function () {
    Route::get('/getAll/', [ItemController::class, 'index']);
    Route::get('/getAll/{subGame}', [ItemController::class, 'getAll']);
    Route::get('/get/{id}', [ItemController::class, 'get']);
});

Route::prefix('/genres')->group(function () {
    Route::get('/getAll', [GenreController::class, 'index']);
});

Route::prefix('/user')->group(function () {
    Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');
});

require __DIR__.'/auth.php';
