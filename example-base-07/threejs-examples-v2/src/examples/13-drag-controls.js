import * as THREE from "three";
import { DragControls } from "three/addons/controls/DragControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x172554);
  const camera=new THREE.PerspectiveCamera(55,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=7;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  const objects=[];
  for(let i=0;i<6;i++){
    const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x38bdf8}));
    m.position.set((i%3-1)*2,(Math.floor(i/3)-.5)*2,0);scene.add(m);objects.push(m);
  }
  const orbit=new OrbitControls(camera,renderer.domElement);orbit.enableDamping=true;
  const drag=new DragControls(objects,camera,renderer.domElement);
  drag.addEventListener("dragstart",()=>orbit.enabled=false);
  drag.addEventListener("dragend",()=>orbit.enabled=true);

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);orbit.update();renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);drag.dispose();orbit.dispose();renderer.dispose();};
}
