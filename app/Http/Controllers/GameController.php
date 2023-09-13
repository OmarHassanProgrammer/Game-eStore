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
        return response()->json(['games' => $games, "msg" => "done"]);    
    }

    public function getCategories($id) {
        $game = Game::find($id);
        $categories = $game->subGames;
        return response()->json(['categories' => $categories, "msg" => "done"]);    
    }

    public function get($id) {
        $game = Game::find($id);
        return response()->json(['game' => $game]);    
    }
    
    public function getRandom($n) {
        $randomGames = Game::inRandomOrder()->take($n)->get()->toArray();
        return response()->json(['games' => $randomGames]);    
    }

    public function add(Request $request) {
        $game;
        
        if(isset($request->img) and $request->img != "undefined") {
            $game = Game::create([
                'name' => $request->name,
                'imgType' => ''
            ]);
            $request->validate([
                'img' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);
            $image = $request->file('img');
            $imageName = $game->id . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets/games'), $imageName);
            $game->update([
                'imgType' => $image->getClientOriginalExtension()
            ]);
            return response()->json(['msg' => 'done', 'game' => $game]);
        } else {
            return response()->json(['msg' => 'nogame']);
        }

    }
    
    public function delete($id) {
        $record = Game::find($id);

        if ($record) {
            $record->delete();
            return response()->json(['msg' => 'done']);
        } else {
            return response()->json(['msg' => 'norec']);
        }
    }
}
