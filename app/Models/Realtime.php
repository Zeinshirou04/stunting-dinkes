<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Realtime extends Model
{
    use HasFactory;

    protected $table = 'realtime';
    protected $primaryKey = 'id';
    
    protected $fillable =[
        'sensor_1',
        'sensor_2',
        'idtimbangan',
        'posis'
    ];
}
