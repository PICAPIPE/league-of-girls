#!/bin/bash

# Rebuild sass
# npm rebuild node-sass --force --silent && \

# Run laravel stuff
php artisan down
php artisan migrate --force
php artisan db:seed --force

# Run javascript stuff
npm run production

php artisan up
