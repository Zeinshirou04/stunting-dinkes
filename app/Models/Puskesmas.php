<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Http;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Puskesmas extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $header = [
        'Accept' => 'application/json',
        'Content-Type' => 'application/json'
    ];

    // protected $apiUrl = 'https://sim.sayanganak.semarangkota.go.id/api/list-puskesmas';
    protected $apiUrl = 'http://119.2.50.170:5500/sayang-anak/api/list-puskesmas';
     
    protected $fillable = [

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function get()
    {
        $data = Http::withHeaders($this->header)->get($this->apiUrl)['data'];
        return $data;
    }
}
