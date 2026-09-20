import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x0b1120);
  const camera=new THREE.PerspectiveCamera(50,container.clientWidth/container.clientHeight,.1,100);
  camera.position.set(8,6,10);camera.lookAt(0,0,0);
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  const values=[2,4,3,6,5,8,7,10];
  values.forEach((value,i)=>{
    const bar=new THREE.Mesh(
      new THREE.BoxGeometry(.65,value/2,.65),
      new THREE.MeshStandardMaterial({color:0x38bdf8})
    );
    bar.position.set((i-3.5)*1.0,value/4,0);
    scene.add(bar);
  });

  const base=new THREE.Mesh(
    new THREE.BoxGeometry(9,.15,2),
    new THREE.MeshStandardMaterial({color:0x1e293b})
  );
  base.position.y=-.08;scene.add(base);

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);controls.dispose();renderer.dispose();};
}
