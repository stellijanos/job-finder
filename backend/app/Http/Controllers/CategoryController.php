<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\DB;
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




    // lost update problem
    public function updateCategoryNameTwice($id, $newName1, $newName2) {
        DB::transaction(function () use ($id, $newName1, $newName2) {
            $category = Category::findOrFail($id);
            $category->update(['name' => $newName1]);
            sleep(1);
            $category->update(['name' => $newName2]);
        });
    }

    // temporary update problem (dirty read) 

    public function readUncommittedCategoryName($id) {
        DB::beginTransaction();
        DB::statement("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED");
        $name = Category::findOrFail($id)->name;
        DB::commit();
        return $name;
    }

    // incorrect summary problem
    public function calculateTotalNumberOfCategories() {
        DB::transaction(function () {
            $count = Category::count();
            sleep(2); 
            echo "Count of categories: $count";
        });
    }


    // unrepeatable read problem
    public function demonstrateUnrepeatableRead($id) {
        DB::transaction(function () use ($id) {
            $name1 = Category::findOrFail($id)->name;
            sleep(2); // Simulate time delay for external update
            $name2 = Category::findOrFail($id)->name;
            echo "First read: $name1, Second read: $name2";
        }, 3); // 3 is the isolation level for READ COMMITTED in Laravel
    }


    // phantom read problem
    public function demonstratePhantomRead() {
        DB::transaction(function () {
            $firstRead = Category::all()->count();
            sleep(2);
            $secondRead = Category::all()->count();
            echo "First read count: $firstRead, Second read count: $secondRead";
        }, 4); // 4 is the isolation level for REPEATABLE READ in Laravel
    }

}

