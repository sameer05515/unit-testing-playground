import * as THREE from "three";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x0f172a);
  const camera=new THREE.PerspectiveCamera(55,container.clientWidth/container.clientHeight,.1,100);
  camera.position.set(3,3,6);
  const ortho=new THREE.OrthographicCamera(-4,4,3,-3,.1,100);
  ortho.position.set(4,4,6);ortho.lookAt(0,0,0);

  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));
  const mesh=new THREE.Mesh(new THREE.TorusKnotGeometry(1.2,.35,100,16),new THREE.MeshStandardMaterial({color:0x22c55e}));
  scene.add(mesh);

  const button=document.createElement("button");
  button.textContent="Switch Camera";
  button.style="position:absolute;top:15px;right:15px;padding:8px 12px;z-index:2;";
  container.appendChild(button);
  let useOrtho=false;
  button.onclick=()=>useOrtho=!useOrtho;

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);mesh.rotation.y+=.01;renderer.render(scene,useOrtho?ortho:camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);button.remove();renderer.dispose();};
}
