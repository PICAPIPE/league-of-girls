@extends('errors::layout')

@section('title', _i('Kein Zugriff!'))

@section('message', $exception->getMessage() !== ''? $exception->getMessage() : _i('Upps! Sie sind nicht angemeldet und haben daher keinen Zugriff auf diese Seite.'))
