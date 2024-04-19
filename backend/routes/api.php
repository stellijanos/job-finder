<?php

use App\Http\Controllers\AuthController;
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
        Route::post('/logout/{token}',[AuthController::class, 'logout']);
    });

    Route::prefix('user')->group(function() {
        Route::post('/{token}', [UserController::class, 'getUser']);
    });

    
    Route::get('/users', [UserController::class, 'getAll']);
    Route::get('/jobs', [JobController::class, 'getAll']);
    Route::get('/skills', [SkillController::class, 'getAll']);


    Route::fallback(function () {
        return response()->json(['response' => 'Not Found'], 404);
    });
});

