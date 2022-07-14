<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class ChatController extends Controller
{
    public function getContactInfo($id) {
        $contact = User::find($id);

        return response()->json([
            'contact' => $contact
        ],200);
    }
}
