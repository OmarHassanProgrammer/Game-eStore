<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use HasApiTokens;

    public function me() {
        return response()->json(Auth::user());
    }
}
