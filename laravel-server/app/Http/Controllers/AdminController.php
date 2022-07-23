<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getStats() {

        
        return response()->json([
            'contact' => 'here'
        ],200);
    }
}
