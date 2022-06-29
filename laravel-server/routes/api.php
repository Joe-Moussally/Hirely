<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;

use App\Http\Controllers\OfferController;
use App\Http\Controllers\InterestController;

Route::middleware(['cors'])->group(function () {
//JWT apis
Route::group(['middleware' => 'api'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
});

//offer apis
Route::group(['prefix' => 'offers'], function(){
    Route::post('/',[OfferController::class, 'addOffer']);
    Route::get('/',[OfferController::class, 'getOffers']);
    Route::post('/delete/{id?}',[OfferController::class, 'deleteOffer']);
    Route::get('/{id?}',[OfferController::class, 'getOfferDetails']);
});

//interest apis
Route::group(['prefix' => 'interests'], function(){
    Route::post('/{id?}',[InterestController::class, 'addInterest']);
    Route::get('/{id?}',[InterestController::class, 'getInterested']);
});
});