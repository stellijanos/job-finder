<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    use HasFactory;


    public function jobs(): BelongsToMany {
        return $this->belongsToMany(Job::class, 'job_skills', 'skill_id', 'job_id');
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'user_skills', 'skill_id', 'user_id');
    }

}
