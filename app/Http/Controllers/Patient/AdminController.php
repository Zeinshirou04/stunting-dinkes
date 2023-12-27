<?php

namespace App\Http\Controllers\Patient;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Realtime;
use App\Models\Puskesmas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

class AdminController extends Controller
{
    /**
     * Display the user's profile form.
     */

    private $patient;
    private $puskesmas;

    public function __construct()
    {
        $this->patient = new Patient();
        $this->puskesmas = new Puskesmas();

        if(session()->get('status') != 1) {
            // dd('Anda tidak memiliki akses');
            return Inertia::location(route('login'));
        }
    }

    public function index()
    {

        $puskesmas = array_filter($this->puskesmas->get(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode'] == $kode_puskesmas;
        })[1];

        // dd($patient->getStunting());

        $patients = array_filter($this->patient->getStunting(), function ($item) use ($puskesmas) {
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
        $puskesmas = array_filter($this->puskesmas->get(), function ($item) {
            $kode_puskesmas = session()->get('kode_puskesmas');
            return $item['kode'] == $kode_puskesmas;
        })[1];

        // dd($patient->getStunting());

        $patients = array_filter($this->patient->getStunting(), function ($item) use ($puskesmas) {
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

    public function device()
    {
        $deviceID = User::where('id', session()->get('id'))->first()->id_alat == null ? null : User::where('id', session()->get('id'))->first()->id_alat;
        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Device',
            'id_alat' => $deviceID,
        ];

        return Inertia::render('Profile/Dashboard', $data);
    }
    
    public function connect(Request $request) {
        $deviceID = $request->input('deviceID');
        $userID = session()->get('id');
        // dd($deviceID);
        User::where('id', $userID)->update(['id_alat' => $deviceID]);
        return redirect()->route('dashboard-device');
    }

    public function disconnect(Request $request) {
        $userID = session()->get('id');
        // dd($deviceID);
        User::where('id', $userID)->update(['id_alat' => null]);
        return redirect()->route('dashboard-device');
    }

    public function getall() {
        $realtime = new Realtime();
        $data = $realtime->get()->latest()->first();
        dd($data);
    }
}