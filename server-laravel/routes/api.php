<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\RenderQueryController;
use App\Http\Controllers\RenderResultController;
use App\Http\Controllers\OverpassQueryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [ApiAuthController::class, 'login']);

Route::post('/getarray', [RenderQueryController::class, 'query']);

Route::resource('renderquery', RenderQueryController::class);
Route::resource('renderresult', RenderResultController::class);
Route::resource('overpassquery', OverpassQueryController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
