<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skill;
use App\Models\User;

class SkillController extends Controller
{
    //add a skill and about to user profile
    public function addActivities(Request $Request,$id) {
        $skills = json_decode($Request->skills);

        //adding user's skills to skills table
        foreach($skills as $skill) {
            $item = new Skill;
            $item->user_id = $id;
            $item->skill = $skill->text;
            $item->save();
        }

        //adding about to user's profile
        $user = User::find($id);
        $user->about = $Request->about;
        $user->save();

        return response()->json([
            'status' => 'success'
        ],200);
    }

    //get skills and about of a user profile
    public function getActivities($id) {
        $about = User::select('about')->where('id',$id)->get();
        $skills = Skill::select('skill')->where('user_id',$id)->get();

        return response()->json([
            'about' => $about[0]->about,
            'skills' => $skills
        ],200);
    }

}
