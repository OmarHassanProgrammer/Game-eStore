<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['web']], function () {

    Route::get('/', function () {
        return view('home');
    });
    Route::get('/games', function () {
        return view('games');
    });
    Route::get('/categories', function () {
        return view('categories');
    });
    Route::get('/items', function () {
        return view('items');
    });
    Route::get('/game', function () {
        return view('game');
    });
    Route::get('/login', function () {
        return view('login');
    });
    Route::get('/signup', function () {
        return view('signup');
    });
    Route::get('/list', function () {
        return view('list');
    });
    Route::get('/profile', function () {
        return view('profile');
    });
    Route::get('/settings', function () {
        return view('settings');
    });
    Route::get('/checkout', function () {
        return view('checkout');
    });
    Route::get('/admin', function () {
        return view('admin');
    });
    Route::get('/contactus', function () {
        return view('contactus');
    });
});

