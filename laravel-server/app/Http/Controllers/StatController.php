<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Stat;

class StatController extends Controller
{
    public function incrementLogin() {
        $stats = Stat::find(1);
        $stats->user_login_count += 1;
        $stats->save();
        
        return response()->json([
            'status' => 'success'
        ],200);
    }

    public function incrementSignup() {
        $stats = Stat::find(1);
        $stats->user_signup_count += 1;
        $stats->save();
        
        return response()->json([
            'status' => 'success'
        ],200);
    }
}
