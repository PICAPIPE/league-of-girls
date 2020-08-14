@extends('layouts.base')

@section('content')

    <div class="loginLayout">
        <div class="loginElement">

            <div class="loginHeader">
                <a ui-sref="app.start" ui-sref-active="active" >
                    <img class="img-r"src="img/logos/logo-log.svg" alt="League of Girls"/>
                </a>
            </div>
            <div class="loginContainer">
                  @yield('content-login')
            </div>
        </div>
    </div>


@stop
