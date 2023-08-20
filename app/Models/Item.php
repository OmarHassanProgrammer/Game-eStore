<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ["name", "price", "amount", "seller_id", "sub_game_id", "sold", "description", "sellTime"];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function subGame()
    {
        return $this->belongsTo(SubGame::class, "sub_game_id");
    }
    public function seller()
    {
        return $this->belongsTo(User::class, "seller_id");
    }
    public function images()
    {
        return $this->hasMany(ItemImage::class);
    }
}
