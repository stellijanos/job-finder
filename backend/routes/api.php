<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register-user', [AuthController::class,'registerUser']);
Route::post('/register-company', [AuthController::class,'registerCompany']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/isLoggedIn/{token}', [AuthController::class, 'isLoggedIn']);
Route::post('/logout/{token}',[AuthController::class, 'logout']);

Route::get('/users', [UserController::class, 'getAll']);


