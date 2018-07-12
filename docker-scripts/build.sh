#!/bin/bash

rm -rf dist
rm -rf src_decoy

if [ "$1" == "dev" ]
then
    BUILD_ENVIRONMENT="dev"
    mkdir dist
    SRC_VOLUME="src"
else
    BUILD_ENVIRONMENT="prod"
    npm run build
    SRC_VOLUME="src_decoy"
    mkdir $SRC_VOLUME    
fi

# this environment variable will affect the package.json script that is run from docker-compose.yml
export BUILD_ENVIRONMENT=$BUILD_ENVIRONMENT
# this environment variable will determine the directory mapped from host to container volume
export SRC_VOLUME=$SRC_VOLUME

docker-compose up --build --no-start
docker-compose start mongo
./docker-scripts/wait-for-service.sh mongo 'waiting for connections on port'

docker-compose start app
