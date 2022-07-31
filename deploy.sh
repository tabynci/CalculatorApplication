#!usr/bin/env bash
sudo apt update && sudo apt install nodejs npm
# Install pm2 which is a production process manager for Node.js with a built-in load balancer.
sudo npm install -g pm2
# stop any instance of our application running currently
pm2 stop simple_app
# change directory into folder where application is downloaded
cd Simple-Application-Project/
# Install application dependencies
npm install
echo $PRIVATE_KEY > privatekey.pem
echo $SERVER > server.crt
# Start the application with the process name simple_app using pm2
pm2 start ./bin/www --name simple_app