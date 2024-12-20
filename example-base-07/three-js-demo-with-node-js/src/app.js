const THREE = require('three');
const { createServer } = require('http');

// Create a basic HTTP server to serve the animation
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Animated Sphere</title>
      <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <script type="module">
        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Sphere geometry
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, wireframe: false });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Light
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);

        // Camera position
        camera.position.z = 5;

        // Animation
        const animate = () => {
          requestAnimationFrame(animate);
          sphere.rotation.x += 0.01;
          sphere.rotation.y += 0.01;
          renderer.render(scene, camera);
        };

        animate();
      </script>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
