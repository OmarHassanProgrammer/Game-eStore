<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;
    protected $fillable = ["name", "imgType"];
    public function games()
    {
        return $this->belongsToMany(Game::class, "game_genre");
    }
}
