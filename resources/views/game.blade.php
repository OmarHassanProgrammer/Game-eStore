<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('app.css') }}" />
        <!-- Styles -->
        <style>
        </style>
        <script src="{{ asset('js/index.js') }}" defer></script>

    </head>
    <body class="antialiased app" id="app">  
        <div id="game"></div>
    
    </body>
</html>