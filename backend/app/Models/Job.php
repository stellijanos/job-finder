<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    use HasFactory;

    public function company():BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function category():BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function skills(): HasMany {
        return $this->hasMany(Skill::class);
    }

    public function applications(): HasMany {
        return $this->hasMany(Application::class);
    }

}
