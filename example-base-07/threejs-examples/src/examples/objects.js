import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  for (let i = 0; i < 20; i++) {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.22, 1),
      new THREE.MeshNormalMaterial()
    );
    const angle = i / 20 * Math.PI * 2;
    mesh.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
    group.add(mesh);
  }

  let running = true;
  function animate(t) {
    if (!running) return;
    requestAnimationFrame(animate);
    group.rotation.z = t * .0003;
    group.rotation.y = t * .0005;
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
