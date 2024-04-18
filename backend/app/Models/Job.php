<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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

    public function skills(): BelongsToMany {
        return $this->belongsToMany(Skill::class, 'job_skills', 'job_id', 'skill_id')->select('name');
    }

    public function applications(): BelongsToMany {
        return $this->belongsToMany(User::class, 'applications', 'job_id', 'user_id');
    }


}
