<?php

namespace App\Http\Controllers\Patient;

use Inertia\Inertia;
use App\Models\Patient;
use App\Models\Puskesmas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;

class ChildController extends Controller
{
    public function __construct()
    {
        if(session()->get('status') != 1) {
            return redirect('/login');    
        }
    }

    public function index(Request $request) {
        // dd($request->all());

        $cryptNik = $request->nik;

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

        foreach($patients as $key => $value) {
            if($value['nik_anak'] == Crypt::decrypt($cryptNik)) {
                $patients[$key]['nik_anak'] = Crypt::decrypt($cryptNik);
                $patients = $patients[$key];
                // dd($patients);
            }
        }

        // dd($patients);

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Detail',
            'nama_user' => session()->get('nama'),
            'cryptNik' => $cryptNik,
            'data' => $patients,
        ];

        // dd($data);

        return Inertia::render('Profile/Dashboard', $data);
    }
}