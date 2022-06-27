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
        return $this->belongsTo(Offer::class);
    }

    //Eloquent relationship between users and offers
    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
