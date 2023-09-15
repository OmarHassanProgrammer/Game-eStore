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
use App\Http\Controllers\BalanceController;
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
    Route::post('/add', [GameController::class, 'add'])->middleware('auth:sanctum', 'admin');
    Route::post('/delete/{id}', [GameController::class, 'delete'])->middleware('auth:sanctum', 'admin');
});

Route::prefix('/categories')->group(function () {
    Route::get('/getAll', [SubGameController::class, 'index']);
    Route::get('/get/{id}', [SubGameController::class, 'get']);
    Route::post('/add', [SubGameController::class, 'add'])->middleware('auth:sanctum', 'admin');
    Route::post('/delete/{id}', [SubGameController::class, 'delete'])->middleware('auth:sanctum', 'admin');
});

Route::prefix('/items')->group(function () {
    Route::get('/getAll/', [ItemController::class, 'index']);
    Route::get('/getAll/{subGame}', [ItemController::class, 'getAll']);
    Route::get('/get/{id}', [ItemController::class, 'get']);
    Route::post('/add', [ItemController::class, 'add'])->middleware('auth:sanctum');
});

Route::prefix('/orders')->group(function () {
    Route::get('/getAll', [OrderController::class, 'getAll'])->middleware('auth:sanctum', 'admin');
    Route::get('/success', [OrderController::class, 'success'])->middleware('auth:sanctum')->name('order_success');
    Route::get('/failed', [OrderController::class, 'failed'])->middleware('auth:sanctum')->name('order_failed');
    Route::get('/withdraw', [OrderController::class, 'withdraw'])->middleware('auth:sanctum');
    Route::get('/info', [OrderController::class, 'info'])->middleware('auth:sanctum');
});

Route::prefix('/balances')->group(function () {
    Route::get('/getAll', [BalanceController::class, 'getAll'])->middleware('auth:sanctum', 'admin');
    Route::get('/get', [BalanceController::class, 'get'])->middleware('auth:sanctum');
});

Route::prefix('/genres')->group(function () {
    Route::get('/getAll', [GenreController::class, 'index']);
});

Route::prefix('/user')->group(function () {
    Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');
    //Route::post('/data', [UserController::class, 'data'])->middleware('auth:sanctum');
    Route::post('/gdata', [UserController::class, 'data'])->middleware('auth:sanctum');
    Route::get('/get/{id}', [UserController::class, 'get']);
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('/updateProfile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');
    Route::post('/updatePassword', [UserController::class, 'updatePassword'])->middleware('auth:sanctum');
    Route::get('/getSoldOrders', [UserController::class, 'getSoldOrders'])->middleware('auth:sanctum');
    Route::get('/getPurchasedOrders', [UserController::class, 'getPurchasedOrders'])->middleware('auth:sanctum');
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
