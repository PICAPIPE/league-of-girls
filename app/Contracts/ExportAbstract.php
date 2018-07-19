<?php

namespace App\Contracts;

use Storage;
use URL;

abstract class ExportAbstract {

  /**
   * Create a new contract instance.
   *
   * @return void
   */
  public function __construct()
  {

  }

  public $name;

  public function run($params){
      return null;
  }

  public function save($path = null, $ext = '.txt',$data = null)
  {
    $file = Storage::disk('exports')->put(sha1($path).time().$ext,$data);
    $url  = URL::temporarySignedRoute('export.file', now()->addHour(), ['name' => sha1($path).time().$ext]);
    return $url;
  }

}
