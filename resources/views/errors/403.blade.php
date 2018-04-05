@extends('errors::layout')

@section('title', _i('Keine Berechtigung!'))

@section('message', $exception->getMessage() !== ''? $exception->getMessage() : _i('Sie haben keine Berechtigung die angeforderte Seite/Datei zu öffnen.'))
