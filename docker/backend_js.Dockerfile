FROM node:20-alpine

RUN	apk update

WORKDIR /var/www

COPY ./backend_js/package.json .
COPY ./backend_js/package-lock.json .

RUN	npm install --only=production

COPY ./backend_js .

EXPOSE 5000 
ENTRYPOINT  ["npm", "start"]