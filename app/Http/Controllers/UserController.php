<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me() {
        return response()->json(Auth::user());
    }
}
