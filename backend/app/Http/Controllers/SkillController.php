<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function getAll() {
        return response()->json(Skill::all());
    }

    public function create() {

        $name = filter_var(request()->get('name'), FILTER_SANITIZE_STRING);
        if (!$name) {
            return response()->json(['response' => 'Invalid name']);
        }

        Skill::create([
            'name' => $name
        ]);
        return response()->json(['respone' => 'ok']);
    }
}
