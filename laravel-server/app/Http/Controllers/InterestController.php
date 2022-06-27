<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;

use App\Models\Interest;
use App\Models\User;

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

    }
}
