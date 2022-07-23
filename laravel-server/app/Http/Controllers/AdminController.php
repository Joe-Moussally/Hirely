<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Offer;

class AdminController extends Controller
{
    public function getStats() {

        //get users count
        $user_count = User::all()->count();

        //get offers count
        $offer_count = Offer::all()->count();
        
        return response()->json([
            'user_count' => $user_count,
            'offer_count' => $offer_count
        ],200);
    }
}
