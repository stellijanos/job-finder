<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function getAll() {
        return response()->json(Job::with('company', 'category', 'skills', 'applications')
        ->whereHas('skills', function ($query) {
            $query->where('name', 'Java');
        })->get());
    }
}
