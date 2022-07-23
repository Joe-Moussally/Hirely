<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Offer;
use App\Models\Stat;

class AdminController extends Controller
{
    public function getStats() {

        //get users count
        $user_count = User::all()->count();

        //get offers count
        $offer_count = Offer::all()->count();
        
        //get number of all time logins and signups
        $stats = Stat::find(1);

        $cities = User::all()->groupBy('city');

        return response()->json([
            'user_count' => $user_count,
            'offer_count' => $offer_count,
            'login_count' => $stats->user_login_count,
            'signup_count' => $stats->user_signup_count,
            'cities' => $cities
        ],200);
    }

    public function searchUsers(Request $Request) {
        $users = User::where('name','LIKE',"%$Request->name%")->get();

        return response()->json([
            'users' => $users
        ],200);
    }
}
