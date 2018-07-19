<?php

namespace App\Helper;

use Config;
use Cache;
use Carbon\Carbon;

use Illuminate\Http\Request;

class CacheHelper
{

    protected static $cacheActive = null;

    /***
    ** Check if the application cache is available
    ***/

    public static function active(){

        if(self::$cacheActive !== null)
          {
             return self::$cacheActive;
          }

        $active = config('cache.active');
        return $active;

    }

    /***
    ** Reset the status of the cache
    ***/

    public static function resetActive(){
         self::$cacheActive = null;
    }

    /***
    ** Set the status of the cache
    ***/

    public static function setActive($active){
       self::$cacheActive = $active;
    }

    /***
    ** Generate unique cache id for a specific request
    ***/

    public static function id(Request $request,$addUserConnection = false){

        $fingerprint_parts    = [];

        if    (method_exists($request,'fingerprint') === true && $request->route() !== null)
              {
                 $fingerprint_parts[]  = $request->fingerprint();
              }
        else  {
                 $fingerprint_parts[]  = self::getId($request->getPathInfo());
              }

        // Check if the params are available

        if(method_exists($request,'query') === true)
          {

            $params               = $request->query();

            asort($params);

            $params_query = http_build_query($params);

            if($params_query !== null && strlen($params_query) > 0){

                $fingerprint_parts[] = md5($params_query);

            }
            else {

                $fingerprint_parts[] = md5(0);

            }

          }

        // Check if request is made by a user

        if($addUserConnection === true && isset($request->user) && $request->user !== null)
        {
            $fingerprint_parts[] = $request->user->id;
        }
        else {

            $fingerprint_parts[] = 0;

        }

        // Generate the cache id

        $cacheId                 = implode('::',$fingerprint_parts);

        return $cacheId;

    }

    public static function getId($str){

        return sha1($str);

    }

    /***
    ** Get the the data from the cache
    ***/

    public static function get(Request $request, $addUserConnection = false){

        $cacheResult = null;
        $cacheId     = null;

        if(self::active() === true){

            $cacheId       = self::id($request,$addUserConnection);

            $cacheResult   = Cache::get($cacheId);

        }

        return $cacheResult;

    }

    /***
    ** Get cache data for simple information
    ***/

    public static function getSimple($cacheId = null){

      $cacheResult = null;

      if(self::active() === true){

          $cacheResult   = Cache::get($cacheId);

      }

      return $cacheResult;

    }

    /***
    ** Set cache data
    ***/

    public static function set(Request $request, $addUserConnection = false, $data,$minutes = null){

      $cacheResult     = null;
      $cacheId         = null;

      $cacheExpireAt   = null;

      if($minutes === null){
          $minutes = 15;
      }

      if(self::active() === true){

          if($minutes === 'forever'){

              Cache::forever($cacheId, $data);

          }
          else {

            $cacheExpireAt = Carbon::now()->addMinutes($minutes);
            $cacheId       = self::id($request,$addUserConnection);

            Cache::put($cacheId, $data, $cacheExpireAt);

          }

          $cacheResult = $data;

      }

      return $cacheResult;

    }

    /***
    ** Set cache data for simple information
    ***/

    public static function setSimple($cacheId = null,$data = null,$minutes = null){

      $cacheResult     = null;
      $cacheExpireAt   = null;

      if(self::active() === true){

          if($minutes === 'forever'){

              Cache::forever($cacheId, $data);

          }
          else {

            $cacheExpireAt = Carbon::now()->addMinutes($minutes);

            Cache::put($cacheId, $data, $cacheExpireAt);

          }

          $cacheResult = $data;

      }

      return $cacheResult;

    }

}
