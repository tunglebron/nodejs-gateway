#!/bin/bash

cd "$(dirname "$(dirname "$0")")"

echo "[1] Build Docker image script"

# 
echo "[2] Setup environment variables"
read -p "[2-1] Enter PORT (default 8080, enter to skip): " PORT
read -p "[2-2] Enter API Rate limit per 5 minutes (default 1000, enter to skip): " RATE_LIMIT

if [ -z "$PORT" ]; then
    PORT=8080
fi

# Read the 'name' property from package.json
PACKAGE_NAME=$(jq -r '.name' package.json)

# 
echo "[3] Start building Docker image"
docker build -t $PACKAGE_NAME --build-arg PORT=$PORT --build-arg RATE_LIMIT=$RATE_LIMIT .

#
read -p "[4] Build finished, start a container from the image? (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

#
./scripts/docker-start.sh $PORT