<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{
    public function addSkills(Request $Request,$id) {
        $skills = json_decode($Request->skills);
        foreach($skills as $skill) {
            $item = new Skill;
            $item->user_id = $id;
            $item->skill = $skill->text;
            $item->save();
        }

        return response()->json([
            'status' => 'success'
        ],200);
    }


}
