<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Balance;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    public function getAll() {
        $balances = Balance::with(['user', 'order.item'])->get();
        return response()->json(["msg" => "done", "balances" => $balances]);
    }
    public function get() {
        $user = Auth::user();
        $balances = Balance::with(['user', 'order.item.seller', 'order.client'])->get()->where('user_id', $user->id);
        return response()->json(["msg" => "done", "balances" => $balances]);
    }
}
