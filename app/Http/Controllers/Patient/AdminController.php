<?php

namespace App\Http\Controllers\Patient;

use Inertia\Inertia;
use App\Models\Patient;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{
    /**
     * Display the user's profile form.
     */

    public function __construct()
    {
        if(session()->get('status') != 1) {
            return redirect('/login');    
        }
    }

    public function index()
    {

        $patients = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->get('https://sim.sayanganak.semarangkota.go.id/api/stunting');

        // $patient = new Patient();
        // $patients = $patient->getStunting();

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Home',
            'data' => $patients
        ];

        dd($data);

        return Inertia::render('Profile/Dashboard', $data);
    }

    public function data()
    {

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Data'
        ];

        return Inertia::render('Profile/Dashboard', $data);
    }

    public function chat()
    {

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Chat'
        ];

        return Inertia::render('Profile/Dashboard', $data);
    }
}