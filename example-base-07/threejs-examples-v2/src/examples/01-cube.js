import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x20252f);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 4;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial());
  scene.add(mesh);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    mesh.rotation.x += .01;
    mesh.rotation.y += .015;
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
