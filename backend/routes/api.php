<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware([CorsMiddleware::class])->group(function() {

    Route::prefix('auth')->group(function() {
        
        Route::post('/register-user', [AuthController::class,'registerUser']);
        Route::post('/register-company', [AuthController::class,'registerCompany']);
        Route::post('/login', [AuthController::class,'login']);

        Route::get('/logout/{token}',[AuthController::class, 'logout']);
        Route::get('/is-logged-in/{token}',[AuthController::class, 'isLoggedIn']);
    });


    Route::get('/users', [UserController::class, 'getAllWithSkills']);
    Route::prefix('user')->group(function() {

        Route::get('/id/{id}', [UserController::class, 'getById']);

        Route::get('/token/{token}', [UserController::class, 'getByToken']);
        Route::put('/token/{token}', [UserController::class, 'updateByToken']);
        Route::patch('/token/{token}', [UserController::class, 'changePassword']);
        Route::delete('/token/{token}/{password}', [UserController::class, 'deleteByToken']);
        
    });

    Route::get('/companies', [CompanyController::class, 'getAllWithJobs']);
    Route::prefix('company')->group(function() {
        
        Route::get('/id/{id}', [CompanyController::class, 'getById']);

        Route::get('/token/{token}', [CompanyController::class, 'getByToken']);
        Route::put('/token/{token}', [CompanyController::class, 'updateByToken']);
        Route::patch('/token/{token}', [CompanyController::class, 'changePassword']);
        Route::delete('/token/{token}/{password}', [CompanyController::class, 'deleteByToken']);

        Route::post('/{token}/job', [JobController::class, 'create']);
        Route::put('/{token}/job', [JobController::class, 'update']);
        Route::delete('/{token}/job/{id}', [JobController::class, 'delete']);

    });

    Route::get('/jobs', [JobController::class, 'getAll']);
   

    Route::post('/skill', [SkillController::class, 'create']);
    Route::post('/category', [CategoryController::class, 'create']);


    Route::get('/skills', [SkillController::class, 'getAll']);
    Route::get('/categories', [CategoryController::class, 'getAll']);


    Route::prefix('concurrencies')->group(function() {
        Route::get('/lost-update', [CategoryController::class, 'updateCategoryNameTwice']);
        Route::get('/dirty-read', [CategoryController::class, 'readUncommittedCategoryName']);
        Route::get('/incorrect-summary', [CategoryController::class, 'calculateTotalNumberOfCategories']);
        Route::get('/unrepeatable-read', [CategoryController::class, 'demonstrateUnrepeatableRead']);
        Route::get('/phantom-read', [CategoryController::class, 'demonstratePhantomRead']);
    });


    Route::any('{any}', fn() => response()->json(['response' => 'Bad request'], 400))->where('any', '.*');

});

