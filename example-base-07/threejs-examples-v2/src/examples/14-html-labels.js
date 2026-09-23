import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createExample(container) {
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(50,container.clientWidth/container.clientHeight,.1,100);
  camera.position.set(4,3,7);
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);
  const labels=new CSS2DRenderer();
  labels.setSize(container.clientWidth,container.clientHeight);
  labels.domElement.style.position="absolute";labels.domElement.style.top="0";labels.domElement.style.pointerEvents="none";
  container.appendChild(labels.domElement);

  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  const points=[[-2,0,0,"Service A"],[0,1,0,"Service B"],[2,-1,0,"Service C"]];
  points.forEach(([x,y,z,text],i)=>{
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(.55,32,16),new THREE.MeshStandardMaterial({color:[0x22c55e,0x38bdf8,0xf97316][i]}));
    mesh.position.set(x,y,z);scene.add(mesh);
    const div=document.createElement("div");div.className="label";div.textContent=text;
    const label=new CSS2DObject(div);label.position.set(0,.75,0);mesh.add(label);
  });

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);labels.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);labels.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);controls.dispose();renderer.dispose();labels.domElement.remove();};
}
