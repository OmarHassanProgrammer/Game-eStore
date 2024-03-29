<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ["item_id", "client_id", "status", "moneyPaid", "shipped_at"];

    public function item() 
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
    public function client() 
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
