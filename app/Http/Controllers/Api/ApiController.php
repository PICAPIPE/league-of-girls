<?php

namespace App\Http\Controllers\Api;

use App;
use File;
use Image;
use LaravelGettext;

use SecurityHelper;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as Response;
use \Illuminate\Http\Response as IlluminateResponse;


class ApiController extends Controller
{
    protected $statusCode;
    protected $returnFormat = 'application/json';
    protected $download     = false;
    protected $fingerprint  = null;
    protected $user         = null;

    public function __construct(Request $request){

        $this->setReturnFormat(optional($request)->header('Accept'));


        $this->download     = (optional($request)->input('download') === 'true');
        $this->fingerprint  = null;
        $this->user         = optional($request)->user;

        if(method_exists($this,'fingerprint') === true)
          {
                $this->fingerprint  = optional($request)->fingerprint();
          }

    }

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param mixed $statusCode
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getReturnFormat()
    {
        return $this->returnFormat;
    }

    /**
     * @param mixed $returnFormat
     */
    public function setReturnFormat($returnFormat)
    {
        $this->returnFormat = $returnFormat;
        return $this;
    }

    public function respond($data = [], $headers = [], $cookieName = null, $cookieValue = null){

        if(config('app.gzip')       === true         &&
           App::environment()       !== 'development'&&
           App::environment()       !== 'testing')
          {
              if    (!in_array('ob_gzhandler', ob_list_handlers()))
                    {
                      ob_start('ob_gzhandler');
                    }
              else  {
                      ob_start();
                    }
          }

        $data['status']         = $this->getStatusCode();
        $data['url']            = url()->full();

        if(isset($data['language']) === false){
            $data['language'] = LaravelGettext::getLocale();
        }

        $headers['Access-Control-Allow-Origin']     = '*';
        $headers['Access-Control-Allow-Methods']    = 'GET, POST, PUT, DELETE, OPTIONS';
        $headers['Access-Control-Max-Age']          = '1000';
        $headers['Access-Control-Allow-Headers']    = '*';

        $result                                     = null;
        $macroname                                  = 'json';

        switch($this->getReturnFormat()){

            case 'text/xml':
            case 'application/xml':
              $headers['Content-Type'] = $this->getReturnFormat();
              $macroname               = 'xml';
              break;

            default:
              $macroname               = 'json';
              break;

        }

        if($cookieName !== null && $cookieValue !== null){

            $result              = \Response::$macroname($data,$this->getStatusCode(),$headers)->cookie($cookieName, $cookieValue, 5, '/',config('app.domain'), false, true);

        }
        else {

            $result                  = \Response::$macroname($data,$this->getStatusCode(),$headers);

        }

        if($this->download === true){

            $path   = storage_path('app/tmp/'.$this->fingerprint.'.'.$macroname);
            File::put($path,$result->content());

            return response()->download($path)->deleteFileAfterSend(true);

        }

        return $result;

    }

    public function respondSuccess($data=array(),$header = [],$cookieName = null,$cookieValue = null){
        return $this->setStatusCode(IlluminateResponse::HTTP_OK)->respond($data,$header,$cookieName,$cookieValue);
    }

    public function respondAccepted($data=array()){
        return $this->setStatusCode(IlluminateResponse::HTTP_ACCEPTED)->respond($data);
    }

    public function respondNotFound($message = null){

        if($message === null){
            $message = _i('Nicht gefunden!');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_NOT_FOUND)->respond(array(
            'message' => $message
        ));
    }

    public function respondWithErrors($message= null,$internalCode = 0){

        if($message === null){
            $message =  _i('Ein Fehler ist aufgetreten');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_BAD_REQUEST)->respond(array(
            'message'=> $message,
            'code'   => $internalCode
        ));
    }

    public function respondInternalError($message = null){

        if($message === null){
            $message =  _i('Ein interner Fehler ist aufgetreten');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_INTERNAL_SERVER_ERROR)->respond(array(
            'message'=> $message
        ));
    }

    public function respondUnauthorized($message = null){

        if($message === null){
            $message =  _i('Sie sind nicht berechtigt diese Aktion durchzuführen.');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_UNAUTHORIZED)->respond(array(
            'message'=> $message
        ));
    }

    public function respondForbidden($message = null){

        if($message === null){
            $message =  _i('Sie haben nicht genügend Berechtigungen diese Aktion durchzuführen');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_FORBIDDEN)->respond(array(
            'message'=> $message
        ));
    }

    public function respondNotAllowed($message = null){

        if($message === null){
            $message =  _i('Diese API-Anfrage ist nicht erlaubt');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_METHOD_NOT_ALLOWED)->respond(array(
            'message'=> $message
        ));

    }

    public function respondUnproccessable($error = null,$message = null){

        if($message === null){
            $message = _i('Es ist ein Fehler bei der Überprüfung der Felder aufgetreten. Bitte überprüfen Sie Ihre Eingaben.');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_UNPROCESSABLE_ENTITY)->respond(array(
            'message'   => $message,
            'errors'    => $error
        ));
    }

    public function respondBadRequest($message = null, $internalCode = 0){

        if($message === null){
            $message = _i('Die gewünschte Aktion konnte nicht abgeschlossen werden, da ein Fehler aufgetreten ist.');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_BAD_REQUEST)->respond(array(
            'message'=> $message,
            'code'   => $internalCode
        ));
    }

    public function respondLocked($message = null){

        if($message === null){
            $message = _i('Der Zugriff wurde gesperrt.');
        }

        return $this->setStatusCode(IlluminateResponse::HTTP_LOCKED)->respond(array(
            'message'=>$message
        ));
    }

    public function respondValidationFails($validation=null){

        if($validation === null){
            return $this->respondUnproccessable();
        }

        $errors = $validation->errors()->all();
        return $this->respondUnproccessable($errors);

    }

    /**
     ** Get the name of the controller name
    **/

    protected function getName(Request $request)
    {

          $name         = $request->route()->getName();

          if    ($name === null)
                {

                    if(isset($request->route()->action['uses']) === true)
                      {

                          $nameExploded = explode('@',$request->route()->action['uses']);
                          $nameCnt      = sizeOf($nameExploded);

                          return $nameExploded[$nameCnt - 1];

                      }

                    return null;

                }
          else  {

                  $nameExploded = explode('.',$name);
                  $nameCnt      = sizeOf($nameExploded);

                  return $nameExploded[$nameCnt - 1];

                }

      }

      /**
       ** Get a controller map (settings)
      **/

      protected function getMap($name = null)
      {
          $map = data_get($this->cl_map,$name,null);
          return $map;
      }

      /**
      ** Returns an array of fillable fields for the given model used in the api
      **/

      protected function getModelFields()
      {

          $md = $this->getModel();
          $model = null;

          if($md !== null)
            {
               $model = new $md();
               return $model->getFillable();
            }

          return [];

      }

      /**
    ** Get the model related to this controller
    **/

    protected function getModel($map = null)
    {

        $model = data_get($map,'model',null);

        if($model !== null)
          {
             return $model;
          }

        if(isset($this->cl_model) === true)
          {
              return $this->cl_model;
          }

        return null;

    }

    /***
     ** Check if the api request is available or if it is excepted from the api callable
    ***/

    protected function isAvailable(Request $request)
    {
        $data = [];
        $map  = $this->getMap($this->getName($request));

        return !data_get($map,'except',false);
    }

    public function validateSortByField($field,$mdClass)
    {

        $fillable = $mdClass->getFillable();

        if(in_array($field,$fillable) === true)
          {
             return $field;
          }

        return 'id';

    }

    public function checkPermission(Request $request)
    {
        $map  = $this->getMap($this->getName($request));
        $roles = data_get($map,'roles',[]);

        if(sizeOf($roles) > 0)
          {

               if(optional($request)->user === null)
                 {
                     return $this->respondUnauthorized();
                 }

               return SecurityHelper::checkPermission(optional($request->user),$roles);
          }

        return true;

    }

}
