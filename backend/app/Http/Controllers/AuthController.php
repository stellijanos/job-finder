<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function registerUser() {

        $validator = Validator::make(request()->all(), [
            'firstname' => ['required','max:128'],
            'middlename' => ['max:128'],
            'lastname' => ['required','max:128'],
            'email' => ['required','email','unique:users'],
            'password' => ['required', Password::min(8)->mixedCase()->numbers()->symbols()],
            'confirmPassword' => ['required', 'same:password']
        ]);

        if (count($validator->errors()) !== 0) {
            return response()->json($validator->errors());
        }

        $firstname = filter_var(request()->get('firstname'), FILTER_SANITIZE_STRING);
        $lastname = filter_var(request()->get('lastname'), FILTER_SANITIZE_STRING);
        $email = filter_var(request()->get('email'), FILTER_SANITIZE_EMAIL);
        $password = Hash::make(request()->get('password'));

        $user = User::where('email', $email)->first();
        $company = Company::where('email', $email)->first();

        if ($user || $company) {
            return response()->json(['response' => 'Email already exists!']);
        }

        $user = new User();
        $user->firstname = $firstname;
        $user->lastname = $lastname;
        $user->email = $email;
        $user->password = $password;
        $user->token = Str::uuid();
        $user->token_expires_at = Carbon::now()->toDateTimeString();
        
        if (request()->get('middlename')) {
            $user->middlename = filter_var(request()->get('middlename'), FILTER_SANITIZE_STRING);   
        }

        $user->save();

        return response()->json(['response' => 'ok'])->withHeaders([
            "Content-Type" => "application/json",
            "Access-Control-Allow-Origin" => "*",
            "Access-Control-Allow-Methods" => "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS",
            "Access-Control-Allow-Headers" => "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With"
        ]);
    }


    public function registerCompany() {

        $validator = Validator::make(request()->all(), [
            'name' => ['required','max:128'],
            'website' => ['required','max:128'],
            'email' => ['required','email','unique:users'],
            'password' => ['required', Password::min(8)->mixedCase()->numbers()->symbols()],
            'confirmPassword' => ['required', 'same:password']
        ]);

        if (count($validator->errors()) !== 0) {
            return response()->json($validator->errors());
        }

        $name = filter_var(request()->get('name'), FILTER_SANITIZE_STRING);
        $website = filter_var(request()->get('website'), FILTER_SANITIZE_URL);
        $email = filter_var(request()->get('email'), FILTER_SANITIZE_EMAIL);
        $password = Hash::make(request()->get('password'));

        $company = Company::where('email', $email)->first();
        $user = User::where('email', $email)->first();

        if ($company || $user) {
            return response()->json(['response' => 'Email already exists!']);
        }

        $company = new User();
        $company->name = $name;
        $company->website = $website;
        $company->email = $email;
        $company->password = $password;
        $company->token = Str::uuid();
        $company->token_expires_at = Carbon::now()->toDateTimeString();
        
        if (request()->get('middlename')) {
            $company->middlename = filter_var(request()->get('middlename'), FILTER_SANITIZE_STRING);   
        }

        $company->save();

        return response()->json(['response' => 'ok'])->withHeaders([
            "Content-Type" => "application/json",
            "Access-Control-Allow-Origin" => "*",
            "Access-Control-Allow-Methods" => "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS",
            "Access-Control-Allow-Headers" => "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With"
        ]);
    }


    private function loginCompany($credentials) {
        $company = Company::where('email', $credentials['email'])->first();

        if (!$company) {
            return response()->json(['response' => 'Incorrect email!'], 401);
        }

        if (!Hash::check($credentials['password'], $company->password)) {
            return response()->json(['response' => 'Incorrect password!'], 401);
        }

        if (Auth::attempt($credentials)) {
            $company->token = Str::uuid();
            $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
            $company->save();
            
            return response()->json(['response' => 'ok', 'token' => $company->token], 200);
        }
        return response()->json(['response' => 'Something went wrong'], 401);
    }


    public function login() {
        $validator = Validator::make(request()->all(), [
            'email' => ['required','email'],
            'password' => ['required']
        ]);

        if (count($validator->errors()) !== 0) {
            return response()->json($validator->errors(), 401);
        }

        $credentials = [
            'email' => filter_var(request()->get('email'), FILTER_SANITIZE_EMAIL),
            'password' => request()->get('password')
        ];

        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return $this->loginCompany($credentials);
        }

        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['response' => 'Incorrect password!'], 401);
        }

        if (Auth::attempt($credentials)) {
            
            $user->token = Str::uuid();
            $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
            $user->save();
            
            return response()->json(['response' => 'ok', 'token' => $user->token], 200);
        }
        return response()->json(['response' => 'Something went wrong'], 401);
    }



    public function logout(string $token) {
        $user = User::where('token', $token)->first();

        if ($user) {
            $user->token_expires_at = Carbon::now()->toDateTimeString();
            $user->save();
            return response()->json(['response'=>'ok']);
        }
        return response()->json(['response' => 'Invalid token']);
    }



    private function isLoggedInCompany($token) {
        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(false);
        }

        if (Carbon::now()->gt(Carbon::parse($company->token_expires_at))) {
            return response()->json(false);
        }

        $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $company->save();
        return response()->json(true);
    }


    public function isLoggedIn($token) {

        $user = User::where('token', $token)->first();

        if (!$user) {
            return $this->isLoggedInCompany($token);
        }

        if (Carbon::now()->gt(Carbon::parse($user->token_expires_at))) {
            return response()->json(false);
        }

        $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $user->save();
        return response()->json(true);

    }
}



// "The password must be at least 8 characters.",
// "The password must contain at least one uppercase and one lowercase letter.",
// "The password must contain at least one symbol.",
// "The password must contain at least one number."


