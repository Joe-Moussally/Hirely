<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;

use App\Http\Controllers\OfferController;
use App\Http\Controllers\InterestController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StatController;


Route::middleware(['cors'])->group(function () {
    //JWT apis
    Route::group(['middleware' => 'api'], function($router) {
        Route::post('/register', [JWTController::class, 'register']);
        Route::post('/login', [JWTController::class, 'login']);
        Route::post('/logout', [JWTController::class, 'logout']);
        Route::post('/refresh', [JWTController::class, 'refresh']);
        Route::post('/profile', [JWTController::class, 'profile']);
        Route::post('/cv', [JWTController::class, 'uploadPDF']);
        Route::post('/picture', [JWTController::class, 'uploadPicture']);
        Route::post('/remove_picture', [JWTController::class, 'removePicture']);
        Route::post('/update', [JWTController::class, 'updateProfile']);
    });

    //offer apis
    Route::group(['prefix' => 'offers'], function(){
        Route::post('/',[OfferController::class, 'addOffer']);
        Route::get('/',[OfferController::class, 'getOffers']);
        Route::get('/user',[OfferController::class, 'getUserOffers']);
        Route::post('/delete/{id?}',[OfferController::class, 'deleteOffer']);
        Route::get('/{id?}',[OfferController::class, 'getOfferDetails']);
    });

    //interest apis
    Route::group(['prefix' => 'interests'], function(){
        Route::post('/{id?}',[InterestController::class, 'addInterest']);
        Route::get('/{id?}',[InterestController::class, 'getInterested']);
        Route::get('/user/{id?}',[InterestController::class, 'checkInterest']);
    });

    //chat apis
    Route::group(['prefix' => 'users'], function(){
        Route::get('/{id?}',[ChatController::class, 'getContactInfo']);
    });

    //activities(skills and about) apis
    Route::group(['prefix' => 'activities'], function(){
        Route::post('/{id?}',[SkillController::class, 'addActivities']);
        Route::get('/{id?}',[SkillController::class, 'getActivities']);
    });

    //stat apis
    Route::group(['prefix' => 'stats'], function(){
        Route::post('/increment_login',[StatController::class, 'incrementLogin']);
        Route::post('/increment_signup',[StatController::class, 'incrementSignup']);
    });

    //admin apis
    Route::group(['prefix' => 'admin'], function(){
        Route::group(['middleware' => 'admin'], function(){
            Route::get('/stats',[AdminController::class, 'getStats']);
            Route::get('/users/{name}',[AdminController::class, 'searchUsers']);
        });
    });
});