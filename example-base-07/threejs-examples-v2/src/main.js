import "./style.css";

import { createExample as cube } from "./examples/01-cube.js";
import { createExample as sphere } from "./examples/02-sphere.js";
import { createExample as orbit } from "./examples/03-orbit-controls.js";
import { createExample as texture } from "./examples/04-texture.js";
import { createExample as text3d } from "./examples/05-text-3d.js";
import { createExample as gltf } from "./examples/06-gltf.js";
import { createExample as mixer } from "./examples/07-animation-mixer.js";
import { createExample as raycaster } from "./examples/08-raycaster.js";
import { createExample as particles } from "./examples/09-particles.js";
import { createExample as solar } from "./examples/10-solar-system.js";
import { createExample as shadows } from "./examples/11-shadows.js";
import { createExample as cameras } from "./examples/12-multiple-cameras.js";
import { createExample as drag } from "./examples/13-drag-controls.js";
import { createExample as labels } from "./examples/14-html-labels.js";
import { createExample as ui3d } from "./examples/15-responsive-3d-ui.js";
import { createExample as shader } from "./examples/16-shader-material.js";
import { createExample as terrain } from "./examples/17-procedural-terrain.js";
import { createExample as post } from "./examples/18-post-processing.js";
import { createExample as instances } from "./examples/19-instanced-mesh.js";
import { createExample as dashboard } from "./examples/20-3d-dashboard.js";

const examples = {
  "01 - Rotating Cube": [cube, "Basic scene, camera, renderer, geometry, material and animation."],
  "02 - Sphere + Lighting": [sphere, "Standard material with ambient and directional lighting."],
  "03 - Orbit Controls": [orbit, "Interactive camera controls."],
  "04 - Texture": [texture, "Loading and applying an image texture."],
  "05 - 3D Text": [text3d, "FontLoader and TextGeometry."],
  "06 - GLTF / GLB Model": [gltf, "Loading a real 3D GLTF model."],
  "07 - Animation Mixer": [mixer, "GLTF animation playback with AnimationMixer."],
  "08 - Raycaster": [raycaster, "Mouse click object selection."],
  "09 - Particles": [particles, "BufferGeometry and Points."],
  "10 - Solar System": [solar, "Nested objects and orbital animation."],
  "11 - Shadows": [shadows, "Real-time directional-light shadows."],
  "12 - Multiple Cameras": [cameras, "Switch between perspective and orthographic cameras."],
  "13 - Drag Controls": [drag, "Drag 3D objects using the mouse."],
  "14 - HTML Labels": [labels, "CSS2DRenderer labels attached to 3D objects."],
  "15 - Responsive 3D UI": [ui3d, "Resize-aware 3D scene with an overlay control."],
  "16 - Custom Shader": [shader, "Vertex/fragment shader material."],
  "17 - Procedural Terrain": [terrain, "Generate terrain vertices programmatically."],
  "18 - Post Processing": [post, "EffectComposer and UnrealBloomPass."],
  "19 - Instanced Mesh": [instances, "Render thousands of meshes efficiently."],
  "20 - 3D Dashboard": [dashboard, "Interactive dashboard-style 3D visualization."]
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
