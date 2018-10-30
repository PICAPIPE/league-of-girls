@extends('errors::layout')

@section('title', _i('Seite nicht gefunden!'))

@section('message', $exception->getMessage() !== ''? $exception->getMessage() : _i('Upps! Hier scheint etwas schiefgelaufen zu sein. Die gesuchte Seite oder Datei konnte nicht gefunden werden.'))
