<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function getAll() {
        return response()->json(Company::with('jobs')->get());
    }
}
