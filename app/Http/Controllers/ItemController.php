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
        $items = Item::with(["images", "subgame.game", "seller"])->get();
        if(Auth::check()) {
            $user = Auth::user();
            foreach ($items as $key => $item) {
                $item->inCart = $user->cart->contains('id', $item->id);
                $item->isLiked = $user->wishList->contains('id', $item->id);
            }
        }
        return response()->json(["msg" => "done", "items" => $items]);
    }
    public function getAll($id) {
        $subCategory = SubGame::find($id);
        $items = $subCategory->items;
        if(Auth::check()) {
            $user = Auth::user();
            foreach ($items as $key => $item) {
                $item->inCart = $user->cart->contains('id', $item->id);
                $item->isLiked = $user->wishList->contains('id', $item->id);
            }
            foreach ($items as $key => $item) {
                $item->_images = $item->images;
            }
            return response()->json(["msg" => "done", "items" => $items]);
        } else {
            return response()->json(["msg" => "not"]);
        }
    }

    public function get($id) {
        $item = Item::with(['subgame.game', 'images', 'seller'])->find($id);
        $isCart = false;
        $isFav = false;
        if(Auth::check()) {
            if(Auth::user()->cart->contains('id', $item->id)) {
                $isCart = true;
            }
            if(Auth::user()->wishlist->contains('id', $item->id)) {
                $isFav = true;
            }
        }
        return response()->json(["item" => $item, 'isCart' => $isCart, 'isFav' => $isFav]);
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

    public function delete($id) {
        $item = Item::find($id);
        foreach ($items->orders as $key => $order) {
            $order->delete();
        }
        $item->delete();

        return response()->json(['msg' => 'done']);
    }
}
