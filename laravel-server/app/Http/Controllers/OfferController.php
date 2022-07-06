<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Offer;
use App\Models\Requirement;
use App\Models\Interest;
use App\Models\User;

use Auth;

class OfferController extends Controller
{
      
    //api that gets all offer position, poster and offer idZ
    //except the logged in user's offers
    public function getOffers() {
        
        $user_id = Auth::user()['id'];
        $offers = Offer::select('id','position','user_id')->where('user_id','!=',$user_id)->get();

        foreach ($offers as $offer) {
            $offer['user'] = $offer->user;
        }

        return response()->json([
            'status' => 'success',
            'offers' => $offers,
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

        //get the offer's details
        $offer = Offer::find($id);

        $user = Offer::find($id)->user;

        //get the offer's requirements
        $requirements = Requirement::where('offer_id',$id)->get();
        
        return response()->json([
            'offer' => $offer,
            'requirements' => $requirements,
            'user' => $user
        ],200);
    }
}
