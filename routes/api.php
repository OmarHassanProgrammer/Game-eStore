<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\SubGameController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ChatController;
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
    Route::post('/add', [ItemController::class, 'add'])->middleware('auth:sanctum');
});

Route::prefix('/genres')->group(function () {
    Route::get('/getAll', [GenreController::class, 'index']);
});

Route::prefix('/user')->group(function () {
    Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');
    Route::get('/get/{id}', [UserController::class, 'get']);
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('/updateProfile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');
    Route::post('/updatePassword', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');
    Route::get('/getSoldOrders', [UserController::class, 'getSoldOrders'])->middleware('auth:sanctum');
    Route::get('/getPurchasedOrders', [UserController::class, 'getPurchasedOrders'])->middleware('auth:sanctum');
    Route::post('/getSimpleData', [UserController::class, 'getSimpleData']);
    Route::get('/getNewNotifications', [UserController::class, 'getNewNotifications'])->middleware('auth:sanctum');
    
    Route::prefix('/cart')->group(function () {
        Route::get('/get', [UserController::class, 'getCart']);
        Route::get('/clear', [UserController::class, 'clearCart']);
        Route::post('/order', [OrderController::class, 'orderCart']);
        Route::get('/add/{item_id}', [UserController::class, 'addToCart']);
        Route::get('/remove/{item_id}', [UserController::class, 'removeFromCart']);
    })->middleware('auth:sanctum');

    Route::prefix('/wishlist')->group(function () {
        Route::post('/toggle/{item_id}', [UserController::class, 'toggleWishlist']);
    });

});

Route::prefix('/chat')->group(function () {
    Route::post('/send', [ChatController::class, 'sendMsg']);
    Route::get('/get/{id}', [ChatController::class, 'getChat']);
});

require __DIR__.'/auth.php';
