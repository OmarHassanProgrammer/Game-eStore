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

    public function getAll() {
        $users = User::with('items')->get();
        foreach ($users as $key => $user) {
            $balances = $user->balances;
            $b = 0;
            foreach ($balances as $key => $balance) {
                if($balance->type == "get") {
                    $b += $balance->amount;
                } else if ($balance->type == "withdraw") {
                    $b -= $balance->amount;
                }
            }
            $user->balance = $b;
        }
        return response()->json(['msg' => 'done',  'users' => $users]);
    }

    public function getCart() {
        $user = Auth::user();
        $fullData = User::with(["cart.images", "cart.seller"])->find($user->id);
        return response()->json(['msg' => 'done', 'cart' => $fullData->cart]);
    }
    
    public function addToCart($item_id) {
        $user = Auth::user();
        if(!$user->cart->contains('id', $item_id)) {
            $item = Item::find($item_id);
            if($item->amount > 0) {
                $item->amount -= 1;
                $item->save();
                $cart = $user->cart()->attach($item);
                return response()->json(['msg' => 'done', 'cart' => [...$user->cart, $item]]);
            } else {
                return response()->json(['msg' => 'finished']);
            }
        } else {
            return response()->json(['msg' => 'not']);
        }
    }

    public function removeFromCart($item_id) {
        $user = Auth::user();
        if($user->cart->contains('id', $item_id)) {
            $item = Item::find($item_id);
            $item->amount += 1;
            $item->save();
            $cart = $user->cart()->detach($item);
            return response()->json(['msg' => 'done', 'cart' => $user->cart]);
        } else {
            return response()->json(['msg' => 'not']);
        }

    }

    public function clearCart() {
        $user = Auth::user();
        foreach ($user->cart as $key => $item) {
            $item->amount -= 1;
            $item->save();
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
        $r = 0;
        $me = Auth::user();
        foreach ($user->items as $key => $item) {
            $item->inCart = $me->cart->contains('id', $item->id);
            $item->isLiked = $me->wishList->contains('id', $item->id);
        }
        if(count($user->rates) > 0) {
            foreach ($user->rates as $key => $rate) {
                $r += $rate->stars;
            }
            $user->rate = $r / count($user->rates);
        } else {
            $user->rate = 0;
        }
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
        if(isset($request->img) and $request->img != "undefined") {
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
                $user->gameLinks()->create(['link' => explode(',', $value)[0], 'game' => explode(',', $value)[1]]);
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

    public function getSoldOrders() {
        $user = Auth::user();
        $fullData = user::with(['items.orders.item.seller', 'items.orders.item.images'])->find($user->id);
        $orders = [];
        foreach ($fullData->items as $key => $item) {
            array_push($orders, ...$item->orders);
        }
        return response()->json(['msg' => 'done', 'orders' => $orders]); // TO FIX
    }
    
    public function getPurchasedOrders() {
        $user = Auth::user();
        $orders = User::with(["purchasedOrders.item.seller", "purchasedOrders.item.images"])->find($user->id)->purchasedOrders;
        return response()->json(['msg' => 'done', 'orders' => $orders]);
    }

    public function data(Request $request) {
        $people = [];

        if($request->ids) {
            foreach ($request->ids as $key => $id) {
                $user = User::find($id)->only(["id", "name", "imgType"]);
                array_push($people, $user);
            }
        }

        return response()->json(["msg" => "done", "people" => $people]);
        //return response()->json(["msg" => $request->ids]);
    }
    
    public function getNewNotifications() {
        $user = Auth::user();
        $notifications = $user->notifications;
        foreach ($user->notifications as $key => $notification) {
            $notification->delete();
        }
        return response()->json(['msg' => "done", "notifications" => $notifications]);
    }

    public function logout()
    {
        Auth::logout(); // Log out the currently authenticated user
        return respons()->json(array('msg' => 'done')); 
    }

    public function ban($user_id) {
        $user = User::find($user_id);
        $user->banned = 1;
        $user->save();

        return response()->json(['msg' => 'done']);
    }
    
    public function unban($user_id) {
        $user = User::find($user_id);
        $user->banned = 0;
        $user->save();

        return response()->json(['msg' => 'done']);
    }
    
    public function banned() {
        return response()->json(['msg' => 'banned']);
    }
}
