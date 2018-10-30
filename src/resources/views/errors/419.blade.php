@extends('errors::layout')

@section('title', _i('Seite abgelaufen!'))

@section('message')
    {{ _i('Die Sitzung ist aufgrund von Inaktivät abgelaufen.') }}
    <br/><br/>
    {{ _i('Bitte aktualisieren Sie die Seite manuell.') }}
@stop
