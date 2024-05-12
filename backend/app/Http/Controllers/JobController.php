<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JobController extends Controller
{
    public function getAll() {
        return response()->json(Job::with('company', 'category', 'skills')->get());
    }



    public function create($token) {

        $validator = Validator::make(request()->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'salary' => 'nullable|numeric',
            'location' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id'
        ]);

        if ($validator->fails()) {
            // Validation failed
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ]);
        }

        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }


        $job = new Job();

        $job->title = request()->get('title');
        $job->description = request()->get('description');
        $job->salary = request()->get('salary');
        $job->type = request()->get('type');
        $job->location = request()->get('location');
        $job->category_id = request()->get('category');
        $job->company()->associate($company);

        $job->save();

        $job->skills()->attach(request()->get('skills'));

        $job->load('skills', 'category', 'applications');


        return response()->json([
            'response' => 'ok',
            'data' => $job
        ]);
    
        
    } 


    public function update($token) {
        $validator = Validator::make(request()->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'salary' => 'nullable|numeric',
            'location' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id'
        ]);

        if ($validator->fails()) {
            // Validation failed
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ]);
        }

        $company = Company::where('token', $token)->first();

        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }


        $job = Job::where('id', request()->get('id'))->first();

        if (!$job) {
            return response()->json(['response' => 'Job not found.']);
        }

        $job->title = request()->get('title');
        $job->description = request()->get('description');
        $job->salary = request()->get('salary');
        $job->type = request()->get('type');
        $job->location = request()->get('location');
        $job->category_id = request()->get('category');
        $job->company()->associate($company);

        $job->save();

        $job->skills()->sync(request()->get('skills'));

        $job->load('skills', 'category', 'applications');

        return response()->json([
            'response' => 'ok',
            'data' => $job
        ]);
    }


    public function delete($token, $id) {
        $company = Company::where('token', $token)->first();
        if (!$company) {
            return response()->json(['response' => 'Company not found!']);
        }

        $job = Job::find($id);
        if (!$job) {
            return response()->json(['response' => 'Job not found.']);
        }

        $job->delete();
        return response()->json(['response' => 'ok']);
    }
}


