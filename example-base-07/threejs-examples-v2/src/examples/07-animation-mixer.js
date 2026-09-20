import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x172554);
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight,.1,100);
  camera.position.set(4,2.5,6);
  const renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setSize(container.clientWidth,container.clientHeight);
  container.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;
  scene.add(new THREE.HemisphereLight(0xffffff,0x334155,2));

  let mixer;
  const clock = new THREE.Clock();
  new GLTFLoader().load(
    "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb",
    gltf => {
      scene.add(gltf.scene);
      mixer = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  );

  let running=true;
  function animate() {
    if(!running)return;
    requestAnimationFrame(animate);
    const dt=clock.getDelta();
    if(mixer)mixer.update(dt);
    controls.update();
    renderer.render(scene,camera);
  }
  const resize=()=>{
    camera.aspect=container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
  };
  window.addEventListener("resize",resize); animate();
  return()=>{running=false;window.removeEventListener("resize",resize);controls.dispose();renderer.dispose();};
}
