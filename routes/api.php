<?php

use App\Http\Controllers\API\ShipController;
use App\Http\Controllers\API\ShipDockController;
use App\Http\Controllers\API\ShipExtractController;
use App\Http\Controllers\API\ShipNavigateController;
use App\Http\Controllers\API\ShipOrbitController;
use App\Http\Controllers\API\ShipRefuelController;
use App\Http\Controllers\API\SystemWaypointController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.')->middleware('auth:sanctum')->group(function () {
    Route::resource('systems.waypoints', SystemWaypointController::class)->only([
        'index',
    ]);
    Route::resource('ships', ShipController::class)->only([
        'show',
    ]);
    Route::resource('ships.orbit', ShipOrbitController::class)->only([
        'store',
    ]);
    Route::resource('ships.dock', ShipDockController::class)->only([
        'store',
    ]);
    Route::resource('ships.navigate', ShipNavigateController::class)->only([
        'store',
    ]);
    Route::resource('ships.refuel', ShipRefuelController::class)->only([
        'store',
    ]);
    Route::resource('ships.extract', ShipExtractController::class)->only([
        'store',
    ]);
});
