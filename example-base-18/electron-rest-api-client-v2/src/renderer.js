const $=id=>document.getElementById(id);

const state={
  requests:[],
  activeId:null,
  history:[],
  environments:{local:{baseUrl:"http://localhost:8080"}},
  currentEnvironment:"local"
};

const STORAGE_KEY="electron-rest-api-client-v2";

function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}

function defaultRequest(){
  return {
    id:uid(),name:"New Request",method:"GET",
    url:"https://jsonplaceholder.typicode.com/posts/1",
    params:[],headers:[{key:"Content-Type",value:"application/json"}],
    body:"",bodyType:"json",
    auth:{type:"none",token:"",username:"",password:""}
  };
}

function current(){return state.requests.find(r=>r.id===state.activeId)}

function saveState(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify({
    requests:state.requests,history:state.history,environments:state.environments
  }));
}

function loadState(){
  try{
    const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    if(x){
      state.requests=x.requests||[];
      state.history=x.history||[];
      state.environments=x.environments||state.environments;
    }
  }catch(_){}
  if(!state.requests.length)state.requests.push(defaultRequest());
  state.activeId=state.requests[0].id;
}

function esc(v){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function render(){
  $("tabs").innerHTML="";
  state.requests.forEach(r=>{
    const tab=document.createElement("div");
    tab.className="request-tab"+(r.id===state.activeId?" active":"");
    tab.innerHTML=`<span>${esc(r.name)}</span><span class="close">×</span>`;
    tab.querySelector("span:first-child").onclick=()=>{
      state.activeId=r.id;loadEditor();render();
    };
    tab.querySelector(".close").onclick=e=>{
      e.stopPropagation();closeRequest(r.id);
    };
    $("tabs").appendChild(tab);
  });

  $("collections").innerHTML="";
  state.requests.forEach(r=>{
    const item=document.createElement("div");
    item.className="collection-item"+(r.id===state.activeId?" active":"");
    item.innerHTML=`<strong>${esc(r.name)}</strong><br><small>${esc(r.method)} ${esc(r.url)}</small>`;
    item.onclick=()=>{
      state.activeId=r.id;loadEditor();render();
    };
    $("collections").appendChild(item);
  });

  $("history").innerHTML="";
  state.history.slice(0,20).forEach(h=>{
    const item=document.createElement("div");
    item.className="history-item";
    item.innerHTML=`<span class="history-method">${esc(h.method)}</span>${esc(h.url)}`;
    item.onclick=()=>{
      const r=defaultRequest();
      r.name="History Request";r.method=h.method;r.url=h.url;
      r.headers=h.headers||[];r.body=h.body||"";
      state.requests.push(r);state.activeId=r.id;
      loadEditor();render();saveState();
    };
    $("history").appendChild(item);
  });
}

function renderRows(id,items){
  const c=$(id);c.innerHTML="";
  (items||[]).forEach((item,index)=>{
    const row=document.createElement("div");row.className="row";
    const a=document.createElement("input");a.placeholder=id==="params"?"Parameter":"Header name";a.value=item.key||"";
    const b=document.createElement("input");b.placeholder="Value";b.value=item.value||"";
    const x=document.createElement("button");x.textContent="×";
    x.onclick=()=>{items.splice(index,1);renderRows(id,items);saveEditor()};
    a.oninput=saveEditor;b.oninput=saveEditor;
    row.append(a,b,x);c.appendChild(row);
  });
}

function rows(id){
  return [...document.querySelectorAll(`#${id} .row`)].map(row=>{
    const i=row.querySelectorAll("input");return {key:i[0].value.trim(),value:i[1].value};
  }).filter(x=>x.key);
}

function loadEditor(){
  const r=current();if(!r)return;
  $("method").value=r.method;$("url").value=r.url;
  $("requestBody").value=r.body||"";$("bodyType").value=r.bodyType||"json";
  renderRows("headers",r.headers);renderRows("params",r.params);
  const a=r.auth||{};
  $("authType").value=a.type||"none";$("bearerToken").value=a.token||"";
  $("basicUser").value=a.username||"";$("basicPassword").value=a.password||"";
  authUI();tab("headers");
}

function saveEditor(){
  const r=current();if(!r)return;
  r.method=$("method").value;r.url=$("url").value;
  r.body=$("requestBody").value;r.bodyType=$("bodyType").value;
  r.headers=rows("headers");r.params=rows("params");
  r.auth={
    type:$("authType").value,token:$("bearerToken").value,
    username:$("basicUser").value,password:$("basicPassword").value
  };
  saveState();
}

function tab(name){
  document.querySelectorAll(".request-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  ["params","headers","body","auth"].forEach(x=>$(`${x}Tab`).classList.toggle("hidden",x!==name));
}

function authUI(){
  const t=$("authType").value;
  $("bearerBox").classList.toggle("hidden",t!=="bearer");
  $("basicBox").classList.toggle("hidden",t!=="basic");
}

function substitute(v){
  let x=v;const env=state.environments[state.currentEnvironment]||{};
  Object.entries(env).forEach(([k,val])=>x=x.replaceAll(`{{${k}}}`,val));
  return x;
}

function buildUrl(r){
  let url=substitute(r.url);
  const active=(r.params||[]).filter(x=>x.key);
  if(active.length){
    const q=active.map(x=>`${encodeURIComponent(substitute(x.key))}=${encodeURIComponent(substitute(x.value))}`).join("&");
    url+=(url.includes("?")?"&":"?")+q;
  }
  return url;
}

function buildHeaders(r){
  const h={};
  (r.headers||[]).forEach(x=>{if(x.key)h[substitute(x.key)]=substitute(x.value)});
  if(r.auth?.type==="bearer"&&r.auth.token)h.Authorization=`Bearer ${substitute(r.auth.token)}`;
  if(r.auth?.type==="basic"){
    h.Authorization=`Basic ${btoa(`${r.auth.username}:${r.auth.password}`)}`;
  }
  return h;
}

function pretty(v){
  if(v==null)return "";
  if(typeof v==="object")return JSON.stringify(v,null,2);
  try{return JSON.stringify(JSON.parse(v),null,2)}catch{return String(v)}
}

function showResponse(r){
  $("responseStatus").textContent=r.status?`${r.status} ${r.statusText}`:r.statusText;
  $("responseStatus").style.color=r.ok?"#43c17a":"#ef6b73";
  $("duration").textContent=`${r.duration} ms`;
  $("size").textContent=`${new TextEncoder().encode(pretty(r.body)).length} B`;
  $("responseBody").textContent=pretty(r.body);
  $("responseHeaders").textContent=Object.entries(r.headers||{}).map(([k,v])=>`${k}: ${v}`).join("\n")||"No response headers";
}

async function send(){
  const r=current();if(!r)return;
  saveEditor();
  $("sendBtn").disabled=true;$("sendBtn").textContent="Sending...";$("message").textContent="Executing request...";
  const result=await window.apiClient.request({
    method:r.method,url:buildUrl(r),headers:buildHeaders(r),
    body:["GET","HEAD"].includes(r.method)?"":substitute(r.body)
  });
  showResponse(result);
  state.history.unshift({method:r.method,url:buildUrl(r),headers:r.headers,body:r.body,timestamp:Date.now()});
  state.history=state.history.slice(0,20);saveState();render();
  $("message").textContent="Request completed";
  $("sendBtn").disabled=false;$("sendBtn").textContent="Send";
}

function newRequest(){
  const r=defaultRequest();state.requests.push(r);state.activeId=r.id;
  loadEditor();render();saveState();
}

function closeRequest(id){
  const i=state.requests.findIndex(r=>r.id===id);if(i<0)return;
  state.requests.splice(i,1);if(!state.requests.length)state.requests.push(defaultRequest());
  state.activeId=state.requests[Math.min(i,state.requests.length-1)].id;
  loadEditor();render();saveState();
}

$("sendBtn").onclick=send;$("newBtn").onclick=newRequest;$("newCollectionBtn").onclick=newRequest;

$("addHeaderBtn").onclick=()=>{
  const r=current();r.headers.push({key:"",value:""});renderRows("headers",r.headers);
};
$("addParamBtn").onclick=()=>{
  const r=current();r.params.push({key:"",value:""});renderRows("params",r.params);
};

document.querySelectorAll(".request-tabs button").forEach(b=>b.onclick=()=>{saveEditor();tab(b.dataset.tab)});
["method","url","requestBody","bodyType"].forEach(id=>$(id).oninput=saveEditor);
$("authType").onchange=()=>{authUI();saveEditor()};
["bearerToken","basicUser","basicPassword"].forEach(id=>$(id).oninput=saveEditor);

$("formatJsonBtn").onclick=()=>{
  try{$("requestBody").value=JSON.stringify(JSON.parse($("requestBody").value),null,2);saveEditor()}
  catch{alert("Request body is not valid JSON.")}
};

$("responseBodyTab").onclick=()=>{
  $("responseBodyTab").classList.add("active");$("responseHeadersTab").classList.remove("active");
  $("responseBody").classList.remove("hidden");$("responseHeaders").classList.add("hidden");
};
$("responseHeadersTab").onclick=()=>{
  $("responseHeadersTab").classList.add("active");$("responseBodyTab").classList.remove("active");
  $("responseHeaders").classList.remove("hidden");$("responseBody").classList.add("hidden");
};

$("saveBtn").onclick=()=>{saveEditor();alert("Request saved locally.")};

$("exportBtn").onclick=async()=>{
  saveEditor();
  if(await window.apiClient.exportCollection({version:"2.0",requests:state.requests,environments:state.environments}))
    $("message").textContent="Collection exported";
};

$("importBtn").onclick=async()=>{
  try{
    const data=await window.apiClient.importCollection();if(!data)return;
    if(Array.isArray(data.requests))state.requests=data.requests;
    if(data.environments)state.environments=data.environments;
    if(!state.requests.length)state.requests.push(defaultRequest());
    state.activeId=state.requests[0].id;loadEditor();render();saveState();
    $("message").textContent="Collection imported";
  }catch(e){alert("Unable to import collection: "+e.message)}
};

$("themeBtn").onclick=()=>document.body.classList.toggle("light");

document.addEventListener("keydown",e=>{
  if(e.ctrlKey&&e.key==="Enter"){e.preventDefault();send()}
  if(e.ctrlKey&&e.key.toLowerCase()==="s"){e.preventDefault();$("saveBtn").click()}
});

loadState();loadEditor();render();