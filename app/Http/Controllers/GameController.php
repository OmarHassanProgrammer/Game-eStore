<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GameController extends Controller
{
    public function index() {
        $games = Game::all();
        foreach ($games as $key => $game) {
            $game->genresIds = $game->genres->pluck('id')->toArray();
        }
        return response()->json(['games' => $games]);    
    }

    public function getCategories($id) {
        $game = Game::find($id);
        $categories = $game->subGames;
        return response()->json(['categories' => $categories]);    
    }

    public function get($id) {
        $game = Game::find($id);
        return response()->json(['game' => $game]);    
    }
    
    public function getRandom($n) {
        $randomGames = Game::inRandomOrder()->take($n)->get()->toArray();
        return response()->json(['games' => $randomGames]);    
    }
    
}
