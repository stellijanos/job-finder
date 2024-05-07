<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function getAll() {
        return response()->json(Job::with('company', 'category', 'skills')
        ->whereHas('skills', function ($query) {
            $query->where('name', 'Java');
        })->get());
    }


    public function create($token) {

        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }

        
    } 
}
