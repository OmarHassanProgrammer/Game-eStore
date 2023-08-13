<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubGame extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'imgType']; // Fillable attributes
    
    // Define relationships
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function items()
    {
        return $this->hasMany(Item::class, "sub_game_id");
    }
}
