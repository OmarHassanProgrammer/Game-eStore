<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;

class ExpireOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredOrders = Order::with('item')->get();

        foreach ($expiredOrders as $order) {
            if($order->item->sellTime > 0 && $order->created_at <= now()->subDays($order->item->sellTime)) {
                $order->update(['status' => 'expired']);
            }
        }
    }
}
