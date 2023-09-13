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

    public function add(Request $request) {
        $game;
        
        if(isset($request->img) and $request->img != "undefined") {
            $category = SubGame::create([
                'name' => $request->name,
                'imgType' => '',
                'game_id' => $request->game
            ]);
            $request->validate([
                'img' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);
            $image = $request->file('img');
            $imageName = $category->id . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets/categories'), $imageName);
            $category->update([
                'imgType' => $image->getClientOriginalExtension()
            ]);
            return response()->json(['msg' => 'done', 'category' => $category]);
        } else {
            return response()->json(['msg' => 'nogame']);
        }

    }
    
    public function delete($id) {
        $record = SubGame::find($id);

        if ($record) {
            $record->delete();
            return response()->json(['msg' => 'done']);
        } else {
            return response()->json(['msg' => 'norec']);
        }
    }
}
