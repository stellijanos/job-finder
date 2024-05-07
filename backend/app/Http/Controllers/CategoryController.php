<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function create() {
        
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:64'
        ]);
    
        if ($validator->fails()) {
            return response()->json(['response' => 'Invalid name']);
        }

        $category = new Category();
        $category->name = request()->get('name');
        $category->save();

        return response()->json(['response' => 'ok', 'data' => $category]);

    }

    public function getAll() {
        return response()->json(Category::all());
    }

    public function getAllWithJobs() {
        return response()->json(Category::with('jobs.skills'));
    }

}
