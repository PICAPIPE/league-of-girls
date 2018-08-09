<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>

        <base href="/"></base>
        <meta charset="UTF-8">
        <meta name="fragment" content="!" />
        <meta name="viewport" content="width=device-width,user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title')</title>

        <link rel="manifest"   href="/manifest.json">
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

        <script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
        <script>var LARAVEL = <?php echo json_encode(['csrfToken' => csrf_token(), 'stage' =>App::environment() , 'debug' => env('APP_DEBUG')]); ?>;</script>

        <script src="/js/manifest.js"></script>
        <script src="{{ mix('/js/app.js') }}"></script>
        <script src="{{ mix('/js/application.js') }}"></script>
        <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">

        @yield('header')

    </head>
    <body ng-controller="SiteCtrl as site">

        <alerts></alerts>

        @yield('content')

        <site-modal></site-modal>

        @yield('scripts')

        <div id="footer" class="footer container">
              © PICAPIPE GmbH
              <div class="float-right">
                  <a href="/imprint">{{ _i('Impressum') }}</a> -
                  <a href="/privacy">{{ _i('Datenschutz') }}</a>
              </div>
              <div class="sponsored-by">
                  <small>{{ _i('Gefördert durch') }}</small> <br>
                  <a href="https://www.netidee.at/" target="_blank"><img src="https://www.netidee.at/themes/Netidee/images/netidee-logo-color.svg" alt="netidee"></a>
              </div>
        </div>

    </body>
</html>
