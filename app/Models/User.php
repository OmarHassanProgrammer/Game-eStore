<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'imgType',
        'rate',
        'bio'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function items() {
        return $this->hasMany(Item::class, "seller_id");
    }
    public function wishList() {
        return $this->belongsToMany(Item::class, "wishlist");
    }
    public function cart() {
        return $this->belongsToMany(Item::class, "carts");
    }
    public function socialLinks() {
        return $this->hasMany(SocialLink::class);
    }
    public function gameLinks() {
        return $this->hasMany(GameLink::class);
    }
    public function purchasedOrders() {
        return $this->hasMany(Order::class, "client_id");
    }
}
