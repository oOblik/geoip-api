# GeoIP API

A simple GeoIP API server written in Node.js

## Setup

### Install dependencies

```bash
npm install
```

## Configuration

Set or use a `.env` file to override the following environment variables if required.

**If a variable is not set the default value is used.**

Rename `.env.example` to `.env` and change as required.

### Environment Variables

|Name|Description|Default|
|---|---|---|
|`ROOT_PATH`|The path API endpoints are bound to.|`/`|
|`SECRET`|The secret token to be required in Authorization headers for authentication to the API (Bearer Token).|`test`|
|`PORT`|The port the web server will listen on.|`8080`|

## Usage

### Development

```bash
npm run dev
# Runs: nodemon index.js
```

### Production

```bash
npm run start 
# Runs: node index.js
```
