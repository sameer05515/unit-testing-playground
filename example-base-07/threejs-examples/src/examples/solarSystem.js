import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000005);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 200);
  camera.position.set(0, 8, 14);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2, 48, 24),
    new THREE.MeshBasicMaterial({ color: 0xffcc33 })
  );
  scene.add(sun);

  const sunLight = new THREE.PointLight(0xffffff, 150, 100);
  scene.add(sunLight);

  const earthOrbit = new THREE.Object3D();
  scene.add(earthOrbit);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(.8, 32, 16),
    new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: .7 })
  );
  earth.position.x = 5;
  earthOrbit.add(earth);

  const moonOrbit = new THREE.Object3D();
  earth.add(moonOrbit);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(.25, 24, 12),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
  );
  moon.position.x = 1.4;
  moonOrbit.add(moon);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    earthOrbit.rotation.y += .008;
    moonOrbit.rotation.y += .04;
    earth.rotation.y += .02;
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
