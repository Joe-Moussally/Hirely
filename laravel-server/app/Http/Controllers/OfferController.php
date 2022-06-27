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

    //api that gets all offers
    public function getOffers() {
        $offers = Offer::orderBy('created_at','desc')->get();

        return response()->json([
            'status' => 'success',
            'offers' => $offers
        ],200);
    }

}
