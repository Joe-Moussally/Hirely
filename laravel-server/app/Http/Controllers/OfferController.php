<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Offer;

use Auth;

class OfferController extends Controller
{
      
    //api that gets all offers
    public function getOffers() {
        $offers = Offer::orderBy('created_at','desc')->get();

        return response()->json([
            'status' => 'success',
            'offers' => $offers
        ],200);
    }

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

    //api to remove a specific offer
    public function deleteOffer(Request $Request) {
        Offer::find($Request->id)->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }
}
