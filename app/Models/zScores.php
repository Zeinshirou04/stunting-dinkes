<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class zScores extends Model
{
    use HasFactory;

    protected $table = "laki_z_scores_tbu";

    // public static function withGenderAndType($gender, $type)
    // {
    //     $instance = new self();

    //     if($type == 'tbu') {
    //         if($gender == 'laki') $instance->table = "laki_z_scores_tbu";
    //         if($gender == 'perempuan') $instance->table = "perempuan_z_scores_tbu";
    //     } else if($type == 'bbu') {
    //         if($gender == 'laki') $instance->table = "laki_z_scores_bbu";
    //         if($gender == 'perempuan') $instance->table = "perempuan_z_scores_bbu";
    //     } else if($type == 'bbtb') {
    //         if($gender == 'laki') $instance->table = "laki_z_scores_bbtb";
    //         if($gender == 'perempuan') $instance->table = "perempuan_z_scores_bbtb";
    //     }

    //     return $instance;
    // }
}

