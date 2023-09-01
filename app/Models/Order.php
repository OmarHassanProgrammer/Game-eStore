<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ["item_id", "client_id", "status", "moneyPaid"];

    public function item() 
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
    public function client() 
    {
        return $this->belongsTo(Item::class, 'client_id');
    }
}
