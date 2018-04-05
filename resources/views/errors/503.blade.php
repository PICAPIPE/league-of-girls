@extends('errors::layout')

@section('title', _i('Service nicht verfügbar.'))

@section('message', $exception->getMessage() !== ''? $exception->getMessage() : _i('Wir verbessen momentan diesen Service. Bitte versuchen Sie es später erneut.'))
