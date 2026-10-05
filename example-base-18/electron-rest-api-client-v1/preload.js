const {contextBridge,ipcRenderer}=require("electron");
contextBridge.exposeInMainWorld("apiClient",{
  request:r=>ipcRenderer.invoke("api:request",r)
});