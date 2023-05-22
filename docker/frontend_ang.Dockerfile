### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:20-alpine as builder

COPY ./frontend_ang/package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY ./frontend_ang .

## Build the angular app in production mode and store the artifacts in dist folder
#RUN $(npm bin)/ng build --prod --build-optimizer
RUN npm run build -- --output-path=./dist



### STAGE 2: Setup ###
FROM nginx:1.23.4-alpine

## Copy our default nginx config
COPY ./frontend_ang/nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]