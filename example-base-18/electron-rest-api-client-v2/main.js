const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs/promises");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 950,
    minWidth: 1100,
    minHeight: 650,
    backgroundColor: "#202124",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  win.loadFile(path.join(__dirname, "src", "index.html"));
}

ipcMain.handle("api:request", async (_, r) => {
  const started = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);

    const options = {
      method: r.method,
      headers: r.headers || {},
      signal: controller.signal
    };

    if (!["GET", "HEAD"].includes(r.method) && r.body) {
      options.body = r.body;
    }

    const response = await fetch(r.url, options);
    clearTimeout(timer);

    const text = await response.text();
    let body = text;
    try { body = JSON.parse(text); } catch (_) {}

    const headers = {};
    response.headers.forEach((value, key) => headers[key] = value);

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers,
      body,
      duration: Date.now() - started
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      statusText: error.name === "AbortError" ? "Request Timeout" : "Request Failed",
      headers: {},
      body: { error: error.message },
      duration: Date.now() - started
    };
  }
});

ipcMain.handle("collection:export", async (_, data) => {
  const result = await dialog.showSaveDialog({
    title: "Export REST Collection",
    defaultPath: "rest-collection.json",
    filters: [{ name: "JSON", extensions: ["json"] }]
  });
  if (result.canceled || !result.filePath) return false;
  await fs.writeFile(result.filePath, JSON.stringify(data, null, 2), "utf8");
  return true;
});

ipcMain.handle("collection:import", async () => {
  const result = await dialog.showOpenDialog({
    title: "Import REST Collection",
    properties: ["openFile"],
    filters: [{ name: "JSON", extensions: ["json"] }]
  });
  if (result.canceled || !result.filePaths.length) return null;
  return JSON.parse(await fs.readFile(result.filePaths[0], "utf8"));
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});