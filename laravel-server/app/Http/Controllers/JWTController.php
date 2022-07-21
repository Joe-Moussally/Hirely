<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\Skill;

class JWTController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->lng = $request->lng;
        $user->lat = $request->lat;
        $user->number = $request->number;
        $user->city = $request->city;
        $user->save();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,

        ], 201);
    }

    /**
     * login user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Logout user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully logged out.']);
    }

    /**
     * Refresh token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get user profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        return response()->json(auth()->user());
    }

    //function to update user's name, about and skills
    public function updateProfile(Request $Request) {
        $id = Auth::user()->id;

        //delete all user's previous skills and store new ones
        $previous_skills = Skill::where('user_id',$id)->get();
        foreach ($previous_skills as $skill) {
            $skill->delete();
        }

        // insert the new skills
        $skills = json_decode($Request->skills);
        foreach($skills as $skill) {
            $new_skill = new Skill;
            $new_skill->user_id = $id;
            $new_skill->skill = $skill->skill;
            $new_skill->save();
        }

        //update user's name and about
        $user = User::find(Auth::user()->id);
        $user->name = $Request->name;
        $user->about = $Request->about;
        $user->save();
        

        return response()->json([
            'status' => 'updated',
        ],200);
    }


    //function to upload user picture
    public function uploadPicture(Request $Request) {
        $user = User::find(Auth::user()->id);
        $user->picture_base64 = $Request->picture_base64;
        $user->save();

        return response()->json([
            'status' => 'uploaded',
        ],200);
    }

    //function to remove puctire from user's profile
    public function removePicture() {
        $user = User::find(Auth::user()->id);
        $user->picture_base64 = null;
        $user->save();

        return response()->json([
            'status' => 'deleted',
        ],200);
    }

    public function uploadPDF(Request $Request) {
        $user = User::find(Auth::user()->id);
        $user->cv_base64 = $Request->cv_base64;
        $user->save();

        return response()->json([
            'status' => 'uploaded',
        ],200);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}