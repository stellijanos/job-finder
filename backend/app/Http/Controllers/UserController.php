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
    public function getAllWithSkills() {
        return response()->json(User::with('skills')->get());
    }


    public function getById($id) {
        $user = User::with('skills')->find($id);

        if (!$user) {
            return response()->json(['response' => 'No user found!'], 404);
        }


        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();
        return response()->json($user);
    } 




    public function getByToken($token) {
   
        $user = User::with('skills', 'applications', 'saved_jobs')->where('token', $token)->first();

        if (!$user) {
            return response()->json(['response' => 'No user found!'], 404);
        }

        if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
            return response()->json(['response' => 'Invalid token!']);
        }

        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();
        return response()->json($user);
    }

 

    public function updateByToken($token) {
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['response' => 'User not found!'], 404);
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


    public function deleteByToken($token, $password) {
        $user = User::where('token', $token)->first();

        if (!$user) {
            return response()->json(['response' => 'User not found!'], 404);
        }

        if (!Hash::check($password, $user->password)) {
            return response()->json(['response' => 'Incorrect password!']);
        }

        $user->delete();
        return response()->json(['response' => 'ok']);
    }

}
