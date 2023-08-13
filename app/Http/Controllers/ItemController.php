<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubGame;
use App\Models\Item;

class ItemController extends Controller
{
    public function index() {
        $items = Item::with("images")->get();
        return response()->json(["items" => $items]);
    }
    public function getAll($id) {
        $subCategory = SubGame::find($id);
        $items = $subCategory->items;
        foreach ($items as $key => $item) {
            $item->_images = $item->images;
        }
        return response()->json(["items" => $items]);
    }
    public function get($id) {
        $item = Item::with(['subgame.game', 'images'])->find($id);
        return response()->json(["item" => $item]);
    }
}
