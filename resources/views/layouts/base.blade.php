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

        <script src="/js/manifest.js"></script>
        <script src="{{ mix('/js/vendor.js') }}"></script>
        <script src="{{ mix('/js/app.js') }}"></script>

        @yield('header')

    </head>
    <body ng-controller="SiteCtrl as site">
        @yield('content')

        <site-modal></site-modal>

        @yield('scripts')
    </body>
</html>
