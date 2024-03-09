<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Agent extends Model
{
    use HasFactory;

    protected $hidden = [
        'user_id', 'token',
    ];

    public function getRouteKeyName()
    {
        return 'symbol';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function activeUser(): HasOne
    {
        return $this->hasOne(User::class, 'active_agent_id');
    }
}
