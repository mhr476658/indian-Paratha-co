import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, RotateCw, Play, Pause, Flame, Info } from 'lucide-react';

export const SpiceCanvas3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePreset, setActivePreset] = useState<'spices' | 'chai' | 'embers'>('spices');
  const [isRotating, setIsRotating] = useState(true);
  const [isInteractive, setIsInteractive] = useState(true);
  const [hoveredSpice, setHoveredSpice] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d13, 0.04);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfff1dc, 0.9);
    scene.add(ambientLight);

    const warmPointLight = new THREE.PointLight(0xd4af37, 3.5, 20);
    warmPointLight.position.set(2, 4, 3);
    scene.add(warmPointLight);

    const terracottaLight = new THREE.PointLight(0xa4492d, 2.8, 15);
    terracottaLight.position.set(-3, -1, 2);
    scene.add(terracottaLight);

    const rimLight = new THREE.DirectionalLight(0xffecd1, 1.2);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // 5. Create 3D Meshes Group
    const spiceGroup = new THREE.Group();
    scene.add(spiceGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
    });

    const cardamomMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a7a40,
      roughness: 0.6,
      metalness: 0.1,
    });

    const cinnamonMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c381f,
      roughness: 0.75,
      metalness: 0.05,
    });

    const starAniseMaterial = new THREE.MeshStandardMaterial({
      color: 0x4e2311,
      roughness: 0.65,
      metalness: 0.15,
    });

    const clayKulhadMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b4e34,
      roughness: 0.85,
      metalness: 0.0,
    });

    const brassPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89d58,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Central 3D Handcrafted Brass Platter & Clay Kulhad Base
    const plateGeo = new THREE.CylinderGeometry(2.2, 2.0, 0.12, 48);
    const brassPlate = new THREE.Mesh(plateGeo, brassPlateMaterial);
    brassPlate.position.set(0, -1.1, 0);
    spiceGroup.add(brassPlate);

    const plateRimGeo = new THREE.TorusGeometry(2.15, 0.06, 16, 48);
    plateRimGeo.rotateX(Math.PI / 2);
    const plateRim = new THREE.Mesh(plateRimGeo, goldMaterial);
    plateRim.position.set(0, -1.04, 0);
    spiceGroup.add(plateRim);

    // Handcrafted Clay Kulhad
    const kulhadGroup = new THREE.Group();
    const kulhadGeo = new THREE.CylinderGeometry(0.55, 0.4, 1.1, 32);
    const kulhadMesh = new THREE.Mesh(kulhadGeo, clayKulhadMaterial);
    kulhadGroup.add(kulhadMesh);

    // Chai surface inside Kulhad
    const chaiGeo = new THREE.CircleGeometry(0.52, 24);
    chaiGeo.rotateX(-Math.PI / 2);
    const chaiMat = new THREE.MeshStandardMaterial({
      color: 0x9e5f38,
      roughness: 0.2,
      metalness: 0.1,
    });
    const chaiSurface = new THREE.Mesh(chaiGeo, chaiMat);
    chaiSurface.position.y = 0.45;
    kulhadGroup.add(chaiSurface);

    kulhadGroup.position.set(0, -0.5, 0);
    spiceGroup.add(kulhadGroup);

    // Floating 3D Spice Objects
    const floatingSpices: { mesh: THREE.Mesh | THREE.Group; rotSpeed: { x: number; y: number; z: number }; floatSpeed: number; floatOffset: number; name: string }[] = [];

    // 1. Star Anise (Custom composite 8-point petal star)
    const starAnise = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const petalGeo = new THREE.ConeGeometry(0.12, 0.55, 6);
      petalGeo.rotateZ(-Math.PI / 2);
      const petal = new THREE.Mesh(petalGeo, starAniseMaterial);
      petal.position.set(Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0);
      petal.rotation.z = angle;
      starAnise.add(petal);
    }
    const starCenterGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const starCenter = new THREE.Mesh(starCenterGeo, starAniseMaterial);
    starAnise.add(starCenter);
    starAnise.position.set(-1.6, 0.6, 0.8);
    spiceGroup.add(starAnise);
    floatingSpices.push({
      mesh: starAnise,
      rotSpeed: { x: 0.008, y: 0.012, z: 0.005 },
      floatSpeed: 1.6,
      floatOffset: 0,
      name: 'Star Anise (Chakra Phool)',
    });

    // 2. Cinnamon Sticks (Curved rolled cylinders)
    const cinnamon1 = new THREE.Group();
    const stick1Geo = new THREE.CylinderGeometry(0.09, 0.09, 1.4, 16, 1, true);
    const stick1 = new THREE.Mesh(stick1Geo, cinnamonMaterial);
    stick1.rotation.z = 0.6;
    stick1.rotation.x = 0.4;
    cinnamon1.add(stick1);
    cinnamon1.position.set(1.5, 0.8, 0.6);
    spiceGroup.add(cinnamon1);
    floatingSpices.push({
      mesh: cinnamon1,
      rotSpeed: { x: 0.006, y: 0.009, z: 0.004 },
      floatSpeed: 1.4,
      floatOffset: 1.2,
      name: 'Ceylon Cinnamon (Dalchini)',
    });

    // 3. Green Cardamom Pods (Elaichi)
    for (let i = 0; i < 3; i++) {
      const elaichiGeo = new THREE.SphereGeometry(0.16, 12, 10);
      elaichiGeo.scale(1, 1.8, 1);
      const elaichi = new THREE.Mesh(elaichiGeo, cardamomMaterial);
      const angles = [1.2, 3.4, 5.2];
      const radius = 1.4 + i * 0.3;
      elaichi.position.set(
        Math.cos(angles[i]) * radius,
        -0.2 + i * 0.4,
        Math.sin(angles[i]) * radius
      );
      spiceGroup.add(elaichi);
      floatingSpices.push({
        mesh: elaichi,
        rotSpeed: { x: 0.01, y: 0.015, z: 0.008 },
        floatSpeed: 2.0 + i * 0.3,
        floatOffset: i * 1.5,
        name: 'Green Cardamom (Hari Elaichi)',
      });
    }

    // 4. Cloves (Laung)
    for (let i = 0; i < 4; i++) {
      const cloveGroup = new THREE.Group();
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.3, 8);
      const stem = new THREE.Mesh(stemGeo, starAniseMaterial);
      cloveGroup.add(stem);
      const headGeo = new THREE.SphereGeometry(0.07, 8, 8);
      headGeo.scale(1.2, 0.9, 1.2);
      const head = new THREE.Mesh(headGeo, starAniseMaterial);
      head.position.y = 0.18;
      cloveGroup.add(head);

      const angle = (i * Math.PI) / 2 + 0.5;
      cloveGroup.position.set(Math.cos(angle) * 1.8, 0.2 + (i % 2) * 0.5, Math.sin(angle) * 1.8);
      spiceGroup.add(cloveGroup);
      floatingSpices.push({
        mesh: cloveGroup,
        rotSpeed: { x: 0.012, y: 0.018, z: 0.009 },
        floatSpeed: 1.8 + i * 0.2,
        floatOffset: i * 0.9,
        name: 'Aromatic Clove (Laung)',
      });
    }

    // 6. Glowing Spice Embers & Golden Saffron Particles
    const particleCount = 120;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const emberParticles = new THREE.Points(particlesGeo, particleMat);
    scene.add(emberParticles);

    // 7. Aromatic Chai Steam Particles
    const steamCount = 35;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPositions[i * 3 + 1] = 0.5 + Math.random() * 2.0;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      color: 0xfff5e6,
      size: 0.15,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    kulhadGroup.add(steamParticles);

    // Mouse & Touch interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = y * 0.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInteractive || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.9;
      targetRotX = y * 0.6;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / group rotation with lerp
      if (isRotating) {
        spiceGroup.rotation.y += 0.005;
      }
      spiceGroup.rotation.y += (targetRotY - (spiceGroup.rotation.y % (Math.PI * 2))) * 0.05;
      spiceGroup.rotation.x += (targetRotX - spiceGroup.rotation.x) * 0.05;

      // Animate floating spices
      floatingSpices.forEach((spice) => {
        spice.mesh.rotation.x += spice.rotSpeed.x;
        spice.mesh.rotation.y += spice.rotSpeed.y;
        spice.mesh.rotation.z += spice.rotSpeed.z;
        spice.mesh.position.y += Math.sin(elapsedTime * spice.floatSpeed + spice.floatOffset) * 0.002;
      });

      // Animate steam rising
      const steamPos = steamParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        steamPos[i * 3 + 1] += 0.012;
        steamPos[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.002;
        if (steamPos[i * 3 + 1] > 2.6) {
          steamPos[i * 3 + 1] = 0.5;
          steamPos[i * 3] = (Math.random() - 0.5) * 0.3;
        }
      }
      steamParticles.geometry.attributes.position.needsUpdate = true;

      // Animate golden embers
      const emberPos = emberParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        emberPos[i * 3 + 1] += 0.006;
        if (emberPos[i * 3 + 1] > 3) {
          emberPos[i * 3 + 1] = -3;
        }
      }
      emberParticles.geometry.attributes.position.needsUpdate = true;
      emberParticles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating, isInteractive]);

  return (
    <section
      id="3d-experience"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#120D09] via-[#21150E] to-[#120D09] text-white relative overflow-hidden border-y border-[#D4AF37]/20"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#A4492D]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#E6CA85] font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SENSORY CULINARY 3D EXPERIENCE
            </span>
            <span className="w-8 h-[1.5px] bg-[#E6CA85]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FFFFFF] mb-4">
            Interactive <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#E6CA85] to-[#D4AF37]">Spice &amp; Chai</span> Canvas
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Drag, tilt, or rotate to explore our heirloom whole spices: aromatic green cardamom, cinnamon quills, star anise, and slow-brewed clay kulhad chai crafted fresh daily.
          </p>
        </div>

        {/* 3D Canvas Stage Container */}
        <div className="relative w-full h-[440px] sm:h-[540px] lg:h-[600px] rounded-3xl bg-gradient-to-b from-[#121620]/95 via-[#0B0D13]/98 to-[#05060A] border border-[#E6CA85]/35 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Canvas Mount */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Controls Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-20">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all backdrop-blur-xl border cursor-pointer ${
                isRotating
                  ? 'bg-[#E6CA85]/20 border-[#E6CA85] text-[#E6CA85]'
                  : 'bg-black/50 border-white/20 text-slate-300 hover:text-white'
              }`}
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRotating ? 'Auto Orbiting' : 'Paused'}</span>
            </button>

            <button
              onClick={() => setIsInteractive(!isInteractive)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all backdrop-blur-xl border cursor-pointer ${
                isInteractive
                  ? 'bg-[#C9184A]/25 border-[#C9184A] text-rose-200'
                  : 'bg-black/50 border-white/20 text-slate-300'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isInteractive ? 'Interactive Touch/Mouse ON' : 'Static'}</span>
            </button>
          </div>

          {/* Bottom Badge Showcase */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-2xl z-20 text-xs">
            <div className="flex items-center gap-3 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6CA85] animate-pulse" />
              <span className="font-serif italic text-slate-100 text-sm">
                "Pure Whole Spices, Roasted on Cast Iron &amp; Brewed in Terracotta Kulhads"
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#C9184A]" />
                Live Cast-Iron Tawa
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline text-[#E6CA85]">Zero Artificial Flavours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
