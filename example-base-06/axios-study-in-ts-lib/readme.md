# Axios Study in TypeScript

A TypeScript learning project focused on understanding Axios HTTP client library, including request handling, error management, and TypeScript type safety.

## 🎯 Learning Objectives

- Understand how to use `axios` for HTTP requests
- Learn TypeScript integration with Axios
- Master error handling patterns with Axios
- Practice type-checking REST API requests

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
axios-study-in-ts-lib/
├── src/
│   ├── constants/
│   │   ├── Global.ts      # Base URL configuration
│   │   └── Types.ts       # TypeScript type definitions
│   ├── lib/
│   │   └── axios1.ts     # Axios examples (GET, POST requests)
│   ├── counter.ts         # Button click handler that triggers Axios requests
│   ├── main.ts           # Application entry point
│   └── style.css         # Styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 💻 Code Examples

### GET Request

```typescript
export const getAllNodes = () => {
  axios
    .get(`${BASE_URL}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};
```

### POST Request with Error Handling

```typescript
export const postNode = () => {
  axios
    .post(BASE_URL, node)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(
          "axios error Response: ",
          JSON.stringify(error.response, null, 2)
        );
      }
    })
    .finally(function () {
      // always executed
    });
};
```

### Type Definitions

```typescript
export interface Node {
  uniqueId: string;
  metadata: Record<string, string>;
}
```

## 🔧 Configuration

The API base URL is configured in `src/constants/Global.ts`:

```typescript
export const BASE_URL = 'http://localhost:8080/api/nodes';
```

**Note:** Make sure your backend API server is running on the configured port before testing the requests.

## 🎓 Learning Resources

### Axios Crash Course | HTTP Library
- [**Video Link**](https://www.youtube.com/watch?v=6LyagkoRWYA)
- [**Instructor code repo**](https://github.com/bradtraversy/axios-crash)
- **Video Topics with Timestamps:**
  - **Intro** - [0:30](https://www.youtube.com/watch?v=6LyagkoRWYA&t=30s)
  - **Interface & Files Explain** - [2:15](https://www.youtube.com/watch?v=6LyagkoRWYA&t=135s)
  - **GET Request & Response Explain** - [3:56](https://www.youtube.com/watch?v=6LyagkoRWYA&t=236s)
  - **POST Request** - [9:58](https://www.youtube.com/watch?v=6LyagkoRWYA&t=598s)
  - **PUT/PATCH Request** - [12:25](https://www.youtube.com/watch?v=6LyagkoRWYA&t=745s)
  - **DELETE Request** - [14:35](https://www.youtube.com/watch?v=6LyagkoRWYA&t=875s)
  - **Simultaneous Requests** - [15:30](https://www.youtube.com/watch?v=6LyagkoRWYA&t=930s)
  - **Interceptors** - [19:35](https://www.youtube.com/watch?v=6LyagkoRWYA&t=1175s)
  - **Custom Headers** - [22:40](https://www.youtube.com/watch?v=6LyagkoRWYA&t=1360s)
  - **Transform Response** - [24:38](https://www.youtube.com/watch?v=6LyagkoRWYA&t=1478s)
  - **Globals** - [27:00](https://www.youtube.com/watch?v=6LyagkoRWYA&t=1620s)
  - **Error Handling** - [29:16](https://www.youtube.com/watch?v=6LyagkoRWYA&t=1756s)

### TypeScript and Axios Intro - React Tutorial 54
- [**Video Link**](https://www.youtube.com/watch?v=_8YaUjcL0sw)
- [**Instructor's code repo**](https://github.com/CalebCurry/ts-axios)

### How to catch Axios Errors in TypeScript
- [**Video Link**](https://www.youtube.com/watch?v=NGSck4aHfeQ)
- Helpful video for error handling patterns

### TypeScript: Type-checking REST API Axios requests
- [**Video Link**](https://www.youtube.com/watch?v=RVjbzFp668w)
- Code implementation in `./src/lib/axios1.ts`

## 🧪 Testing

Click the counter button on the page to trigger the Axios POST request. Check the browser console to see the request/response logs.

## 📦 Dependencies

- **axios**: ^1.7.9 - Promise-based HTTP client
- **typescript**: ~5.6.2 - TypeScript compiler
- **vite**: ^6.0.1 - Build tool and dev server

## 🔍 Key Features Demonstrated

- ✅ GET requests with Axios
- ✅ POST requests with Axios
- ✅ TypeScript type definitions for API responses
- ✅ Error handling with `axios.isAxiosError()`
- ✅ Promise-based request handling (`.then()`, `.catch()`, `.finally()`)
- ✅ Type-safe API interactions

## 📝 Notes

- The project uses Vite as the build tool for fast development experience
- TypeScript strict mode is enabled for better type safety
- The code demonstrates both promise-based and error handling patterns
- Make sure your backend API is running before testing the HTTP requests

## 🤝 Contributing

This is a learning project. Feel free to experiment and add more examples!

## 📄 License

This project is for educational purposes.
