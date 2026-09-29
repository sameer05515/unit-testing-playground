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
  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2));

  const mesh = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, .3, 128, 32),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: .5, roughness: .25 })
  );
  scene.add(mesh);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    controls.update();
    mesh.rotation.y += .005;
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
