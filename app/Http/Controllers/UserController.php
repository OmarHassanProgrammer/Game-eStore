<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use HasApiTokens;

    public function me() {
        return response()->json(array("user" => Auth::user(), "msg" => "done"));
    }

        
    public function logout()
    {
        Auth::logout(); // Log out the currently authenticated user
        return respons()->json(array('msg' => 'done')); 
    }
}
