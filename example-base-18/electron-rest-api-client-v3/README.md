# Electron REST API Client V3

Postman-like REST API client built with Electron.

## Run in development

```bash
npm install
npm start
```

## Create Windows EXE

### 1. Install dependencies

```bash
npm install
```

### 2. Build Windows installer + portable EXE

```bash
npm run dist:win
```

The generated files will be available inside the `dist/` folder:

```text
dist/
├── Prem REST Client Setup 3.0.0.exe   # Windows installer
└── Prem REST Client 3.0.0.exe         # Portable EXE
```

### 3. Build using the generic command

```bash
npm run dist
```

## Important

Run the Windows build command on Windows for the most reliable Windows EXE build.

## Features

- Multiple request tabs
- Request collections
- Request history
- Query parameters
- Custom headers
- JSON/Text body
- JSON formatting
- Bearer Token authentication
- Basic authentication
- Environment variables
- `{{baseUrl}}` substitution
- Save requests locally
- Import/export collection JSON
- Response body and headers
- HTTP status, duration and size
- Dark/light theme
- Ctrl+Enter to send
- Ctrl+S to save
- Windows NSIS installer
- Windows portable EXE
- Desktop shortcut
- Start Menu shortcut
- Custom installation directory

## Environment example

```text
baseUrl = http://localhost:8080
```

Then use:

```text
{{baseUrl}}/api/users
```
