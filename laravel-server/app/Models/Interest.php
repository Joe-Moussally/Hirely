<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    use HasFactory;

    //Eloquent relationship between interests and offers
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    //Eloquent relationship between users and offers
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
