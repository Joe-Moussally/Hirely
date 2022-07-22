<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class ChatController extends Controller
{
    public function getContactInfo($id) {
        $contact = User::select('id','name','picture_base64','number')->where('id',$id)->get();

        return response()->json([
            'contact' => $contact
        ],200);
    }
}
