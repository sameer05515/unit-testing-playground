import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x87ceeb);
  const camera=new THREE.PerspectiveCamera(55,container.clientWidth/container.clientHeight,.1,100);
  camera.position.set(6,6,8);
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  const size=30, segments=80;
  const geometry=new THREE.PlaneGeometry(size,size,segments,segments);
  const pos=geometry.attributes.position;
  for(let i=0;i<pos.count;i++){
    const x=pos.getX(i),y=pos.getY(i);
    pos.setZ(i,Math.sin(x*.35)*.45+Math.cos(y*.25)*.6+Math.sin((x+y)*.15)*.35);
  }
  geometry.computeVertexNormals();geometry.rotateX(-Math.PI/2);
  const terrain=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:0x4ade80,wireframe:false}));
  scene.add(terrain);

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);controls.dispose();renderer.dispose();};
}
