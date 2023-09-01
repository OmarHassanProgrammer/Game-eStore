<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class OrderController extends Controller
{
    public function orderCart(Request $request) {
        $user = Auth::user();
        $items = $user->cart;
        foreach ($items as $key => $item) {
            $order = [
                "item_id" => $item->id,
                "client_id" => $user->id,
                "status" => "ongoing",
                "moneyPaid" => $item->price,
            ];
            Order::create($order);
            $user->cart()->detach($item);
        }

        return response()->json(['msg' => 'done']);
    }
}
