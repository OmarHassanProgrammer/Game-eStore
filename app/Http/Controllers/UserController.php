<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    use HasApiTokens;

    public function me() {
        return response()->json(array("user" => Auth::user(), "msg" => "done"));
    }

    public function get($id) {
        $user = User::with('items.images')->find($id);

        return response()->json(['msg' => 'done', 'user' => $user]);
    }

    public function logout()
    {
        Auth::logout(); // Log out the currently authenticated user
        return respons()->json(array('msg' => 'done')); 
    }
}
