<?php

namespace App\Exceptions;

use App;
use Exception;
use LogHelper;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    protected $statusCode;

    /**
     * Get StatusCode
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param mixed $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * Response with json
     * @param array $data
     * @param array $headers
     * @return mixed
     */

    public function respond($data=array(),$headers=[]){

        $data['status'] = $this->getStatusCode();
        return \Response::json($data,$this->getStatusCode(),$headers);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {

        $path           = null;
        $result         = null;

        if($request->getPathInfo()){
            $path = $request->getPathInfo();
        }

        // Check if this is an api exception

        $result = $this->handleApiExceptionHandler($path,$exception,$request);

        if($result !== null){
          return $result;
        }

        return parent::render($request, $exception);
    }

    /***
    ** Handle API Exceptions
    ***/

    protected function handleApiExceptionHandler($path, Exception $exception,$request){

        $result     = null;
        $message    = null;

        $instanceOf       = get_class($exception);
        $isMaintainceMode = ($instanceOf === 'Illuminate\Foundation\Http\Exceptions\MaintenanceModeException');

        if(config('app.debug') === true)
          {
             return null;
          }

        // Development environment behavior

        if(starts_with($path,'/api')   === true                                &&
           (config('api.debug') !== true || $isMaintainceMode === true) &&
           $instanceOf === 'Illuminate\Foundation\Http\Exceptions\MaintenanceModeException')
          {
              return $this->setStatusCode(503)->respond(array('message'=> __('Der Service steht momentan aufgrund von Wartungsarbeiten nicht zur Verfügung.')),array());
          }

        // Standard behavior

        if(starts_with($path,'/api') && (config('api.debug') === false && $isMaintainceMode === false)){

          switch($instanceOf){

              case 'Illuminate\Foundation\Http\Exceptions\MaintenanceModeException':
                $result = $this->setStatusCode(503)->respond(array('message'=> _i('Der Service steht momentan aufgrund von Wartungsarbeiten nicht zur Verfügung.')),array());
                break;

              case 'Predis\Connection\ConnectionException':
                $result = $this->setStatusCode(400)->respond(array('message'=> _i('Die Applikation ist momentan nicht verfügbar.')),array());
                break;

              case 'Symfony\Component\HttpKernel\Exception\BadRequestHttpException':
                $result = $this->setStatusCode(400)->respond(array('message'=> _i('Fehler in der Anfrage.')),array());
                break;

              case 'Symfony\Component\HttpKernel\Exception\NotFoundHttpException':
              case 'NotFoundResourceException':
              case 'NotFoundHttpException':
                $result = $this->setStatusCode(404)->respond(array('message'=> _i('Angefragten Daten konnten nicht gefunden werden.')),array());
                break;

              case 'Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException':
                $result = $this->setStatusCode(405)->respond(array('message'=> _i('Diese Funktion ist nicht erlaubt.')),array());
                break;

              case 'Symfony\Component\HttpKernel\Exception\HttpException':

                $message = $exception->getMessage();

                switch($exception->getStatusCode()){
                  case 400:

                    if($message === '')
                      {
                          $message = _i('Abfrage fehlgeschlagen.');
                      }

                    break;
                  case 401:

                    if($message === '')
                      {
                          $message = _i('Un­au­to­ri­sierte Anfrage.');
                      }

                    break;
                  case 403:

                    if($message === '')
                      {
                          $message = _i('Nicht genügend Berechtigungen.');
                      }

                    break;
                }

                $result =  $this->setStatusCode($exception->getStatusCode())->respond(array('message'=> $message),array());

                break;

              case 'Tymon\JWTAuth\Exceptions\TokenExpiredException':
              case 'Tymon\JWTAuth\Exceptions\TokenInvalidException':
              case 'Tymon\JWTAuth\Exceptions\JWTException':

                  $msg = $exception->getMessage();

                  if      (config('app.debug') === false && $instanceOf === 'Tymon\JWTAuth\Exceptions\JWTException')
                          {
                             $msg = _i('Token abgelaufen.');
                          }
                  else if (config('app.debug') === false && $instanceOf === 'Tymon\JWTAuth\Exceptions\TokenInvalidException')
                          {
                             $msg = _i('Token ungültig.');
                          }
                  else if (config('app.debug') === false && $instanceOf === 'Tymon\JWTAuth\Exceptions\JWTException')
                          {
                             $msg = _i('Token fehlt.');
                          }

                  $result =  $this->setStatusCode(401)->respond(array('message'=> $msg),array());
                  break;

              default:

                $message = $exception->getMessage();

                if($message === null || $message === '' || config('app.debug') === false)
                  {
                    $message = _i('Es ist ein unbekannter Fehler aufgetreten.');
                  }

                $result = $this->setStatusCode(500)->respond(array('message'=> $message),array());
                break;

          }

        }

        LogHelper::log($this,$request);

        return $result;

    }

}
