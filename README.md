# NodeJS Gateway

## A simple gateway implementation using NodeJS, ExpressJS

## 1. Installation

```
npm install
```

## 2. Setup environment variables

Create a `.env` file in the root folder and declare values for `PORT` and `RATE_LIMIT`

Template:

```
PORT = <Application port>
RATE_LIMIT = <Number of requests limited in 5 minutes>
```

## 3. Run the server

<b>3.1. For developing:</b>

```
npm run dev
```

<b>3.2. For production:</b>

```
npm run prod
```

<b>3.3. Using Docker:</b>

- Note: This will run shell script files in the `scripts` directory

Build Docker image:

```
npm run build-docker-image
```

Run container:

```
npm run start-docker-container
```

<br>

### CHANGELOG

#### v1.0.0

- Updated: `17 Jun 2024`
- Support `proxy` and `api` configuration
