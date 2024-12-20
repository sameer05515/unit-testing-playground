const { createServer } = require('http');

// Create a simple HTTP server
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Animated Sphere</title>
      <style>
        body {
          margin: 0;
          overflow: hidden;
        }
        canvas {
          display: block;
        }
      </style>
    </head>
    <body>
      <script type="module">
        import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75, 
          window.innerWidth / window.innerHeight, 
          0.1, 
          1000
        );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1); // Set black background
        document.body.appendChild(renderer.domElement);

        // Sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);

        // Camera positioning
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          sphere.rotation.x += 0.01;
          sphere.rotation.y += 0.01;
          renderer.render(scene, camera);
        };

        animate();

        // Handle window resizing
        window.addEventListener('resize', () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        });
      </script>
    </body>
    </html>
  `);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
