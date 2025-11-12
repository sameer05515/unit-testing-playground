# Promise-Practice REVISION Strategy

## Overview
This project is designed to help you learn and practice various concepts related to Promises in JavaScript and their practical implementation in different environments. The key concepts covered include:

1. **Creating Promises in JavaScript**
2. **Consuming a Promise using `async/await` syntax**
3. **Consuming a Promise using `then()`, `catch()`, and `finally()` syntax**
4. **Consuming Promises for each value of a given input array, SEQUENTIALLY, using `async/await`**
5. **Consuming Promises for each value of a given input array, SEQUENTIALLY, using Promise chaining via `Promise.resolve` and `Promise.finally`**
6. **Consuming Promises for each value of a given input array, IN-PARALLEL, using `Promise.all`**
7. **Handling Promise errors and demonstrating robust error handling mechanisms**
8. **Using `Promise.race` and `Promise.any` for competitive and tolerant Promise consumption**
9. **Promise utilities for timeouts, delays (e.g., `Promise.withTimeout`, `setTimeout` with Promises)**
10. **Fetching data from APIs and integrating with real-world backends using Promises**
11. **Combining Promises with UI frameworks (React, Vue) for rendering asynchronous data**
12. **Testing asynchronous code and Promises using test frameworks and utilities**

## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (v12 or later recommended)
- npm (v6 or later)
- For some sub-projects (React, Vue), you may need `npx`, `create-react-app`, or `@vue/cli` as appropriate

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/promise-practice-revision.git
    ```
2. Navigate to the project directory:
    ```bash
    cd promise-practice-revision
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Project with `http-server`
1. Start the server:
    ```bash
    npx http-server src -p 6060
    ```
2. Open your browser and navigate to `http://localhost:6060` to see the project in action.

## Setting Up the Project with Webpack
To use webpack for bundling the project and webpack-dev-server for development, follow these steps:

### Additional Installation
1. Install webpack and webpack-dev-server as development dependencies:
    ```bash
    npm install --save-dev webpack webpack-cli webpack-dev-server
    ```
2. Create a `webpack.config.js` file in the root directory with the following content:
    ```javascript
    const path = require('path');

    module.exports = {
        entry: './src/app.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 6060,
        },
    };
    ```
3. Update the `scripts` section of your `package.json` to include the webpack build and dev server commands:
    ```json
    "scripts": {
        "start": "webpack serve --open",
        "build": "webpack"
    }
    ```

### Running the Project with Webpack
1. Build the project:
    ```bash
    npm run build
    ```
2. Start the webpack development server:
    ```bash
    npm start
    ```
3. Open your browser and navigate to `http://localhost:6060` to see the project in action.

## Project Structure
- **src/**: Contains the source code.
  - **index.html**: The main HTML file.
  - **styles.css**: The CSS file for styling.
  - **app.js**: The JavaScript file containing the main logic and examples.
- **test/**: (if present) Contains test cases for async/promise features.
- **examples/**: (if present) Additional hands-on demonstrations.

## Learning Objectives
This project focuses on the following key learning objectives:

### 1. Creating Promises
Understand how to create and resolve Promises.

### 2. Using `async/await`
Learn how to use `async` and `await` to work with Promises in a more synchronous-looking manner.

### 3. Using `then()`, `catch()`, and `finally()`
Practice handling Promises with traditional methods like `then()`, `catch()`, and `finally()`.

### 4. Sequential Promise Consumption with `async/await`
Learn to handle Promises for each value in an input array sequentially using `async/await`.

### 5. Sequential Promise Consumption with Promise Chaining
Understand how to manage sequential Promises using `Promise.resolve` and `Promise.finally`.

### 6. Parallel Promise Consumption with `Promise.all`
Discover how to execute multiple Promises in parallel using `Promise.all`.

### 7. Competitive/Optimistic/Partial Promise Resolution
Use `Promise.race`, `Promise.any`, and `Promise.allSettled` for cases where only some or the first-resolved Promise matters.

### 8. Error Handling Patterns
Handle errors gracefully in both promise and async/await workflows.

### 9. Promises in User Interfaces
Use Promises to manage UI states, loading spinners, error banners, and interactions in frameworks like React and Vue.

### 10. Integrating with APIs and Backends
Consume backend data using fetch/XHR Promises and integrate with REST APIs or mock servers.

### 11. Writing and Testing Async Code
Explore how to test code that uses Promises with libraries like Jest or Mocha.

### 12. Cancellation and Timeout Techniques
Implement patterns for aborting or timing out Promises (e.g., with AbortController, limited timeouts, custom wrappers).

## Additional Notes
- Ensure your development environment is set up with the necessary prerequisites.
- Follow the examples in `app.js` to understand each concept thoroughly.
- Explore sub-projects for advanced topics or integration examples.

## Contributing
If you wish to contribute to this project, please fork the repository and submit a pull request. Add new promise patterns or real-world examples for others to learn from!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by various JavaScript Promise tutorials and documentation.
- Special thanks to ChatGPT and the open-source community for guidance and idea sharing.

---

Happy Coding!



# Sequence of projects to be referenced (Recommended order of study)
1. **example-base-03/promise-practice**
2. **example-base-03/promise-practice-in-react**
3. **example-base-03/nodejs-backend**
4. **example-base-03/promise-practice-with-commonjs-webpack**
5. **example-base-03/d3-charts-es6-modules-with-webpack-dev-server**
6. **example-base-03/dependency-injection-practice-with-es6-modules-and-http-server**
7. **example-base-03/dependency-injection-practice-with-es6-modules-and-webpack-dev-server**
8. **example-base-03/vue-crud** _(Vue 3, Axios, Promises in CRUD)_
9. **example-base-03/angular-crud** _(Angular 18, HttpClient, Observables & Promises)_
10. **example-base-03/jquery-TS-WebPack** _(TypeScript, jQuery, Promises with AJAX)_

Feel free to explore each project and expand your understanding of Promises and async patterns across different JavaScript environments!
