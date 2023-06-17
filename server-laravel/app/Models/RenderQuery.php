<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RenderQuery extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'box_coords',
        'filters',
        'status'
    ];
}
