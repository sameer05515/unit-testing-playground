import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const count = 5000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - .5) * 12;
    positions[i * 3 + 1] = (Math.random() - .5) * 8;
    positions[i * 3 + 2] = (Math.random() - .5) * 8;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({ color: 0x7dd3fc, size: .035 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    points.rotation.y += .0007;
    points.rotation.x += .0002;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();

  return () => { running = false; window.removeEventListener("resize", resize); geometry.dispose(); material.dispose(); renderer.dispose(); };
}
