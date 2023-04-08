const mix = require('laravel-mix');

mix.js('resources/js/index.js', 'public/js')
    .react()
    .webpackConfig({
        module: {
          rules: [
            {
              test: /\.mp4$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'videos/',
                },
              },
            },
          ],
        },
      });

mix.sass('resources/sass/App.scss', 'public/');
