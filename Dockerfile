FROM httpd:2.4

LABEL maintainer="Inhwa Kim <radiantbeing99@gmail.com"

COPY ./build/ /usr/local/apache2/htdocs/