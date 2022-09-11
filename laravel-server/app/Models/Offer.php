<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;


    //Eloquent relationship between user and offers
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //Eloquent relationship between interests and offers
    public function interests()
    {
        return $this->hasMany(interest::class);
    }
    
}
