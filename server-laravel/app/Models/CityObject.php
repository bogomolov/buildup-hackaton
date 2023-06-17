<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CityObject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'type',
        'levels',
        'latitude',
        'longitude',
        'planning'
    ];
}
