<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getAll() {
        return response()->json(User::with('saved_jobs', 'skills', 'applications')->get());
    }





    public function getUser($token) {
   
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json([]);
        }

        if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
            return response()->json([]);
        }

        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();
        return response()->json($user);

    }

    public function updateUser($token) {
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['response' => 'User not found!']);
        }

        if (!Hash::check(request()->get('password'), $user->password)) {
            return response()->json(['response' => 'Incorrect Password!']);
        }

        if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
            return response()->json(['response' => 'Invalid token!']);
        }


        $email = filter_var(request()->get('email'), FILTER_SANITIZE_EMAIL);

        if ($email != $user->email) {
            $existingUser = User::where('email', $email)->first();
            $existingCompany = Company::where('email', $email)->first();
    
            if ($existingUser || $existingCompany) {
                return response()->json(['response' => 'Email already exists!']);
            }
        }
    

        $user->firstname = filter_var(request()->get('firstname'), FILTER_SANITIZE_STRING);
        $user->middlename = filter_var(request()->get('middlename'), FILTER_SANITIZE_STRING);
        $user->lastname = filter_var(request()->get('lastname'), FILTER_SANITIZE_STRING);
        $user->email = $email;


        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();

        return response()->json($user);
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
