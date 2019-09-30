FROM nginx

COPY ./dist/ /usr/share/nginx/html/

COPY ./vhost.nginx.conf /usr/local/nginx/conf/vhost/umiprojects.conf

EXPOSE 80