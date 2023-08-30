<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Item;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use HasApiTokens;

    public function me() {
        return response()->json(array("user" => Auth::user(), "msg" => "done"));
    }

    public function getCart() {
        $user = Auth::user();
        return response()->json(['msg' => 'done', 'cart' => $user->cart]);
    }
    
    public function addToCart($item_id) {
        $user = Auth::user();
        if(!$user->cart->contains('id', $item_id)) {
            $item = Item::find($item_id);
            $cart = $user->cart()->attach($item);
        }
        return response()->json(['msg' => 'done', 'cart' => [...$user->cart, $item]]);
    }

    public function removeFromCart($item_id) {
        $user = Auth::user();
        if(!$user->cart->contains('id', $item_id)) {
            $item = Item::find($item_id);
            $cart = $user->cart()->attach($item);
        }
        return response()->json(['msg' => 'done', 'cart' => [...$user->cart, $item]]);
    }

    public function clearCart() {
        $user = Auth::user();
        foreach ($user->cart as $key => $item) {
            $cart = $user->cart()->detach($item);
        }
        return response()->json(['msg' => 'done']);
    }

    public function toggleWishlist($item_id) {
        $user = Auth::user();
        $item = Item::find($item_id);
        if(!$user->wishList->contains('id', $item_id)) {
            $cart = $user->wishList()->attach($item);
            return response()->json(['msg' => 'done', 'fav' => true]);
        } else {
            $cart = $user->wishList()->detach($item);
            return response()->json(['msg' => 'done',  'fav' => false]);
        }
    }

    public function get($id) {
        $user = User::with('items.images', 'socialLinks', 'gameLinks')->find($id);

        return response()->json(['msg' => 'done', 'user' => $user]);
    }

    public function updateProfile (Request $request) {
        $user = Auth::user();
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);
        if($request->email != $user->email) {
            $request->validate([
                'email' => ['unique:'.User::class],
            ]);
        }

        if($request->img) {
            $request->validate([
                'img' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);
            $image = $request->file('img');
            $imageName = $user->id . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('assets/users'), $imageName);

            $user->update([
                'imgType' => $image->getClientOriginalExtension()
            ]);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'bio' => $request->bio ?? " ",
        ]);
        $user->socialLinks()->delete();
        $user->gameLinks()->delete();

        if(isset($request->socialLinks)) {
            foreach ($request->socialLinks as $key => $value) {
                $user->socialLinks()->create(['link' => $value]);
            }
        }
        if(isset($request->gameLinks)) {
            foreach ($request->gameLinks as $key => $value) {
                $user->gameLinks()->create(['link' => $value->value, 'game' => $value->game]);
            }
        }

        return response()->json(['msg' => 'done', 'user' => $user->load('items.images', 'socialLinks', 'gameLinks')]);
    }

    public function updatePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required|password_only',
            'newPassword' => 'required'
        ]);

        if ($validator->passes()) {

            Auth::user()->password = Hash::make($request->newPassword);
            Auth::user()->save();
            return response()->json(['msg' => "done"]);
        } else {
            return response()->json(['msg' => "passwords are not correct"]);
        }

    }

    public function logout()
    {
        Auth::logout(); // Log out the currently authenticated user
        return respons()->json(array('msg' => 'done')); 
    }
}
