<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CompanyController extends Controller
{
    public function getAllWithJobs() {
        return response()->json(Company::with('jobs.skills')->get());
    }

    public function getById($id) {
        $company = Company::with('jobs.skills')->find($id);

        if (!$company) {
            return response()->json(['response' => 'No company was found!']);
        }


        $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $company->save();
        return response()->json($company);

    
    } 




    public function getByToken($token) {
   
        $company = Company::with(['jobs.skills', 'jobs.applications'])->where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'No company found!'], 404);
        }

        if (Carbon::now()->gt(Carbon::parse($company->token_expires_at))) {
            return response()->json(['response' => 'Invalid token!']);
        }

        $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $company->save();
        return response()->json($company);
    }

 

    public function updateByToken($token) {
        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }

        if (!Hash::check(request()->get('password'), $company->password)) {
            return response()->json(['response' => 'Incorrect Password!']);
        }

        if (Carbon::now()->gt(Carbon::parse($company->token_expires_at))) {
            return response()->json(['response' => 'Invalid token!']);
        }


        $email = filter_var(request()->get('email'), FILTER_SANITIZE_EMAIL);

        if ($email != $company->email) {
            $existingCompany = Company::where('email', $email)->first();
            $existingCompany = Company::where('email', $email)->first();
    
            if ($existingCompany || $existingCompany) {
                return response()->json(['response' => 'Email already exists!']);
            }
        }
    

        $company->firstname = filter_var(request()->get('firstname'), FILTER_SANITIZE_STRING);
        $company->middlename = filter_var(request()->get('middlename'), FILTER_SANITIZE_STRING);
        $company->lastname = filter_var(request()->get('lastname'), FILTER_SANITIZE_STRING);
        $company->email = $email;


        $company->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
        $company->save();

        return response()->json($company);
    }



    public function changePassword($token) {

        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }

        $current = request()->get('current');
        $new     = request()->get('new');
        $confirm = request()->get('confirm');

        if ($new !== $confirm) {
            return response()->json(['response' => 'Passwords do not match!']);
        }

        if (!Hash::check($current, $company->password)) {
            return response()->json(['response' => 'Incorrect password!']);
        }

        $company->password = Hash::make($new);
        $company->save();

        return response()->json(['response' => 'ok']);
    }



    public function deleteByToken($token, $password) {
        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!'], 404);
        }

        if (!Hash::check($password, $company->password)) {
            return response()->json(['response' => 'Incorrect password!']);
        }

        $company->delete();
        return response()->json(['response' => 'ok']);
    }
}
