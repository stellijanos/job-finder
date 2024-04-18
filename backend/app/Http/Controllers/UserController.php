<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAll() {
        return response()->json(User::with('saved_jobs', 'skills', 'applications')->get());
    }
}
