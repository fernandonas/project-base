#!/bin/bash

# Nome do contêiner que queremos parar (deve ser o mesmo do docker-compose.yml)
CONTAINER_NAME="project-base"

# Verifica se o contêiner está rodando
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Parando o contêiner existente..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Rodar o docker-compose
docker-compose up --build -d
