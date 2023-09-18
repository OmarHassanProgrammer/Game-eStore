<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $fillable = ['to', 'from', 'msg', 'seen_at'];

    public function to() {
        return this->belongsTo(User::class, 'to');
    }

    public function from() {
        return this->belongsTo(User::class, 'from');
    }
}
