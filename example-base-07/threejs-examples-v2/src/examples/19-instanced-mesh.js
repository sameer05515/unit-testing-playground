import * as THREE from "three";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x020617);
  const camera=new THREE.PerspectiveCamera(60,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=14;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);

  const count=3000;
  const mesh=new THREE.InstancedMesh(
    new THREE.BoxGeometry(.08,.08,.08),
    new THREE.MeshNormalMaterial(),
    count
  );
  const dummy=new THREE.Object3D();
  for(let i=0;i<count;i++){
    dummy.position.set((Math.random()-.5)*12,(Math.random()-.5)*8,(Math.random()-.5)*8);
    dummy.rotation.set(Math.random(),Math.random(),Math.random());
    dummy.updateMatrix();
    mesh.setMatrixAt(i,dummy.matrix);
  }
  scene.add(mesh);

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);mesh.rotation.y+=.0015;renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);renderer.dispose();};
}
