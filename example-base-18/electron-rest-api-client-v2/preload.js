const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("apiClient", {
  request: request => ipcRenderer.invoke("api:request", request),
  exportCollection: data => ipcRenderer.invoke("collection:export", data),
  importCollection: () => ipcRenderer.invoke("collection:import")
});