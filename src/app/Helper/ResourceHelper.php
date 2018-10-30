<?php

namespace App\Helper;

use File;
use CacheHelper;
use LaravelGettext;

class ResourceHelper
{

    protected static $exceptModelFiles = [
        'BaseModel'
    ];

    protected static function getNamespace($file = null){

        $namespace = null;

        if($file === null)
          {
             return null;
          }

        $fileClass  = $file->getBasename();

        $namespace  = 'App'.str_replace('\\'.$fileClass,'',str_replace('/','\\',str_replace(app_path(),'',$file->getRealPath())));

        return $namespace;

    }

    /***
    ** Get all Classes
    ** @path: Path to folder where the files should be searched
    ** @pattern: Pattern/Filename Ending without php
    ** @listOnly: boolean (List of class names)
    ** @except: Filter
    **/

    public static function getClasses($path = null,$pattern = null,$listOnly = false,$except = null,$withoutNamespace = false,$returnAsCollection = false){

      if($path === null){
        return false;
      }

      $finder    = new \Symfony\Component\Finder\Finder();
      $finder->files()->name('*'.$pattern.'.php')->in($path);

      $resources = [];

      foreach ($finder as $file) {

          $fileClass  = $file->getBasename('.php');

          $found = false;

          if    (is_array($except) === true)
                {
                   $found = in_array($fileClass,$except);
                }
          else  {
                   $found = ($fileClass === $except);
                }

          if($found !== true){

              $classname    = $fileClass;
              $namespace    = self::getNamespace($file);

              if($withoutNamespace === true && $listOnly === false){
                  $withoutNamespace = false;
              }

              if($withoutNamespace === false){
                $classname    = $namespace.'\\'.$classname;
              }

              if($listOnly === false){
                $resources[]  = new $classname();
              }
              else {
                $resources[]  = $classname;
              }

          }

      }

      if($returnAsCollection === true){
        return collect($resources);
      }

      return $resources;

    }

    /***
    ** Returns a list of models with a related class based on the relation defined in the pattern class file
    **/

    public static function getClassesByPatternAndModelInformation($path = null,$pattern){

        $classesList  = [];
        $finder       = new \Symfony\Component\Finder\Finder();

        if($path === null){
            return $classesList;
        }

        foreach ($finder->name('*'.$pattern.'.php')->in($path)->files()->depth('> 0') as $file) {

            $namespace = str_replace(app_path().'/','',$file->getPath());
            $namespace = 'App\\'.str_replace('/','\\',$namespace);

            $fileClass  = $file->getBasename('.php');

            $classname      = $namespace.'\\'.$fileClass;

            try {

              $customClass  = new $classname();
              $model        = null;

              if(method_exists($customClass,'getModel')){

                  $model = $customClass->getModel();

              }

              if($model !== null){

                  $classesList[$model] = $classname;

              }

            } catch(Exception $ex){

                report($ex);

            }

        }

        return $classesList;

    }

    /***
    ** Load a json file and decode it
    **/

    public static function loadJson($path = null,$toArray = true){

      $file = null;

      $cacheId     = CacheHelper::getId('file_'.$path.'_'.$toArray);
      $cacheResult = CacheHelper::getSimple($cacheId);

      if      ($cacheResult !== null)
              {
                  $file = $cacheResult;
              }
      else if ($path !== null && File::exists($path) === true)
              {
                  $file = File::get($path);
                  CacheHelper::setSimple($cacheId,$file,60);
              }

      if($file !== null)
        {

            try   {
                    if($toArray === true){
                          $file = json_decode($file);
                    }
                  }
            catch (Exception $ex)
                  {
                      $file = null;
                  }

        }

      if($file !== null && $toArray === true)
        {
          $file = (array) $file;
        }

      return $file;

    }

    /***
    ** Returns a list of models
    **/

    public static function models($asCollection = false, array $execept = [])
    {
          $models = self::getClasses(app_path('Models'),'',false, array_merge(self::$exceptModelFiles,$execept),false,$asCollection);
          return $models;
    }

    /***
    ** Returns an array of resources for a specific table (for models)
    ***/

    public static function getLangResourcesForModelByTable($table)
    {

        $resources = [];
        $path      = base_path('resources/lang/models/'.$table.'.php');

        $cacheId     = CacheHelper::getId('LangResources_'.$table.'_'.LaravelGettext::getLocale());
        $cacheResult = CacheHelper::getSimple($cacheId);

        if($cacheResult !== null)
          {
              return $cacheResult;
          }

        if(File::exists($path) === false)
          {
             return $resources;
          }

        $resources = require $path;

        if($resources === null || is_array($resources) === false)
          {
              $resources = [];
          }

        CacheHelper::setSimple($cacheId,$resources,'forever');

        return $resources;

    }

    /***
    ** Returns a lang token by id and table name
    ***/

    public static function getModelResource($resource,$params = [])
    {

        $msg         = '';
        $resources   = [];

        $parts       = explode('.',$resource);
        $partsLen    = count($parts);

        if($partsLen <= 1)
          {
             return $msg;
          }

        $table         = $parts[0];

        if($table === null)
          {
             return $msg;
          }

        $resources = self::getLangResourcesForModelByTable($table);

        if(is_array($resources)             === true)
          {

            if(isset($resources[$parts[1]]) === true)
            {
               $msg = $resources[$parts[1]];
            }

            // If more attributes are set

            if(is_array($msg) === true && $partsLen >= 2)
              {
                  for ($i = 2; $i <= $partsLen; $i++)
                      {

                          if    (is_array($msg) === true && isset($msg[$parts[$i]]) === true)
                                {
                                    $msg = $msg[$parts[$i]];
                                }
                          else  {
                                  break;
                                }
                      }

              }

          }

        if(sizeOf($params) > 0)
          {

            foreach ($params as $key => $value)
                    {
                       $msg = str_replace(':'.$key,$value,$msg);
                    }
          }

        if(is_array($msg) === true)
          {
              $msg = '';
          }

        return $msg;

    }

}
