import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1e293b);
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.set(4,3,6);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(5,5,5);
  scene.add(light);

  let model;
  new GLTFLoader().load(
    "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
    gltf => { model = gltf.scene; model.scale.setScalar(2); scene.add(model); }
  );

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    controls.update();
    if (model) model.rotation.y += .003;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();
  return () => { running=false; window.removeEventListener("resize", resize); controls.dispose(); renderer.dispose(); };
}
