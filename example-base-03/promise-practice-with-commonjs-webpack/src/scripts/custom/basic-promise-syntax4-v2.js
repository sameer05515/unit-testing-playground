// circleModule.js

const defaultCircleValues = {
    radius: 100,
    leftPadding: 70,
    topPadding: 70,
  };
  
  function check(
    radius = defaultCircleValues.radius,
    leftPadding = defaultCircleValues.leftPadding,
    topPadding = defaultCircleValues.topPadding
  ) {
    showCircle(radius + leftPadding, radius + topPadding, radius).then((div) => {
      div.style.fontSize = "20px";
      div.style.lineHeight = `${radius * 2}px`;
      div.style.textAlign = "center";
      div.append("Hello, world!");
    });
  }
  
  function showCircle(cx, cy, radius) {
    let div = document.createElement("div");
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + "px";
    div.style.top = cy + "px";
    div.className = "circle";
    document.body.append(div);
  
    return new Promise((resolve) => {
      setTimeout(() => {
        div.style.width = radius * 2 + "px";
        div.style.height = radius * 2 + "px";
  
        div.addEventListener("transitionend", function handler() {
          div.removeEventListener("transitionend", handler);
          resolve(div);
        });
      }, 0);
    });
  }
  
  function initializeStyles() {
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `
      .circle {
          transition-property: width, height;
          transition-duration: 5s;
          position: fixed;
          transform: translateX(-50%) translateY(-50%);
          background-color: red;
          border-radius: 50%;
      }
    `;
    document.head.appendChild(style);
  }
  
  function createControls() {
    const myContainerDiv = document.createElement('div');
  
    const radiusInputEl = document.createElement("input");
    radiusInputEl.type = "text";
    radiusInputEl.id = "radiusInputElId";
    radiusInputEl.placeholder = "Enter radius {Default value is: 100}";
  
    const leftPaddingInputEl = document.createElement("input");
    leftPaddingInputEl.type = "text";
    leftPaddingInputEl.id = "leftPaddingInputElId";
    leftPaddingInputEl.placeholder = "Enter Left Padding {Default value is: 70}";
  
    const topPaddingInputEl = document.createElement("input");
    topPaddingInputEl.type = "text";
    topPaddingInputEl.id = "topPaddingInputElId";
    topPaddingInputEl.placeholder = "Enter Top Padding {Default value is: 70}";
  
    const button = document.createElement("button");
    button.innerText = "Click me";
    button.onclick = function () {
      let radius = +document.getElementById("radiusInputElId").value || defaultCircleValues.radius;
      let leftPadding = +document.getElementById("leftPaddingInputElId").value || defaultCircleValues.leftPadding;
      let topPadding = +document.getElementById("topPaddingInputElId").value || defaultCircleValues.topPadding;
      console.log(`radius: ${radius}, leftPadding: ${leftPadding}, topPadding: ${topPadding}`);
      check(radius, leftPadding, topPadding);
    };
  
    myContainerDiv.appendChild(radiusInputEl);
    myContainerDiv.appendChild(document.createElement('br'));
    myContainerDiv.appendChild(leftPaddingInputEl);
    myContainerDiv.appendChild(document.createElement('br'));
    myContainerDiv.appendChild(topPaddingInputEl);
    myContainerDiv.appendChild(document.createElement('br'));
    myContainerDiv.appendChild(button);
    document.body.appendChild(myContainerDiv);
  }
  
  function initialize() {
    console.log('Initialization code runs');
    initializeStyles();
    createControls();
  }
  
  module.exports = {
    initialize,
    check,
    showCircle
  };


  // main.js
// const circleModule = require('./circleModule.js');

// document.addEventListener('DOMContentLoaded', (event) => {
//   initialize();
// });

initialize();
  