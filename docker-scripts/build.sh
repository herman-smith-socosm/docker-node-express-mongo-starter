#!/bin/bash

if [ "$1" == "dev" ]
then
    echo "Docker Compose Development"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --no-start    
else
    echo "Docker Compose Production"
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --no-start    
fi

docker-compose start mongo
./docker-scripts/wait-for-service.sh mongo 'waiting for connections on port'
docker-compose start app-a
docker-compose start app-b

sleep 3
echo "***********************************"
echo "*      STARTUP COMPLETED          *"
echo "***********************************"
docker-compose ps