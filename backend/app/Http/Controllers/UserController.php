<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAll() {
        return response()->json(User::with('saved_jobs', 'skills', 'applications')->get());
    }





    public function getUser($token): Response {
   
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['response' => 'No user was found!']);
        }

        if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
            return response()->json(['response' => 'Invalid token!']);
        }

        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();
        return response()->json(['response' => 'ok', 'user' => $user]);

    }
}



// private function isLoggedInCompany($token) {
//     $company = Company::where('token', $token)->first();

//     if (!$company) {
//         return response()->json(false);
//     }

//     if (Carbon::now()->gt(Carbon::parse($company->token_expires_at))) {
//         return response()->json(false);
//     }

//     $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
//     $company->save();
//     return response()->json(true);
// }


// public function isLoggedIn($token) {

//     $user = User::where('token', $token)->first();

//     if (!$user) {
//         return $this->isLoggedInCompany($token);
//     }

//     if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
//         return response()->json(false);
//     }

//     $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
//     $user->save();
//     return response()->json(true);

// }
