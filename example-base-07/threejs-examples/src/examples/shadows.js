import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x94a3b8);
  const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.set(5, 5, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({ color: 0xf97316 })
  );
  box.position.y = 1;
  box.castShadow = true;
  scene.add(box);

  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(4, 7, 4);
  light.castShadow = true;
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, .25));

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    box.rotation.y += .01;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();

  return () => { running = false; window.removeEventListener("resize", resize); renderer.dispose(); };
}
