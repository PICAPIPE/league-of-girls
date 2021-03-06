<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>

        <base href="/"></base>
        <meta charset="UTF-8">
        <meta name="fragment" content="!" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
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
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

        @yield('header')

    </head>
    <body ng-controller="SiteCtrl as site" ng-style="site.getStyle()" ng-class="site.getClass()">

        <alerts></alerts>

        @yield('content')

        <site-modal></site-modal>

        @yield('scripts')

        <div id="footer" class="footer container">
              <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-6">
                      <a href="https://picapipe.com">© PICAPIPE GmbH</a>
                      <div class="sponsored-by">
                          <small>{{ _i('Gefördert durch') }}</small> <br>
                          <a href="https://www.netidee.at/" target="_blank"><img src="https://www.netidee.at/themes/Netidee/images/netidee-logo-color.svg" alt="netidee"></a>
                      </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 text-right">
                    <admin-navigation></admin-navigation>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-3  col-lg-2 text-right">
                    <pages-list></pages-list>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-3  col-lg-2 text-right">
                    <ul class="actions-list">
                      <li><a href="https://github.com/PICAPIPE/league-of-girls/issues" target="_blank">{{ _i('Fehler gefunden?') }}</a></li>
                      <li><a href="/faq">{{ _i('FAQ') }}</a></li>
                      <li><a href="/unterstuetzerinnen">{{ _i('Unterstützer*innen') }}</a></li>
                      <li><a href="/imprint">{{ _i('Impressum') }}</a></li>
                      <li><a href="/privacy">{{ _i('Datenschutz') }}</a></li>
                    </ul>
                  </div>
              </div>
        </div>

    </body>
</html>
