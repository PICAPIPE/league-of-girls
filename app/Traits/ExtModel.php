<?php

namespace App\Traits;

use DB;
use Validator;

use ValidationHelper;
use Illuminate\Http\Request;
use Emadadly\LaravelUuid\Uuids;
use Ramsey\Uuid\Uuid;

trait ExtModel
{

    /***
    ** Get validations settings
    **/

    public function getValidationFields($add = []){

        $validations = [];

        if(isset($this->validations) === true){
           $validations =  $this->validations;
        }

        $validations = array_merge($validations,$add);

        return $validations;

    }

    /***
    ** Do the standard validations
    **/

    public function validate($data,$add = []){

        $validations = $this->getValidationFields($add);

        return Validator::make($data, $validations,ValidationHelper::getMessages());

    }
    
    /**
    ** Extract from the header fields which can be accessed
    **/

    public function getRequestFields(Request $request){

        $result = [];
        $fields = $request->input('fields');

        if($fields !== null){
          $fields = explode(',',$fields);
        }

        $data = collect($fields)->filter(function($item){
            $result = $item;
            if(in_array($item,$this->getFillable()) === false){
                $result = null;
            }
            if(in_array($item,$this->getHidden()) === true){
                $result = null;
            }
            if($result !== null){
              return $result;
            }
        });

        if(collect($fields)->count() === 0 || $data->count() === 0){
          return null;
        }

        $result = $data->toArray();

        if(in_array('id',$result) === false){
          $result[] = 'id';
        }

        return $result;

    }

}
