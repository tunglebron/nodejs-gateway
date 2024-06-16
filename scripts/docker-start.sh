#!/bin/bash

echo "----------------------------------------------------------------"

# Check if port argument is provided
if [ $# -eq 0 ]; then
    read -p "Enter the container port: " CONTAINER_PORT
else
    CONTAINER_PORT=$1
fi

# Check if CONTAINER_PORT is a number
if ! [[ $CONTAINER_PORT =~ ^[0-9]+$ ]]; then
    echo "Error: Container port must be a number."
    exit 1
fi

echo "[1] Container port: $CONTAINER_PORT"

# Check if port argument is provided
if [ $# -ne 2 ]; then
    read -p "Enter the host port: " HOST_PORT
else
    HOST_PORT=$2
fi

# Check if HOST_PORT is a number
if ! [[ $HOST_PORT =~ ^[0-9]+$ ]]; then
    echo "Error: Host port must be a number."
    exit 1
fi

echo "[2] Host port: $HOST_PORT"

# Read the 'name' property from package.json
PACKAGE_NAME=$(jq -r '.name' package.json)

echo "[3] Run container"
docker run -d -p $HOST_PORT:$CONTAINER_PORT $PACKAGE_NAME

echo "[4] Finish starting a Docker container"
