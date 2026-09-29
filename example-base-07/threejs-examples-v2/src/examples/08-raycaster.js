import * as THREE from "three";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x111827);
  const camera=new THREE.PerspectiveCamera(60,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=6;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);
  container.appendChild(renderer.domElement);

  const objects=[];
  for(let i=0;i<9;i++){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(.8,.8,.8),new THREE.MeshBasicMaterial({color:0x38bdf8}));
    mesh.position.set((i%3-1)*1.4,(Math.floor(i/3)-1)*1.4,0);
    scene.add(mesh); objects.push(mesh);
  }

  const raycaster=new THREE.Raycaster();
  const mouse=new THREE.Vector2();
  const click=e=>{
    const r=renderer.domElement.getBoundingClientRect();
    mouse.x=((e.clientX-r.left)/r.width)*2-1;
    mouse.y=-((e.clientY-r.top)/r.height)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hit=raycaster.intersectObjects(objects)[0];
    if(hit){
      hit.object.material.color.set(0xf97316);
      hit.object.scale.multiplyScalar(1.15);
    }
  };
  renderer.domElement.addEventListener("click",click);

  let running=true;
  function animate(){
    if(!running)return;
    requestAnimationFrame(animate);
    objects.forEach(o=>o.rotation.y+=.006);
    renderer.render(scene,camera);
  }
  const resize=()=>{
    camera.aspect=container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
  };
  window.addEventListener("resize",resize); animate();
  return()=>{running=false;window.removeEventListener("resize",resize);renderer.domElement.removeEventListener("click",click);renderer.dispose();};
}
