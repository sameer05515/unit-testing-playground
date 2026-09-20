import * as THREE from "three";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111827);
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.z = 4;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const texture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/uv_grid_opengl.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;
  const cube = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), new THREE.MeshBasicMaterial({ map: texture }));
  scene.add(cube);

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    cube.rotation.x += .008;
    cube.rotation.y += .012;
    renderer.render(scene, camera);
  }
  const resize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", resize);
  animate();
  return () => { running = false; window.removeEventListener("resize", resize); texture.dispose(); renderer.dispose(); };
}
