const {app,BrowserWindow,ipcMain}=require("electron");
const path=require("path");

function createWindow(){
  const win=new BrowserWindow({
    width:1400,height:900,minWidth:900,minHeight:600,
    webPreferences:{
      preload:path.join(__dirname,"preload.js"),
      contextIsolation:true,nodeIntegration:false,sandbox:false
    }
  });
  win.loadFile(path.join(__dirname,"src","index.html"));
}

ipcMain.handle("api:request",async(_,r)=>{
  const started=Date.now();
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),30000);
    const options={method:r.method,headers:r.headers||{},signal:controller.signal};
    if(!["GET","HEAD"].includes(r.method)&&r.body) options.body=r.body;
    const response=await fetch(r.url,options);
    clearTimeout(timer);
    const text=await response.text();
    let body=text;
    try{body=JSON.parse(text)}catch{}
    const headers={};
    response.headers.forEach((v,k)=>headers[k]=v);
    return {ok:response.ok,status:response.status,statusText:response.statusText,
      headers,body,duration:Date.now()-started};
  }catch(e){
    return {ok:false,status:0,statusText:e.name==="AbortError"?"Request Timeout":"Request Failed",
      headers:{},body:{error:e.message},duration:Date.now()-started};
  }
});

app.whenReady().then(()=>{
  createWindow();
  app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});