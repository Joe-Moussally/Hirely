<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;

use App\Models\Interest;
use App\Models\User;
use App\Models\Offer;

class InterestController extends Controller
{
    //api to add interest of a user in an offer
    public function addInterest($id) {
        $interest = new Interest;
        $interest->user_id = Auth::user()->id;
        $interest->offer_id = $id;
        $interest->save();

        return response()->json([
            'status' => 'added',
            'interest' => $interest
        ],200);
    }

    
    //api that retrieves the interested users in a job
    public function getInterested($id) {
        $interests = Interest::select('user_id')->where('offer_id',$id)->get();
        $users = [];
        //iterate over userIds and get the users interested in the offer
        foreach ($interests as $interest) {
            array_push($users, User::find($interest->user_id));
        }

        return response()->json([
            'users' => $users
        ],200);
    }

    //api to check if user in interested in offer
    public function checkInterest($id) {
        $interest->user_id = Auth::user()->id;
        $check = Interest::where('offer_id',$id)->get();

        if(count($check) == 0) {
            $interested = false;
        }else{
            $interested = true;
        };

        return response()->json([
            'interested' => $interested
        ],200);
    }
}
