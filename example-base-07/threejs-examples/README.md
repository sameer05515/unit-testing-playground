# Three.js Examples Playground

A beginner-friendly Vite + JavaScript project containing independent Three.js examples.

## Prerequisites

- Node.js 18+
- npm

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Examples

Use the dropdown in the application:

1. Rotating Cube
2. Sphere
3. Materials & Lighting
4. Multiple Objects
5. Orbit Controls
6. Texture
7. 3D Text
8. GLTF Model
9. Raycaster / Mouse Picking
10. Particles
11. Animated Solar System
12. Basic Shadows

## Build

```bash
npm run build
npm run preview
```

## Project structure

```text
threejs-examples/
├── src/
│   ├── examples/
│   │   ├── cube.js
│   │   ├── sphere.js
│   │   ├── materials.js
│   │   ├── objects.js
│   │   ├── orbitControls.js
│   │   ├── texture.js
│   │   ├── text3d.js
│   │   ├── gltf.js
│   │   ├── raycaster.js
│   │   ├── particles.js
│   │   ├── solarSystem.js
│   │   └── shadows.js
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── README.md
```

Each example exposes a `createExample(container)` function and can be studied independently.
