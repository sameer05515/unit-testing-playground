# About this project

This project demonstrates below use cases:-
1. How to install a 3rd party dependency, here for example- d3.js
2. How to create ES6 modules.   
  2.1 here we have created main `src/index.js`. It uses modules defined in `charts` and `data` folder
3. How to define babel and webpack configuration files to transpile my modules residing in `src` folder and output a `dist/bundle.js`
4. We have learnt to use the `dist/bundle.js` into our `public/index.html` in various ways  
  4.1 statically using it in browser with url `<PROJECT_ROOT_DIR>/example-base-03\d3-charts\public\index.html`  
  4.2 using `webpack-dev-server`