<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;

class CompleteOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:complete-orders';

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
        $expiredRecords = YourModel::where('status', '=', 'shipped')->where('shipped_at', '<=', now()->subDays(2))->get();

        foreach ($expiredRecords as $record) {
            $record->update(['status' => 'completed']);
        }
    }
}
