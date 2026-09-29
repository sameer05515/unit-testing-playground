import * as THREE from "three";

export function createExample(container) {
  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x020617);
  const camera=new THREE.PerspectiveCamera(60,container.clientWidth/container.clientHeight,.1,100);
  camera.position.z=4;
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(container.clientWidth,container.clientHeight);container.appendChild(renderer.domElement);

  const material=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      void main(){
        vUv=uv;
        vec3 p=position;
        p.z += sin(p.x*5.0+uTime)*0.12;
        p.z += cos(p.y*5.0+uTime)*0.12;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
      }`,
    fragmentShader:`
      varying vec2 vUv;
      void main(){
        gl_FragColor=vec4(vUv.x,0.35+vUv.y*0.6,1.0,1.0);
      }`
  });
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(4,4,100,100),material);
  scene.add(mesh);

  let running=true;
  function animate(t){if(!running)return;requestAnimationFrame(animate);material.uniforms.uTime.value=t*.002;renderer.render(scene,camera);}
  const resize=()=>{camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();renderer.setSize(container.clientWidth,container.clientHeight);};
  window.addEventListener("resize",resize);animate(0);
  return()=>{running=false;window.removeEventListener("resize",resize);renderer.dispose();};
}
