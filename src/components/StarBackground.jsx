import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ⭐ Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;

    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.01,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 🎮 Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 🎬 Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      stars.rotation.y += 0.0005 + mouseX * 0.002;
      stars.rotation.x += 0.0003 + mouseY * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}