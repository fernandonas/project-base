
CONTAINER_NAME="project-base"

echo "Atualizando o repositório..."
sudo git checkout .
sudo git pull

echo "Verificando se existe contêiner..."
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Parando o contêiner existente..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

echo "Construindo e iniciando o novo contêiner..."
docker compose up --build -d
