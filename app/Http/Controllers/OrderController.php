<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Game;
use App\Models\Balance;
use App\Models\Order;
use App\Models\Item;
use Srmklive\PayPal\Services\Paypal as PayPalClient;

class OrderController extends Controller
{
    public function orderCart(Request $request) {
        $user = Auth::user();
        $items = $user->cart;

        $price = 0;
        foreach ($items as $key => $item) {
            $price += $item->price;
        }

        $provider = new PayPalClient; 
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('order_success'),
                "cancel_url" => route('order_failed')
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $price  
                    ]
                ]
            ]
        ]);

        if(isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $key => $link) {
                if($link['rel'] == "approve") {
                    return response()->json(['msg' => 'done', 'payment' => [
                        'approvalUrl' => $link['href'], // URL for user approval
                    ]]);
                }
            }
        }

        return response()->json(['msg' => 'not', 'response' => $response]);
    }

    public function success(Request $request) {
        $user = Auth::user();
        $items = $user->cart;
        
        $provider = new PayPalClient; 
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);

        foreach ($items as $key => $item) {
            $order = [
                "item_id" => $item->id,
                "client_id" => $user->id,
                "status" => "ongoing",
                "moneyPaid" => $item->price,
            ];
            $order = Order::create($order);
            $user->balances()->create([
                "order_id" => $order->id,
                "type" => "pay",
                "amount" => $item->price
            ]);
            $items = Item::with('orders')->get()->where('seller_id', $item->seller->id);
            $n = 0;
            foreach ($items as $key => $item) {
                foreach ($item->orders as $key => $order) {
                    $n += 1;
                }
            }
            Balance::create([
                "user_id" => $item->seller->id,
                "order_id" => $order->id,
                "type" => "get",
                "after" => ($n > 200)?0:(($n > 100)?12:(($n > 50)?24:48)),
                "amount" => $item->price * 0.95
            ]);
            $user->cart()->detach($item);
        }

        $user->notifications()->create([
            "status" => "success",
            "msg" => "The order has been placed successfully",
            "time" => 5000
        ]);

        return redirect()->away('/settings?page=purchase');
    }

    public function getAll() {
        $orders = Order::with(['item.seller', 'item.images', 'client'])->get();
        return response()->json(['msg' => 'done', 'orders' => $orders]);
    }

    public function withdraw() {
        $provider = new PayPalClient; 
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $amount = 0;

        $data = [
            "sender_batch_header" => [
                "sender_batch_id" => "Payouts_" . time(),
                "email_subject" => "You have a payout!",
                "email_message" => "You have received a payout! Thanks for using our service!"
            ],
            "items" => [
                [
                    "recipient_type" => "EMAIL",
                    "amount" => [
                        "value" => "9.87",
                        "currency" => "USD"
                    ],
                    "note" => "Thanks for your patronage!",
                    "sender_item_id" => "201403140001",
                    "receiver" => "sb-8sgxw27328422@personal.example.com",
                    "notification_language" => "en-EN"
                ],
            ],
        ];
        
        $response = $provider->createBatchPayout($data);
        
        if(isset($response['batch_header']['batch_status']) && $response['batch_header']['batch_status'] == "PENDING") {
            Balance::create([
                "user_id" => Auth::user()->id,
                "order_id" => null,
                "type" => "withdraw",
                "after" => 0,
                "amount" => $amount,
                'access_token' => $paypalToken,
                'payout_patch_id' => $response['batch_header']['batch_status']
            ]);
            return response()->json(['msg' => 'done', 'response' => $response]);
        } else {
            return response()->json(['msg' => 'not']);
        }
    }

    public function info() {
        $provider = new PayPalClient; 
        $provider->setApiCredentials(config('paypal'));
        
        $response = $provider->showPayoutItemDetails('9HU3QM2R622GW');

        return response()->json(['msg' => 'done', 'response' => $response]);
    }
    
} 
