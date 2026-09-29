import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);
  const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.set(0, 2, 8);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, .5));
  const dir = new THREE.DirectionalLight(0xffffff, 3);
  dir.position.set(4, 6, 5);
  scene.add(dir);

  const geometries = [
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.SphereGeometry(.9, 32, 16),
    new THREE.TorusGeometry(.8, .3, 24, 64)
  ];

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: .8 }),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, metalness: .6, roughness: .25 }),
    new THREE.MeshPhongMaterial({ color: 0x3b82f6, shininess: 120 })
  ];

  geometries.forEach((g, i) => {
    const mesh = new THREE.Mesh(g, materials[i]);
    mesh.position.x = (i - 1) * 2.4;
    scene.add(mesh);
  });

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    scene.traverse(o => { if (o.isMesh) o.rotation.y += .008; });
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
