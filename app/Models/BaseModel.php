<?php

namespace App\Models;

use CacheHelper;

use App\Traits\ExtModel;

use Emadadly\LaravelUuid\Uuids;
use Ramsey\Uuid\Uuid;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class BaseModel extends Model
{

    use Uuids;
    use Notifiable;
    use ExtModel;

    // Encryption of files

    protected $encrypts          = [];

}
