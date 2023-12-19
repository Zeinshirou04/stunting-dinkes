<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function __construct() 
    {
        // dd(Auth::check());
        // if(Auth::check()) {
        //     return Inertia::render('Dashboard');
        // }
    }

    public function index()
    {
        $data = [
            'title' => 'Robot Lintang - Login',
        ];

        return Inertia::render('LoginPage', $data);
    }

    public function authenticate(Request $request)
    {
        // Check Credentials
        $request->validate([
            'Username' => ['required'],
            'Password' => ['required'],
        ]);

        $name = $request->input('Username');
        $pass = $request->input('Password');

        if(User::where('username', $name)->exists()){
            $user = User::where('username', $name)->first();
            User::where('id', $user->id)->update(['lastLogin' => Carbon::now(), 'status' => 1]);
            if($user->sandi == $pass){
                $session = [
                    'id' => $user->id,
                    'nama' => $user->nama,
                    'username' => $user->username,
                    'status' => $user->status,
                    'idRole' => $user->idRole,
                    'kode_puskesmas' => $user->kode_puskesmas,
                    'lastLogin' => Carbon::now(),
                ];
                session($session);
                return redirect()->route('dashboard-home');
            }else{
                return redirect()->route('login')->with('error', 'Password Salah');
            }
        }
    }
}