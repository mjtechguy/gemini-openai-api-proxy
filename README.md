# Gemini OpenAI API Proxy

This is a simple proxy server that allows you to use the OpenAI API with the the currently ***FREE*** Google Gemini API.

It runs as a Docker container and is very easy to set up.

Based on [openai-gemini](https://github.com/PublicAffairs/openai-gemini).

Also, I am not a developer and I am not familiar with the best practices. I am just a user that wanted to use this service in a different way. If you have any suggestions, please let me know. 

Also also, this thing may be buggy as hell...sooo...yeah.

## Security Warning

This is a very simple proxy server and does not have any security features. It is not recommended to use this in a production environment or to be exposed to the internet. It is recommended to use this only for development purposes.

## Pre-requisites

- Docker
- Docker Compose
- A Personal Google [API key](https://makersuite.google.com/app/apikey)

## Usage

### Starting Up

1. Clone this repository
2. `cd` into the repository
3. Run `docker compose up --build -d`
4. The server will be running on `http://0.0.0.0:8080`
5. When you use another client to connect to the server, you will need to provide the Google API key as a Bearer token in the `Authorization` header.

### Stopping

1. `cd` into the repository
2. Run `docker compose down`

## Testing

You can test the server by running the following command:

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR-GOOGLE-API-KEY" \
     -d '{"model": "gpt-4", "prompt": "What is the capital of France?", "temperature": 0.5, "max_tokens": 500}' \
     http://YOUR-MACHINE-IP:8080/v1/chat/completions
```

## Compatibility

I have tested with the following clients:

- `curl`
- [MindMac](https://mindmac.app/)
- [LibreChat](https://github.com/danny-avila/LibreChat) - This is redundant because it already has a built-in support for Gemini.
  

## EndPoints

Enpoints support right now:

- [x] `/v1/chat/completions` 

This is the endpoint that is used to generate text completions.

I may forget about this project in the future and next track updates from the main project. See below if you want to contribute or see if they have added more endpoints.

## Recognition

This project is based on the great work from https://github.com/PublicAffairs/openai-gemini. They provide a way to run this in a serverless environment. I modified it to run as a Docker container because I like to host my own services.