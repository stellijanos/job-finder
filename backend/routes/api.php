<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\SetResponseHeader;
use Illuminate\Http\Request;
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


    
    Route::get('/jobs', [JobController::class, 'getAll']);
    Route::get('/skills', [SkillController::class, 'getAll']);
    Route::get('/companies', [CompanyController::class, 'getAll']);

    Route::any('{any}', fn() => response()->json(['response' => 'Bad request'], 400))->where('any', '.*');

});



