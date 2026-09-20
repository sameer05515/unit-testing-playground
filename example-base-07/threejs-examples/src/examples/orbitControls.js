import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x172554);

  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.set(3, 2, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b })
  );
  scene.add(cube);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2));

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    controls.update();
    cube.rotation.y += .005;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();

  return () => { running = false; window.removeEventListener("resize", resize); controls.dispose(); renderer.dispose(); };
}
