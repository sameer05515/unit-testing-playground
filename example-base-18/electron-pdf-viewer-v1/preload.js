const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openPdf: () => ipcRenderer.invoke("open-pdf")
});
