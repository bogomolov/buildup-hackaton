<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RenderResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'render_query_id',
        'model',
        'preview',
        'comment'
    ];
}
