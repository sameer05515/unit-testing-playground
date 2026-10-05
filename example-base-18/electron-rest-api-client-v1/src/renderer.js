const $=id=>document.getElementById(id);
const headers=$("headers");

function addHeader(k="",v=""){
  const row=document.createElement("div");row.className="headerrow";
  const a=document.createElement("input");a.placeholder="Header name";a.value=k;
  const b=document.createElement("input");b.placeholder="Header value";b.value=v;
  const x=document.createElement("button");x.textContent="×";x.onclick=()=>row.remove();
  row.append(a,b,x);headers.appendChild(row);
}
function getHeaders(){
  const out={};
  document.querySelectorAll(".headerrow").forEach(r=>{
    const i=r.querySelectorAll("input");if(i[0].value.trim())out[i[0].value.trim()]=i[1].value;
  });return out;
}
function format(v){
  if(v==null)return "";
  if(typeof v==="object")return JSON.stringify(v,null,2);
  try{return JSON.stringify(JSON.parse(v),null,2)}catch{return String(v)}
}
async function send(){
  const method=$("method").value,url=$("url").value.trim();
  if(!url)return alert("Please enter a URL.");
  const button=$("send");button.disabled=true;button.textContent="Sending...";
  $("message").textContent="Executing request...";
  const r=await window.apiClient.request({
    method,url,headers:getHeaders(),
    body:["GET","HEAD"].includes(method)?"":$("body").value
  });
  $("status").textContent=r.status?`${r.status} ${r.statusText}`:r.statusText;
  $("status").style.color=r.ok?"#43c17a":"#ef6b73";
  $("meta").textContent=`${r.duration} ms`;
  $("responseBody").textContent=format(r.body);
  $("responseHeaders").textContent=Object.entries(r.headers||{}).map(([k,v])=>`${k}: ${v}`).join("\\n")||"No response headers";
  $("message").textContent="Request completed";
  button.disabled=false;button.textContent="Send";
}
$("send").onclick=send;
$("add").onclick=()=>addHeader();
$("method").onchange=e=>$("body").disabled=["GET","HEAD"].includes(e.target.value);
$("bodyTab").onclick=()=>{ $("bodyTab").classList.add("active");$("headersTab").classList.remove("active");$("responseBody").classList.remove("hidden");$("responseHeaders").classList.add("hidden") };
$("headersTab").onclick=()=>{ $("headersTab").classList.add("active");$("bodyTab").classList.remove("active");$("responseHeaders").classList.remove("hidden");$("responseBody").classList.add("hidden") };
document.addEventListener("keydown",e=>{if(e.ctrlKey&&e.key==="Enter"){e.preventDefault();send()}});
addHeader("Content-Type","application/json");$("method").dispatchEvent(new Event("change"));