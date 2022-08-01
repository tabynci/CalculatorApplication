#!usr/bin/env bash
#Check if there is in instance running with the image name we are deploying
CURRENT_INSTANCE=$(docker ps -a -q --filter ancestor="$IMAGE_NAME" --format="{{.ID}}")

# if an instance does exist stop the instance
if [ "$CURRENT_INSTANCE" ]
then
    docker rm $(docker stop $CURRENT_INSTANCE)
fi 

# Pull down the instance from dockerhub
docker pull $IMAGE_NAME

# Check if a docker container exists with the name of node_app if it does remove the conatiner
CONTAINER_EXISTS=$(docker ps -a | grep node_app)
if [ "$CONTAINER_EXISTS" ]
then
    docker rm node_app
fi

# Create a container called node_app that is available on port 8443 from our docker image
docker create -p 8443:8443 --name node_app $IMAGE_NAME
# Write the private key to a file
echo $PRIVATE_KEY >privatekey.pem
# Write the server key to file
echo $SERVER > server.crt
# Add the priavate key to the node_app docker container
docker cp ./privatekey.pem node_app:/privatekey.pem
# Add the server key to the node_app docker container
docker cp ./server.crt node_app:/server.crt
# start the node_app conatiner
docker start node_app
