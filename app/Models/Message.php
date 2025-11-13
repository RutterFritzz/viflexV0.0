<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:d-m-Y H:i'
        ];
    }

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
