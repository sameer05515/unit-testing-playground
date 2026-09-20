import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x000000);
  const camera=new THREE.PerspectiveCamera(60,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=6;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);

  const group=new THREE.Group();scene.add(group);
  for(let i=0;i<25;i++){
    const m=new THREE.Mesh(new THREE.SphereGeometry(.12,16,8),new THREE.MeshBasicMaterial({color:0x67e8f9}));
    const a=Math.random()*Math.PI*2,r=1.5+Math.random()*2.2;
    m.position.set(Math.cos(a)*r,(Math.random()-.5)*3,Math.sin(a)*r);
    group.add(m);
  }

  const composer=new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(container.clientWidth,container.clientHeight),1.6,.5,.1));

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);group.rotation.y+=.003;composer.render();}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);composer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);renderer.dispose();};
}
