<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        // if(session()->get('status') == 1) {
        //     return redirect()->route('dashboard-home');    
        // }
        
        $data = [
            'title' => 'Robot Lintang - Login',
        ];
        // dd($data);

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

    public function logout()
    {
        $userID = session()->get('id');
        User::where('id', $userID)->update(['status' => 0]);
        User::where('id', $userID)->update(['id_alat' => null]);
        session()->flush();
        return redirect()->route('login');
    }
}