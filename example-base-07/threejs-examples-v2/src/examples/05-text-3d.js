import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export function createExample(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030712);
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, .1, 100);
  camera.position.set(0, 1, 8);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(2,4,6);
  scene.add(light);

  let mesh;
  new FontLoader().load("https://threejs.org/examples/fonts/helvetiker_bold.typeface.json", font => {
    const geometry = new TextGeometry("Three.js V2", {
      font, size: .8, depth: .22, curveSegments: 12, bevelEnabled: true,
      bevelThickness: .04, bevelSize: .02, bevelSegments: 4
    });
    geometry.center();
    mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: .5, roughness: .25 }));
    scene.add(mesh);
  });

  let running = true;
  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    if (mesh) mesh.rotation.y += .008;
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
