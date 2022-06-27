<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Offer;

use Auth;

class OfferController extends Controller
{
    
    //api to add a Job Offer
    public function addOffer(Request $Request) {

        $offer = new Offer;
        $offer->position = $Request->position;
        $offer->description = $Request->description;
        //getting authenticated user id
        $offer->user_id = Auth::user()->id;
        $offer->save();
        

        return response()->json([
            'status' => 'success',
            'offer' => $offer
        ],200);
    }

}
