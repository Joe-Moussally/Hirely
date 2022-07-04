<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Offer;
use App\Models\Requirement;
use App\Models\Interest;

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

        //getting the job info
        $offer = new Offer;
        $offer->position = $Request->position;
        $offer->description = $Request->description;
        $offer->user_id = $Request->user_id;
        $offer->save();

        $offer_id = $offer->id;

        foreach (json_decode($Request->requirements) as $req) {
            $requirment = new Requirement;
            $requirment->offer_id = $offer_id;
            $requirment->requirement = $req->text;
            $requirment->save();
        }

        return response()->json([
            'status' => 'success',
        ],200);
    }


    //api to remove a specific offer
    public function deleteOffer($id) {
        Offer::find($id)->delete();
        Interest::where('offer_id',$id)->delete();

        return response()->json([
            'status' => 'deleted'
        ],200);
    }

    
    //api that gets all the offer details
    public function getOfferDetails($id) {
        $offer = Offer::find($id);
        
        return response()->json([
            'offer' => $offer
        ],200);
    }
}
