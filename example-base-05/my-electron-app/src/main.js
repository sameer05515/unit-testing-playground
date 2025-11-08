const { app, BrowserWindow } = require("electron");
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../assets/prem.png"), // adjust path accordingly
  });

  win.loadFile("src/index.html");

  const win1 = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../assets/prem.png"), // adjust path accordingly
  });

  win1.loadFile("src/index1.html");
}

app.whenReady().then(createWindow);
