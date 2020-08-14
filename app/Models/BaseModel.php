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

    // Returns the possible validations if available
    public function getValidations($uuid = null)
    {
        $validations = [];
        if (isset($this->validations) === true)
              {
              $validations =  $this->validations;
              }

        if (sizeOf($validations) > 0)
              {
              foreach ($validations as $key => $value) {
                  if ($uuid === null)
                        {
                        $validations[$key] = str_replace('uuid:%UUID%','',$value);
                        }
                  else  {
                        $validations[$key] = str_replace('%UUID%',$uuid, $value);
                        }
              }
              }
        return [];
    }

}
