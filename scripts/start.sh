#!/bin/bash

BUILD_ENVIRONMENT="prod"
if [ "$1" == "dev" ]
then
    BUILD_ENVIRONMENT="$1"
fi

# this environment variable will affect the package.json script that is run from docker-compose.yml
export NPM_SCRIPT=$BUILD_ENVIRONMENT

docker-compose up --build -d