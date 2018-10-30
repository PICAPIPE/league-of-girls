FROM richarvey/nginx-php-fpm:1.5.7

ENV WEBROOT=/var/www/html/public
ENV ERRORS=0
ENV HIDE_NGINX_HEADERS=1
ENV REMOVE_FILES=1
ENV RUN_SCRIPTS=1

COPY ./src /var/www/html
COPY ./src/conf/supervisord.conf /etc/supervisord.conf
COPY ./src/conf/nginx-site.conf /etc/nginx/sites-available/default.conf
COPY ./src/conf/nginx-site-ssl.conf /etc/nginx/sites-available/default-ssl.conf

# Install nodejs
# Install nodejs
RUN apk add --update automake make \
    gcc autoconf \
    libtool libc-dev nasm libpng-dev \
    nodejs nodejs-npm && \
    cd /var/www/html && \
    npm install --silent

# Install laravel-echo server
RUN npm install -g laravel-echo-server

RUN apk add --virtual build-dependencies build-base