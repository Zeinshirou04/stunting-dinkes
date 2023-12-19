<?php

namespace App\Http\Controllers\Patient;

use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Puskesmas;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
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
        $patient = new Patient();
        $patients = array_filter($patient->getStunting(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode_puskesmas'] == $kode_puskesmas;
        });

        $puskesmas = new Puskesmas();
        $puskesmas = array_filter($puskesmas->get(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode'] == $kode_puskesmas;
        });

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Home',
            'nama_user' => session()->get('nama'),
            'data' => $patients,
            'data_view' => collect($patients)->sortBy('nama')->take(5)->toArray(),
            'puskesmas' => $puskesmas[1]['nama'],
        ];

        // dd($data);

        return Inertia::render('Profile/Dashboard', $data);
    }

    public function data()
    {
        $patient = new Patient();
        $patients = array_filter($patient->getStunting(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode_puskesmas'] == $kode_puskesmas;
        });

        foreach($patients as $key => $value) {
            $patients[$key]['nik_anak'] = Crypt::encrypt($value['nik_anak']);
        }

        // dd($patients);

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Data',
            'nama_user' => session()->get('nama'),
            'data' => $patients,
        ];

        // dd($data);

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