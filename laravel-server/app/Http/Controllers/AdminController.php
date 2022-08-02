<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Offer;
use App\Models\Stat;
use App\Models\Skill;

class AdminController extends Controller
{
    public function getStats() {

        //get users count
        $user_count = User::all()->count();

        //get offers count
        $offer_count = Offer::all()->count();

        //get number of all time logins and signups
        $stats = Stat::find(1);

        $cities = User::select(
            User::raw("city"),
            User::raw("COUNT(*) as users_per_city")
        )->orderBy('city')
        ->groupBy( User::raw("city"))->get();

        $user_registered_per_month = User::select(
            User::raw("MONTH(created_at) as month"),
            User::raw("COUNT(*) as number_of_users")
        )->orderBy('month')
        ->groupBy( User::raw("MONTH(created_at)"))->get();

        $offer_registered_per_month = Offer::select(
            Offer::raw("MONTH(created_at) as month"),
            Offer::raw("COUNT(*) as number_of_offers")
        )->orderBy('month')
        ->groupBy(Offer::raw("MONTH(created_at)"))->get();

        return response()->json([
            'users_per_month' => $user_registered_per_month,
            'offers_per_month' => $offer_registered_per_month,
            'user_count' => $user_count,
            'offer_count' => $offer_count,
            'login_count' => $stats->user_login_count,
            'signup_count' => $stats->user_signup_count,
            'cities' => $cities
        ],200);
    }

    public function searchUsers($name) {
        $users = User::where('name','LIKE',"%$name%")->get();

        return response()->json([
            'users' => $users
        ],200);
    }

    public function getProfile($id) {
        $user = User::find($id);
        $skills = Skill::where('user_id',$id)->get();

        return response()->json([
            'user' => $user,
            'skills' => $skills
        ],200);
    }

    //function to remove a specific user
    public function removeUser(Request $Request) {
        $user = User::find($Request->id);
        $user->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }

    //retrieve offers according to search input
    public function searchOffers($name) {
        $offers = Offer::where('position','LIKE',"%$name%")->get();
        foreach ($offers as $offer) {
            $offer['user'] = $offer->user;
        }
        return response()->json([
            'offers' => $offers
        ],200);
    }
}
