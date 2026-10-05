# Electron REST API Client V1

## Run

```bash
npm install
npm start
```

## Features

- GET, POST, PUT, PATCH, DELETE, HEAD
- Custom headers
- JSON request body
- Response body and headers
- HTTP status
- Request duration
- 30 second timeout
- Ctrl + Enter to send
- Networking runs in Electron main process, avoiding normal renderer CORS restrictions

## Test URLs

GET:
https://jsonplaceholder.typicode.com/posts/1

POST:
https://jsonplaceholder.typicode.com/posts

POST body:
```json
{
  "title": "Hello",
  "body": "Electron REST Client",
  "userId": 1
}
```
