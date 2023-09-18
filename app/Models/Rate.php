<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;
    protected $fillable = ['stars', 'user_id', 'client_id'];

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
