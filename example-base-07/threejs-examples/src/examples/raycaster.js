import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const objects = [];
  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(.9, .9, .9),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    mesh.position.set((i % 4 - 1.5) * 1.3, (Math.floor(i / 4) - .5) * 1.4, 0);
    scene.add(mesh);
    objects.push(mesh);
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const click = event => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(objects);
    if (hits.length) {
      const material = hits[0].object.material;
      material.color.set(Math.random() * 0xffffff);
      hits[0].object.scale.multiplyScalar(1.15);
    }
  };

  renderer.domElement.addEventListener("click", click);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    objects.forEach((o, i) => o.rotation.y += .005 + i * .0005);
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
    renderer.domElement.removeEventListener("click", click);
    renderer.dispose();
  };
}
