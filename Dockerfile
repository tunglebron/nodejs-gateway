FROM node:18-alpine
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

# Install dependencies
RUN npm install

# Build source codes
RUN npm run build

# env variables
ARG PORT=8080
ARG RATE_LIMIT=1000

ENV PORT=${PORT}
ENV RATE_LIMIT=${RATE_LIMIT}

EXPOSE $PORT
CMD [ "node", "dist/index.js" ]