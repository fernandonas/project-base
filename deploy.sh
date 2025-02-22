
CONTAINER_NAME="project-base"

echo "Atualizando o repositório..."
sudo chmod +x deploy.sh
sudo git checkout .
sudo git pull

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Parando o contêiner existente..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

echo "Construindo e iniciando o novo contêiner..."
docker compose up --build -d
