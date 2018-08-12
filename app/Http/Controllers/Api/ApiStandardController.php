<?php

namespace App\Http\Controllers\Api;

use DB;
use Carbon\Carbon;
use Validation;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ApiController;

class ApiStandardController extends ApiController
{

      public function all(Request $request)
      {
          $result = $this->getData($request,'all');

          if($result !== null)
            {
               return $result;
            }

          return $this->respondBadRequest();
      }

      public function index(Request $request)
      {
          $result = $this->getData($request,'index');

          if($result !== null)
            {
               return $result;
            }

          return $this->respondBadRequest();
      }

      /***
      ** The helper method for getting the data
      ***/

      protected function getData(Request $request,$mode = 'index')
      {

          if($this->isAvailable($request) === false)
          {
              return $this->respondNotAllowed();
          }

          $allowed         = null;

          $map             = $this->getMap($this->getName($request));
          $md              = $this->getModel($map);

          $with            = data_get($map,'with',[]);
          $fields          = data_get($map,'fields',['uuid']);
          $getModelData    = data_get($map,'getData', null);
          $ignorePublish   = data_get($map,'ignorePublish', false);
          $pagination      = false;
          $perSite         = data_get($map,'perSite', config('api.perSite',50));

          $mdClass         = new $md();

          $sortDirection   = data_get($map,'sortDirection','ASC');
          $sortBy          = data_get($map,'sortBy',       'id');

          $searchIn        = data_get($map,'searchIn',     null);

          $allowQueries    = data_get($map,'allowQueries', true);
          $roles           = data_get($map,'roles',        null);
          $wheres          = data_get($map,'wheres',       []);
          $hidden          = data_get($map,'hidden',       []);
          $postDataFns     = data_get($map,'postDataGet',  []);
          $postMapFn       = data_get($map,'postMap',[]);

          if($roles !== null)
            {
                $allowed         = $this->checkPermission($request,$roles);
            }

          if($allowed !== null && $allowed !== true)
            {
               return $this->respondForbidden();
            }

          if($allowQueries === true)
            {

                if($request->input('sortBy') !== null)
                  {
                     $sortBy = $request->input('sortBy');
                  }

                if($request->input('sortDirection') !== null)
                  {
                     $sortDirection = $request->input('sortDirection');
                  }

            }

          switch ($mode) {
            case 'all':

              // List of entries

              $pagination = data_get($map,'pagination', false);

              break;

            default:

              // Standard

              $pagination = data_get($map,'pagination', true);

              break;
          }

          if(empty($fields) === true)
            {
               $fields = config('api.fields', $mdClass->getFillable());
            }

          if    ($getModelData !== null && method_exists($this,$getModelData))
                {
                    $modelData = $this->$getModelData($md,$request);
                }
          else  {
                    $modelData = $md::where('id','>',0);
                }

          if ($request->input('search') !== null && $searchIn !== null)
                {
                $modelData = $modelData->where($searchIn,'LIKE', '%' . strtolower($request->input('search')) . '%');
                }

          if(in_array('published',$mdClass->getFillable()) === true && $ignorePublish === false)
                {
                    $modelData = $modelData->where('published',true);
                }

          $modelData = $modelData->select($fields);

          $modelData = $modelData->orderBy($this->validateSortByField($sortBy,$mdClass),$sortDirection);

          if(empty($with) === false)
          {
             foreach ($with as $kW => $value) {
                $modelData = $modelData->with($value);
             }
          }

          // Additional WHERE-Statement

          if(empty($wheres) === false)
          {

              foreach ($wheres as $k => $where) {
                 $modelData = $this->$where($request,$modelData);
              }

          }

          foreach ($postDataFns as $key => $value) {

              if($$key !== null && method_exists($this,$value))
                {
                    $$key = $this->$value($modelData,$request);
                }

          }

          // Check if the mode required a pagination

          if    ($pagination === true)
                {
                    $modelData  = $modelData->paginate($perSite);
                    $data       = $modelData;
                    $result     = $modelData->makeHidden($hidden);
                    $data->data = $result;

                    foreach ($postMapFn as $key => $value)
                    {
                        if(method_exists($this,$value))
                          {
                               $data->data = $this->$value($data->data,$request);
                          }
                    }

                    return $this->respondSuccess($data->toArray());
                }
          else  {
                    $modelData  = $modelData->get();
                    $modelData = $modelData->makeHidden($hidden);

                    foreach ($postMapFn as $key => $value)
                    {
                        if(method_exists($this,$value))
                          {
                               $modelData = $this->$value($modelData,$request);
                          }
                    }

                    return $this->respondSuccess(['data' => $modelData->toArray()]);
                }

      }

      // Show an entry

      public function show(Request $request, $uuid)
      {
          if($this->isAvailable($request) === false)
          {
              return $this->respondNotAllowed();
          }

          $map             = $this->getMap($this->getName($request));
          $md              = $this->getModel($map);

          $mdClass         = new $md();
          $fields          = data_get($map,'fields', $mdClass->getFillable());
          $with            = data_get($map,'with',   []);
          $hidden          = data_get($map,'hidden', []);
          $postDataFns     = data_get($map,'postDataGet',[]);
          $postMapFn       = data_get($map,'postMap',[]);

          $modelData       = $md::where('uuid',$uuid)->select($fields);

          foreach ($with as $key => $value) {
              $modelData = $modelData->with($value);
          }

          // Additional WHERE-Statement

          if(empty($wheres) === false)
          {
              foreach ($wheres as $k => $where) {
                 $modelData = $this->$where($request,$modelData);
              }
          }

          $modelData       = $modelData->first();

          foreach ($postDataFns as $key => $value) {

              if($$key !== null && method_exists($this,$value))
                {
                    $$key = $this->$value($modelData,$request);
                }

          }

          $modelData       = $modelData->makeHidden($hidden);

          if($modelData !== null)
            {

               foreach ($postMapFn as $key => $value)
               {
                   if(method_exists($this,$value))
                     {
                          $modelData = $this->$value($modelData,$request);
                     }
               }

               return $this->respondSuccess(['data' => $modelData->toArray()]);
            }

          return $this->respondNotFound();
      }

      // Update an entry

      public function update(Request $request, $uuid)
      {
          if($this->isAvailable($request) === false)
          {
              return $this->respondNotAllowed();
          }

          $map             = $this->getMap($this->getName($request));
          $md              = $this->getModel($map);

          $mdClass         = new $md();
          $fields          = data_get($map,'fields', $mdClass->getFillable());

          $modelData       = $md::where('uuid',$uuid)->select($fields)->first();

          $data            = [];

          $roles           = data_get($map,'roles',        null);

          if($roles !== null)
            {
                $allowed         = $this->checkPermission($request,$roles);
            }

          if($allowed !== null && $allowed !== true && $roles !== null)
            {
               return $this->respondForbidden();
            }

          collect($request->all())->each(function($item,$key) use ($mdClass,&$data){

              if(in_array($key,$mdClass->getFillable()) === true)
                {
                   $data[$key] = $item;
                }

          });

          $validations = $mdClass->getValidations();

          if (sizeOf($validations)  > 0 )
               {
               $validatedData = $request->validate($validations);
               }

          if($modelData !== null)
            {

                $response = DB::transaction(function () use ($request,$modelData,$data){

                                  $success = $modelData->update($data);

                                  if($success === true)
                                    {
                                       return $this->respondSuccess(['data' => $modelData->toArray()]);
                                    }

                                  return null;

                              });

                  if($response !== null)
                     {
                        return $response;
                     }

            }

          return $this->respondBadRequest();
      }

      // Destroy an entry

      public function destroy(Request $request, $uuid)
      {
          if($this->isAvailable($request) === false)
          {
              return $this->respondNotAllowed();
          }

          $roles           = data_get($map,'roles',        null);

          if($roles !== null)
            {
                $allowed         = $this->checkPermission($request,$roles);
            }

          if($allowed !== null && $allowed !== true && $roles !== null)
            {
               return $this->respondForbidden();
            }

          $success = DB::transaction(function () use ($request,$uuid){

                          $map             = $this->getMap($this->getName($request));
                          $md              = $this->getModel($map);

                          $mdClass         = new $md();
                          $fields          = data_get($map,'fields', $mdClass->getFillable());

                          $modelData       = $md::where('uuid',$uuid)->select($fields)->first();

                          if($modelData !== null)
                            {
                                $success = $modelData->delete();
                                return $success;
                            }

                      });

          if($success === true)
            {
               return $this->respondSuccess(['data' => ['deleted' => $uuid]]);
            }

          return $this->respondBadRequest();
      }

      // Create an entry

      public function store(Request $request)
      {

            if($this->isAvailable($request) === false)
            {
                return $this->respondNotAllowed();
            }


            $map             = $this->getMap($this->getName($request));
            $md              = $this->getModel($map);

            $mdClass         = new $md();
            $fields          = data_get($map,'fields', $mdClass->getFillable());

            $data            = [];

            $roles           = data_get($map,'roles',        null);

            if($roles !== null)
              {
                  $allowed         = $this->checkPermission($request,$roles);
              }

            if($allowed !== null && $allowed !== true && $roles !== null)
              {
                 return $this->respondForbidden();
              }

            collect($request->all())->each(function($item,$key) use ($mdClass,&$data){

                if(in_array($key,$mdClass->getFillable()) === true)
                  {
                     $data[$key] = $item;
                  }

            });

            $validations = $mdClass->getValidations();

            if (sizeOf($validations)  > 0 )
                 {
                 $validatedData = $request->validate($validations);
                 }

            $response = DB::transaction(function () use ($request,$data,$md){

                            $result = $md::create($data);

                            if($result !== null)
                              {
                                    return $this->respondSuccess(['data' => $result->toArray()]);
                              }

                            return null;

                        });

            if($response !== null)
              {
                  return $response;
              }

            return $this->respondBadRequest();

      }

}
