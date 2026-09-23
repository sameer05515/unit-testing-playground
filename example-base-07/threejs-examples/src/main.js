import "./style.css";

import { createExample as cube } from "./examples/cube.js";
import { createExample as sphere } from "./examples/sphere.js";
import { createExample as materials } from "./examples/materials.js";
import { createExample as objects } from "./examples/objects.js";
import { createExample as orbitControls } from "./examples/orbitControls.js";
import { createExample as texture } from "./examples/texture.js";
import { createExample as text3d } from "./examples/text3d.js";
import { createExample as gltf } from "./examples/gltf.js";
import { createExample as raycaster } from "./examples/raycaster.js";
import { createExample as particles } from "./examples/particles.js";
import { createExample as solarSystem } from "./examples/solarSystem.js";
import { createExample as shadows } from "./examples/shadows.js";

const examples = {
  "Rotating Cube": [cube, "Scene, camera, renderer, geometry, material and animation loop."],
  "Sphere": [sphere, "SphereGeometry and smooth rotation."],
  "Materials & Lighting": [materials, "Ambient, directional, point light and different materials."],
  "Multiple Objects": [objects, "Creating and animating multiple meshes in one scene."],
  "Orbit Controls": [orbitControls, "Mouse/touch camera navigation with OrbitControls."],
  "Texture": [texture, "Loading and applying an image texture."],
  "3D Text": [text3d, "TextGeometry with FontLoader."],
  "GLTF Model": [gltf, "Loading a GLB/GLTF model from the Three.js examples CDN."],
  "Raycaster / Mouse Picking": [raycaster, "Click objects using Raycaster."],
  "Particles": [particles, "Thousands of points rendered using Points."],
  "Animated Solar System": [solarSystem, "Sun, Earth and Moon with orbital animation."],
  "Basic Shadows": [shadows, "Directional light and real-time shadows."]
};

const select = document.querySelector("#exampleSelect");
const container = document.querySelector("#sceneContainer");
const description = document.querySelector("#description");

Object.keys(examples).forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  select.appendChild(option);
});

let cleanup = null;

function load(name) {
  if (cleanup) cleanup();
  container.replaceChildren();
  description.textContent = examples[name][1];
  cleanup = examples[name][0](container);
}

select.addEventListener("change", e => load(e.target.value));
load(select.value);
