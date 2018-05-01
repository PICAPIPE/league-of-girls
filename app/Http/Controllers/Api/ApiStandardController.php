<?php

namespace App\Http\Controllers\Api;

use DB;
use Carbon\Carbon;

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

          $fields          = data_get($map,'fields',['uuid']);
          $getModelData    = data_get($map,'getData', null);
          $pagination      = false;
          $perSite         = data_get($map,'perSite', config('api.perSite',50));

          $mdClass         = new $md();

          $sortDirection   = data_get($map,'sortDirection','ASC');
          $sortBy          = data_get($map,'sortBy',       'id');

          $allowQueries    = data_get($map,'allowQueries', true);
          $roles           = data_get($map,'roles',        null);

          if($roles !== null)
            {
                $allowed         = $this->checkPermission($request,$roles);
            }

          if($allowed !== null)
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
                    $modelData = $this->$getModelData($md,$request,$uuid);
                }
          else  {
                    $modelData = $md::where('id','>',0);
                }

          if(in_array('published',$mdClass->getFillable()) === true)
            {
                $modelData = $modelData->where('published',true);
            }

          $modelData = $modelData->select($fields);

          $modelData = $modelData->orderBy($this->validateSortByField($sortBy,$mdClass),$sortDirection);

          // Check if the mode required a pagination

          if    ($pagination === true)
                {
                    $modelData  = $modelData->paginate($perSite);
                    return $this->respondSuccess($modelData->toArray());
                }
          else  {
                    $modelData  = $modelData->get();
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

          $modelData       = $md::where('uuid',$uuid)->select($fields)->first();

          if($modelData !== null)
            {
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

          collect($request->all())->each(function($item,$key) use ($mdClass,&$data){

              if(in_array($key,$mdClass->getFillable()) === true)
                {
                   $data[$key] = $item;
                }

          });

          if($modelData !== null)
            {

                $response = DB::transaction(function () use ($request){

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

            collect($request->all())->each(function($item,$key) use ($mdClass,&$data){

                if(in_array($key,$mdClass->getFillable()) === true)
                  {
                     $data[$key] = $item;
                  }

            });

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
