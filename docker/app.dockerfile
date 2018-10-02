FROM richarvey/nginx-php-fpm:1.5.7

ENV WEBROOT=/var/www/html/public
ENV ERRORS=0
ENV HIDE_NGINX_HEADERS=1
ENV REMOVE_FILES=1
ENV RUN_SCRIPTS=1

ADD ./conf/nginx-site.conf /etc/nginx/sites-available/default.conf
ADD ./conf/nginx-site-ssl.conf /etc/nginx/sites-available/default-ssl.conf

COPY ./src /var/www/html
COPY ./scripts /var/www/html/scripts

# Install nodejs
RUN apk add --update nodejs nodejs-npm && \
    cd /var/www/html && \
    npm install && \
    npm rebuild node-sass --force && \
    npm run $DEPLOY_TYPE
