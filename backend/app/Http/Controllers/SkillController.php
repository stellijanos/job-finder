<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkillController extends Controller
{
    public function getAll() {
        return response()->json(Skill::all());
    }

    public function create() {

        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:64'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['response' => 'Invalid name']);
        }

        $skill = new Skill();
        $skill->name = request()->get('name');
        $skill->save();

        return response()->json(['response' => 'ok', 'data' => $skill]);
    }
}
