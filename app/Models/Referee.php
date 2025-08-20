<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Referee extends Model
{
    /** @use HasFactory<\Database\Factories\RefereeFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'category'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
