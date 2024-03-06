<?php

namespace App\Http\Controllers\Patient;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Patient;
use App\Models\zScores;
use App\Models\Puskesmas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;
use GuzzleHttp\Promise\AggregateException;

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
        });
        
        // dd($patient->getStunting());
        
        $patients = array_filter($patient->getStunting(), function ($item) use ($puskesmas) {
            return $item['puskesmas'] == array_column($puskesmas, 'nama')[0];
        });
        
        foreach($patients as $key => $value) {
            if($value['nik_anak'] == Crypt::decrypt($cryptNik)) {
                $patients[$key]['nik_anak'] = Crypt::decrypt($cryptNik);
                $patients = $patients[$key];
            }
        }
        
        $kelamin = $patients['jenis_kelamin'] == 'L' ? 'laki' : 'perempuan';
        $jenis = 'bbu';
        $tanggal_lahir = $patients['tanggal_lahir'];
        
        $birthDate = Carbon::parse($tanggal_lahir);
        $now = Carbon::now();
        $ageInDays = $birthDate->diffInDays($now);

        // dd($jenis);

        $zScores = new zScores();
        // dd($zScores->where('Day', $ageInDays)->get());

        $deviceID = User::where('id', session()->get('id'))->first()->id_alat == null ? null : User::where('id', session()->get('id'))->first()->id_alat;

        $data = [
            'title' => 'Robot Lintang - Dashboard',
            'view' => 'Detail',
            'nama_user' => session()->get('nama'),
            'cryptNik' => $cryptNik,
            'data' => $patients,
            'zScores' => $zScores->where('Day', $ageInDays)->get(),
            'url' => url(''),
            'id_alat' => $deviceID,
        ];

        // dd($data);

        return Inertia::render('Profile/Dashboard', $data);
    }

    public function measure(Request $request) {

        $deviceID = User::where('id', session()->get('id'))->first()->id_alat == null ? null : User::where('id', session()->get('id'))->first()->id_alat;

        $data = [
            // "lokasi_ukur"=> $deviceID,
            "lokasi_ukur" => "3374KD16P03101",
            "tanggal_ukur"=> Carbon::now()->format('d-m-Y'),
            "kode_anak"=> $request->kodeAnak,
            // "kode_anak" => "405240222705174992",
            "bb"=> $request->beratBadan,
            "tb"=> $request->tinggiBadan,
            "lila"=> "1",
            "lingkar_kepala"=> "1",
            "bb_tb"=> "None",
            "bb_u"=> "None",
            "tb_u"=> $request->tbu,
            "zs_bbu"=> 0,
            "zs_tbu"=> floatval($request->zs_tbu),
            "zs_bbtb"=> 0,
            "cara_ukur"=> $request->posisi,
            "pola_asuh"=> "Ortu",
            "vitamin_a"=> "Ya",
            "asi_eksklusif"=>"Ya"
        ]; 

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        ])->post('http://119.2.50.170:5500/sayang-anak/api/pengukuran', $data);

        // dd($response->json());
        $response;
        // dd($data);

        return redirect()->route('dashboard-home');
    }
}