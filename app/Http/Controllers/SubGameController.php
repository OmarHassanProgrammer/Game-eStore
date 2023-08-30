<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\SubGame;

class SubGameController extends Controller
{
    public function index() {
        $categories = SubGame::all();
        return response()->json(['categories' => $categories]);    
    }

    public function get($id) {
        $category = SubGame::find($id);
        return response()->json(['category' => $category]);    
    }

}
