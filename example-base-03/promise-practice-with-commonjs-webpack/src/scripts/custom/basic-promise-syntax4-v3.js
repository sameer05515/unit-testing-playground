// circleModule.js

const defaultCircleValues = {
    radius: 100,
    leftPadding: 300,
    topPadding: 400,
};

const styles = {
    circle: {
        transitionProperty: "width, height",
        transitionDuration: "5s",
        position: "fixed",
        transform: "translateX(-50%) translateY(-50%)",
        backgroundColor: "red",
        borderRadius: "50%",
    },
    container: {
        // display: "flex",
        // flexDirection: "column",
        //alignItems: "center",
        gap: "10px",
        marginTop: "20px",
        border: "1px solid #ccc", // Added border style
        //overflowY: "auto", // Added overflowY style
    },
    circleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
        border: "1px solid #ccc", // Added border style
        overflowY: "auto", // Added overflowY style
    },
    input: {
        padding: "5px",
        fontSize: "16px",
        width: "200px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};

function applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
    }
}

function check(radius = defaultCircleValues.radius, leftPadding = defaultCircleValues.leftPadding, topPadding = defaultCircleValues.topPadding) {
    showCircle(radius + leftPadding, radius + topPadding, radius).then((div) => {
        div.style.fontSize = "20px";
        div.style.lineHeight = `${radius * 2}px`;
        div.style.textAlign = "center";
        div.append("Hello, world!");
    });
}

function showCircle(cx, cy, radius) {
    const myCircleContainerDiv = document.getElementById('myCircleContainerDiv');
    if (!myCircleContainerDiv) {
        console.error(`No div with id 'myCircleContainerDiv' found`);
        return;
    }

    // Clear existing circles
    myCircleContainerDiv.innerHTML = '';

    const div = document.createElement("div");
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + "px";
    div.style.top = cy + "px";
    div.className = "circle";
    applyStyles(div, styles.circle);
    myCircleContainerDiv.append(div);

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
      body{
      overflow-y: auto;
      }
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
    const myCircleContainerDiv = document.createElement('div');
    myCircleContainerDiv.id = 'myCircleContainerDiv';
    applyStyles(myCircleContainerDiv, styles.circleContainer); // Apply circleContainer styles here

    const containerDiv = document.createElement('div');

    const radiusInputEl = document.createElement("input");
    radiusInputEl.type = "text";
    radiusInputEl.id = "radiusInputElId";
    radiusInputEl.placeholder = "Enter radius {Default value is: 100}";
    applyStyles(radiusInputEl, styles.input);

    const leftPaddingInputEl = document.createElement("input");
    leftPaddingInputEl.type = "text";
    leftPaddingInputEl.id = "leftPaddingInputElId";
    leftPaddingInputEl.placeholder = "Enter Left Padding {Default value is: 70}";
    applyStyles(leftPaddingInputEl, styles.input);

    const topPaddingInputEl = document.createElement("input");
    topPaddingInputEl.type = "text";
    topPaddingInputEl.id = "topPaddingInputElId";
    topPaddingInputEl.placeholder = "Enter Top Padding {Default value is: 70}";
    applyStyles(topPaddingInputEl, styles.input);

    const button = document.createElement("button");
    button.innerText = "Click me";
    button.onclick = function () {
        const radius = +document.getElementById("radiusInputElId").value || defaultCircleValues.radius;
        const leftPadding = +document.getElementById("leftPaddingInputElId").value || defaultCircleValues.leftPadding;
        const topPadding = +document.getElementById("topPaddingInputElId").value || defaultCircleValues.topPadding;
        console.log(`radius: ${radius}, leftPadding: ${leftPadding}, topPadding: ${topPadding}`);
        check(radius, leftPadding, topPadding);
    };
    applyStyles(button, styles.button);

    containerDiv.appendChild(radiusInputEl);
    containerDiv.appendChild(leftPaddingInputEl);
    containerDiv.appendChild(topPaddingInputEl);
    containerDiv.appendChild(button);
    document.body.appendChild(containerDiv); 

    document.body.appendChild(myCircleContainerDiv);
}

function initialize() {
    console.log('Initialization code runs');
    initializeStyles();
    createControls();
}

initialize();
