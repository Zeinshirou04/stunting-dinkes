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
            // dd('Anda tidak memiliki akses');
            return Inertia::location(route('login'));
        }
    }

    public function index()
    {
        $patient = new Patient();
        $puskesmas = new Puskesmas();

        $puskesmas = array_filter($puskesmas->get(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode'] == $kode_puskesmas;
        })[1];

        // dd($patient->getStunting());

        $patients = array_filter($patient->getStunting(), function ($item) use ($puskesmas) {
            return $item['puskesmas'] == $puskesmas['nama'];
        });
        
        // dd($patients);
        
        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Home',
            'nama_user' => session()->get('nama'),
            'data' => $patients,
            'data_view' => collect($patients)->sortBy('nama')->take(5)->toArray(),
            'puskesmas' => $puskesmas['nama'],
        ];
        
        // dd($data);
        
        return Inertia::render('Profile/Dashboard', $data);
    }
    
    public function data()
    {
        $patient = new Patient();
        
        $puskesmas = new Puskesmas();

        $puskesmas = array_filter($puskesmas->get(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode'] == $kode_puskesmas;
        })[1];

        // dd($patient->getStunting());

        $patients = array_filter($patient->getStunting(), function ($item) use ($puskesmas) {
            return $item['puskesmas'] == $puskesmas['nama'];
        });

        // $patients = $patient->getStunting();

        // dd($patients);

        // dd($patients);

        foreach($patients as $key => $value) {
            $patients[$key]['nik_anak'] = Crypt::encrypt($value['nik_anak']);
        }

        $patients = array_values($patients);
        // dd($arrayPatients);
        // dd($patients);

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