<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function getAll() {
        return response()->json(Skill::with('jobs')->get());
    }
}
