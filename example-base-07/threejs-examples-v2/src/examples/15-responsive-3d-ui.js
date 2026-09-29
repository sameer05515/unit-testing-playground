import * as THREE from "three";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x020617);
  const camera=new THREE.PerspectiveCamera(60,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=6;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(container.clientWidth,container.clientHeight);
  container.appendChild(renderer.domElement);

  const mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(1.5,2),new THREE.MeshStandardMaterial({color:0x8b5cf6,wireframe:true}));
  scene.add(mesh);scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  const panel=document.createElement("div");
  panel.className="overlay";
  panel.innerHTML="<strong>Responsive 3D UI</strong><br>Resize the browser window.";
  container.appendChild(panel);

  let running=true;
  function animate(){if(!running)return;requestAnimationFrame(animate);mesh.rotation.x+=.004;mesh.rotation.y+=.007;renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate();
  return()=>{running=false;window.removeEventListener("resize",resize);panel.remove();window.removeEventListener("resize",resize);renderer.dispose();};
}
