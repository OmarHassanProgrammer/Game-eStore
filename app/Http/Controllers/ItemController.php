<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubGame;
use Illuminate\Support\Facades\Auth;
use App\Models\Item;
use App\Models\ItemImage;

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
        $item = Item::with(['subgame.game', 'images', 'seller'])->find($id);
        return response()->json(["item" => $item]);
    }

    public function add(Request $request) 
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price' => 'required|integer|min:1',
            'amount' => 'required|integer|min:1',
            'sellTime' => 'required|integer',
            'sub_game_id' => 'required|integer|min:1',
        ]);
        $request->validate([
            'imgFiles.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $validatedData['seller_id'] = Auth::user()->id;
        
        $item = Item::create($validatedData);

        $uploadedImages = [];

        foreach ($request->file('imgFiles') as $image) {
            $imageName = time() . '_' . mt_rand(100000, 999999) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets/items'), $imageName);
            $uploadedImages[] = $imageName;
        }

        foreach ($uploadedImages as $key => $image) {
            $itemImage = ItemImage::create([
                'item_id' => $item->id,
                'image' => $image
            ]);
        }

        return response()->json(['msg' => 'done', 'item' => $item]);
    
    }
}
