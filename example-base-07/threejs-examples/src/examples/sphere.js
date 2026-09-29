import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 32),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: .25, metalness: .4 })
  );
  scene.add(mesh);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(3, 4, 5);
  scene.add(light);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    mesh.rotation.y += .01;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();

  return () => {
    running = false;
    window.removeEventListener("resize", resize);
    renderer.dispose();
  };
}
