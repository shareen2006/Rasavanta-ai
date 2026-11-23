import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Thermometer, 
  Clock, 
  Sparkles, 
  Eye, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Interactive3DCookingStudio = ({ recipe }) => {
  const mountRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Studio state
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [cameraPreset, setCameraPreset] = useState('isometric');
  const [timerRemaining, setTimerRemaining] = useState(15);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const instructions = recipe?.instructions || [
    { step: 1, title: 'Dice Aromatics', text: 'Chop onions and tomatoes into uniform pieces.', timerSeconds: 15 },
    { step: 2, title: 'Heat Pan & Temper', text: 'Add oil to pan and crackle cumin seeds.', timerSeconds: 15 },
    { step: 3, title: 'Sauté Aromatics', text: 'Stir-fry onions and ginger-garlic paste until golden.', timerSeconds: 20 },
    { step: 4, title: 'Simmer Tomato Puree', text: 'Pour in tomato puree and cook until oil separates.', timerSeconds: 25 },
    { step: 5, title: 'Add Main Ingredient', text: 'Gently fold in fresh paneer cubes and spices.', timerSeconds: 20 },
    { step: 6, title: 'Slow Simmer & Garnish', text: 'Simmer on low flame and finish with fresh coriander.', timerSeconds: 15 }
  ];

  const currentStep = instructions[currentStepIdx] || instructions[0];

  // Derive step action type
  const getStepAction = (stepText = '', stepTitle = '') => {
    const combined = `${stepTitle} ${stepText}`.toLowerCase();
    if (combined.includes('chop') || combined.includes('dice') || combined.includes('slice') || combined.includes('prep') || combined.includes('cut')) {
      return 'CHOPPING';
    }
    if (combined.includes('temper') || combined.includes('heat oil') || combined.includes('crackle') || combined.includes('mustard') || combined.includes('cumin')) {
      return 'TEMPERING';
    }
    if (combined.includes('saute') || combined.includes('fry') || combined.includes('stir') || combined.includes('brown')) {
      return 'SAUTEING';
    }
    if (combined.includes('puree') || combined.includes('gravy') || combined.includes('sauce') || combined.includes('tomato')) {
      return 'GRAVY';
    }
    if (combined.includes('paneer') || combined.includes('chicken') || combined.includes('mushroom') || combined.includes('rice') || combined.includes('add')) {
      return 'FOLDING';
    }
    if (combined.includes('simmer') || combined.includes('slow') || combined.includes('cook') || combined.includes('boil')) {
      return 'SIMMERING';
    }
    return 'GARNISH';
  };

  const actionType = getStepAction(currentStep.text, currentStep.title);

  // Simulated Pan Temperatures based on technique
  const getPanTemperature = () => {
    switch (actionType) {
      case 'CHOPPING': return { temp: 'Room Temp 24°C', flame: 'Flame OFF', heatLevel: 0 };
      case 'TEMPERING': return { temp: '190°C Medium-High', flame: 'Active Flame', heatLevel: 80 };
      case 'SAUTEING': return { temp: '175°C Sauté Heat', flame: 'Medium Flame', heatLevel: 70 };
      case 'GRAVY': return { temp: '140°C Reduction', flame: 'Medium Flame', heatLevel: 60 };
      case 'FOLDING': return { temp: '115°C Gentle Heat', flame: 'Low-Medium Flame', heatLevel: 45 };
      case 'SIMMERING': return { temp: '95°C Gentle Simmer', flame: 'Low Flame', heatLevel: 30 };
      default: return { temp: '65°C Resting Warmth', flame: 'Flame OFF', heatLevel: 10 };
    }
  };

  const { temp, flame, heatLevel } = getPanTemperature();

  // Web Audio Synthesizer (Sizzling, Chopping, Bubbling)
  const playSoundEffect = (type) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      if (type === 'CHOPPING') {
        // Crisp wood-knife thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'TEMPERING' || type === 'SAUTEING') {
        // High-frequency sizzle noise
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3200;
        filter.Q.value = 1.8;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'GRAVY' || type === 'SIMMERING') {
        // Low bubbling pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (err) {
      console.warn('Audio synthesis unavailable:', err.message);
    }
  };

  // Auto-play timer loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            // Next step
            setCurrentStepIdx((idx) => (idx + 1) % instructions.length);
            return instructions[(currentStepIdx + 1) % instructions.length]?.timerSeconds || 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIdx, instructions]);

  // Audio trigger on step change
  useEffect(() => {
    playSoundEffect(actionType);
    setTimerRemaining(currentStep.timerSeconds || 15);
  }, [currentStepIdx, actionType]);

  // ── THREE.JS WEBGL RENDERER & INTERACTIVE 3D SCENE ───────────────────────
  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer, animId;
    let panMesh, sauceMesh, flameMesh, knifeMesh, boardMesh, spatulaMesh;
    let particleSteam, foodCubes = [];
    let isDragging = false;
    let prevMouseX = 0, prevMouseY = 0;
    let targetRotationX = 0.45;
    let targetRotationY = -0.55;
    let targetDistance = 7.5;

    try {
      const width = mountRef.current.clientWidth || 800;
      const height = mountRef.current.clientHeight || 480;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x131a15); // Deep culinary emerald-slate

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(5.5, 4.5, 6.0);
      camera.lookAt(0, 0.4, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Clear any prior canvas
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);

      // ── LIGHTING ─────────────────────────────────────────────────────────
      const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
      scene.add(ambientLight);

      const pendantLight = new THREE.DirectionalLight(0xffecd2, 2.5);
      pendantLight.position.set(4, 9, 5);
      pendantLight.castShadow = true;
      pendantLight.shadow.mapSize.width = 1024;
      pendantLight.shadow.mapSize.height = 1024;
      scene.add(pendantLight);

      const rimLight = new THREE.PointLight(0xd99a38, 1.8, 12);
      rimLight.position.set(-4, 3, -3);
      scene.add(rimLight);

      const burnerGlow = new THREE.PointLight(0xff5722, 0, 5);
      burnerGlow.position.set(0, 0.1, 0);
      scene.add(burnerGlow);

      // ── COUNTERTOP ───────────────────────────────────────────────────────
      const counterGeo = new THREE.BoxGeometry(11, 0.4, 8);
      const counterMat = new THREE.MeshStandardMaterial({
        color: 0x1e2621,
        roughness: 0.35,
        metalness: 0.15
      });
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.y = -0.2;
      counter.receiveShadow = true;
      scene.add(counter);

      // ── STOVE BURNER ─────────────────────────────────────────────────────
      const stoveGeo = new THREE.CylinderGeometry(1.6, 1.65, 0.08, 48);
      const stoveMat = new THREE.MeshStandardMaterial({
        color: 0x0d120f,
        roughness: 0.25,
        metalness: 0.8
      });
      const stove = new THREE.Mesh(stoveGeo, stoveMat);
      stove.position.set(0, 0.04, 0);
      scene.add(stove);

      // Animated Blue/Orange Flame ring
      const flameGeo = new THREE.TorusGeometry(1.3, 0.06, 16, 48);
      const flameMat = new THREE.MeshBasicMaterial({
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.0
      });
      flameMesh = new THREE.Mesh(flameGeo, flameMat);
      flameMesh.rotation.x = Math.PI / 2;
      flameMesh.position.y = 0.09;
      scene.add(flameMesh);

      // ── KADHAI / PAN ─────────────────────────────────────────────────────
      // Curved deep skillet bowl
      const panRadius = 1.45;
      const panHeight = 0.75;
      const panGeo = new THREE.CylinderGeometry(panRadius, panRadius * 0.72, panHeight, 48, 1, true);
      const panMat = new THREE.MeshStandardMaterial({
        color: 0x2b332d,
        metalness: 0.85,
        roughness: 0.28,
        side: THREE.DoubleSide
      });
      panMesh = new THREE.Mesh(panGeo, panMat);
      panMesh.position.set(0, panHeight / 2 + 0.1, 0);
      panMesh.castShadow = true;
      panMesh.receiveShadow = true;
      scene.add(panMesh);

      // Base plate for pan
      const panBaseGeo = new THREE.CircleGeometry(panRadius * 0.72, 32);
      const panBase = new THREE.Mesh(panBaseGeo, panMat);
      panBase.rotation.x = Math.PI / 2;
      panBase.position.y = 0.1;
      scene.add(panBase);

      // Brass Handles on pan
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xd99a38, metalness: 0.9, roughness: 0.3 });
      const handleL = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 12, 24, Math.PI), handleMat);
      handleL.rotation.z = Math.PI / 2;
      handleL.position.set(-panRadius - 0.1, panHeight + 0.02, 0);
      scene.add(handleL);

      const handleR = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 12, 24, Math.PI), handleMat);
      handleR.rotation.z = -Math.PI / 2;
      handleR.position.set(panRadius + 0.1, panHeight + 0.02, 0);
      scene.add(handleR);

      // ── GRAVY / SAUCE IN PAN ─────────────────────────────────────────────
      const sauceGeo = new THREE.CircleGeometry(panRadius * 0.88, 36);
      const sauceMat = new THREE.MeshStandardMaterial({
        color: 0xc83a24, // Vibrant tomato-onion masala red/orange
        roughness: 0.25,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92
      });
      sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
      sauceMesh.rotation.x = -Math.PI / 2;
      sauceMesh.position.set(0, 0.45, 0);
      scene.add(sauceMesh);

      // ── WOODEN SPATULA IN PAN ────────────────────────────────────────────
      const spatulaHandleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
      const spatulaHeadGeo = new THREE.BoxGeometry(0.24, 0.02, 0.45);
      const spatulaMat = new THREE.MeshStandardMaterial({ color: 0xb57842, roughness: 0.6 });
      
      spatulaMesh = new THREE.Group();
      const sHandle = new THREE.Mesh(spatulaHandleGeo, spatulaMat);
      sHandle.position.y = 0.9;
      const sHead = new THREE.Mesh(spatulaHeadGeo, spatulaMat);
      sHead.position.y = 0.1;
      spatulaMesh.add(sHandle);
      spatulaMesh.add(sHead);
      spatulaMesh.rotation.z = -0.55;
      spatulaMesh.position.set(0.4, 0.4, 0.3);
      scene.add(spatulaMesh);

      // ── CUTTING BOARD & KNIFE (FOR CHOPPING STEPS) ────────────────────────
      const boardGeo = new THREE.BoxGeometry(2.4, 0.12, 1.8);
      const boardMat = new THREE.MeshStandardMaterial({ color: 0x8a542e, roughness: 0.55 });
      boardMesh = new THREE.Mesh(boardGeo, boardMat);
      boardMesh.position.set(-2.8, 0.06, 0.4);
      boardMesh.castShadow = true;
      boardMesh.receiveShadow = true;
      scene.add(boardMesh);

      // Chef's Knife
      knifeMesh = new THREE.Group();
      const bladeGeo = new THREE.BoxGeometry(1.2, 0.22, 0.015);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.95, roughness: 0.1 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.x = 0.6;

      const knifeHandleGeo = new THREE.BoxGeometry(0.45, 0.1, 0.04);
      const kHandleMat = new THREE.MeshStandardMaterial({ color: 0x1f140e, roughness: 0.7 });
      const kHandle = new THREE.Mesh(knifeHandleGeo, kHandleMat);
      kHandle.position.x = -0.15;

      knifeMesh.add(blade);
      knifeMesh.add(kHandle);
      knifeMesh.position.set(-2.8, 0.45, 0.4);
      scene.add(knifeMesh);

      // Chopping Vegetables on board (Tomato & Onion halves)
      const tomatoGeo = new THREE.SphereGeometry(0.24, 16, 12);
      const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xd93829, roughness: 0.3 });
      const tomatoHalf = new THREE.Mesh(tomatoGeo, tomatoMat);
      tomatoHalf.scale.set(1, 0.6, 1);
      tomatoHalf.position.set(-3.2, 0.18, 0.5);
      boardMesh.add(tomatoHalf);

      const onionGeo = new THREE.SphereGeometry(0.22, 16, 12);
      const onionMat = new THREE.MeshStandardMaterial({ color: 0x7a3055, roughness: 0.4 });
      const onionHalf = new THREE.Mesh(onionGeo, onionMat);
      onionHalf.scale.set(1, 0.6, 1);
      onionHalf.position.set(-2.4, 0.18, 0.3);
      boardMesh.add(onionHalf);

      // ── PANEER / INGREDIENT CUBES (IN PAN) ────────────────────────────────
      const cubeGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
      const paneerMat = new THREE.MeshStandardMaterial({
        color: 0xfffaed,
        roughness: 0.4,
        metalness: 0.05
      });

      for (let i = 0; i < 7; i++) {
        const cube = new THREE.Mesh(cubeGeo, paneerMat);
        const angle = (i / 7) * Math.PI * 2;
        const dist = 0.35 + (i % 3) * 0.22;
        cube.position.set(Math.cos(angle) * dist, 0.52, Math.sin(angle) * dist);
        cube.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4);
        cube.castShadow = true;
        scene.add(cube);
        foodCubes.push({
          mesh: cube,
          baseY: 0.52,
          targetY: 0.52,
          speed: 0.04 + i * 0.01,
          falling: false
        });
      }

      // ── RISING STEAM PARTICLE SYSTEM ──────────────────────────────────────
      const steamCount = 36;
      const steamGeo = new THREE.BufferGeometry();
      const steamPositions = new Float32Array(steamCount * 3);
      for (let i = 0; i < steamCount * 3; i += 3) {
        steamPositions[i] = (Math.random() - 0.5) * 1.5;
        steamPositions[i + 1] = 0.6 + Math.random() * 1.8;
        steamPositions[i + 2] = (Math.random() - 0.5) * 1.5;
      }
      steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

      const steamMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.18,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
      });
      particleSteam = new THREE.Points(steamGeo, steamMat);
      scene.add(particleSteam);

      // ── TOUCH & MOUSE ORBIT CONTROLS ─────────────────────────────────────
      const handlePointerDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      };

      const handlePointerMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;

        targetRotationY += deltaX * 0.007;
        targetRotationX = Math.max(0.15, Math.min(1.2, targetRotationX + deltaY * 0.007));

        prevMouseX = clientX;
        prevMouseY = clientY;
      };

      const handlePointerUp = () => {
        isDragging = false;
      };

      const handleWheel = (e) => {
        e.preventDefault();
        targetDistance = Math.max(4.0, Math.min(12.0, targetDistance + e.deltaY * 0.008));
      };

      const dom = mountRef.current;
      dom.addEventListener('mousedown', handlePointerDown);
      dom.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);
      dom.addEventListener('wheel', handleWheel, { passive: false });

      // ── ANIMATION FRAME RENDER LOOP ──────────────────────────────────────
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth camera dampening
        const curDist = targetDistance;
        camera.position.x = Math.sin(targetRotationY) * Math.cos(targetRotationX) * curDist;
        camera.position.y = Math.sin(targetRotationX) * curDist + 0.5;
        camera.position.z = Math.cos(targetRotationY) * Math.cos(targetRotationX) * curDist;
        camera.lookAt(0, 0.45, 0);

        // Flame and Burner Glow Animation based on Heat
        if (heatLevel > 0) {
          burnerGlow.intensity = (heatLevel / 100) * (2.2 + Math.sin(elapsedTime * 12) * 0.4);
          flameMesh.material.opacity = Math.min(0.85, (heatLevel / 100) * 0.9);
          flameMesh.material.color.setHex(heatLevel > 65 ? 0x00d2ff : 0xff7043);
        } else {
          burnerGlow.intensity = 0;
          flameMesh.material.opacity = 0;
        }

        // Action-specific dynamic visual updates
        if (actionType === 'CHOPPING') {
          // Cutting board & knife active
          boardMesh.visible = true;
          knifeMesh.visible = true;
          // Animate rhythmic chopping rocking motion
          knifeMesh.rotation.z = Math.sin(elapsedTime * 6) * 0.35;
          knifeMesh.position.y = 0.45 + Math.abs(Math.sin(elapsedTime * 6)) * 0.12;

          sauceMesh.material.opacity = 0.0;
          spatulaMesh.visible = false;
          foodCubes.forEach((c) => (c.mesh.visible = false));
        } else {
          knifeMesh.visible = false;
          spatulaMesh.visible = true;

          // Stirring Spatula Animation
          if (actionType === 'SAUTEING' || actionType === 'TEMPERING' || actionType === 'GRAVY') {
            const stirAngle = elapsedTime * 3.5;
            spatulaMesh.position.x = Math.cos(stirAngle) * 0.45;
            spatulaMesh.position.z = Math.sin(stirAngle) * 0.45;
            spatulaMesh.rotation.y = stirAngle;
          }

          // Sauce Appearance & Simmer Bubbles
          if (actionType === 'TEMPERING') {
            sauceMesh.material.opacity = 0.5;
            sauceMesh.material.color.setHex(0xd4af37); // Golden oil
            foodCubes.forEach((c) => (c.mesh.visible = false));
          } else if (actionType === 'SAUTEING') {
            sauceMesh.material.opacity = 0.75;
            sauceMesh.material.color.setHex(0xb87333); // Caramelized onions
            foodCubes.forEach((c) => (c.mesh.visible = false));
          } else if (actionType === 'GRAVY') {
            sauceMesh.material.opacity = 0.92;
            sauceMesh.material.color.setHex(0xd93829); // Rich red tomato gravy
            // Gravy surface wave / bubbling displacement
            sauceMesh.position.y = 0.45 + Math.sin(elapsedTime * 8) * 0.015;
            foodCubes.forEach((c) => (c.mesh.visible = false));
          } else {
            // FOLDING / SIMMERING / GARNISH
            sauceMesh.material.opacity = 0.95;
            sauceMesh.material.color.setHex(0xc83a24);
            sauceMesh.position.y = 0.45 + Math.sin(elapsedTime * 5) * 0.01;

            // Display and animate paneer/ingredient cubes
            foodCubes.forEach((c, i) => {
              c.mesh.visible = true;
              c.mesh.position.y = c.baseY + Math.sin(elapsedTime * 3 + i) * 0.012;
            });
          }
        }

        // Translucent Steam Particle Rising & Swaying
        if (heatLevel > 30) {
          particleSteam.visible = true;
          const pos = particleSteam.geometry.attributes.position.array;
          for (let i = 1; i < pos.length; i += 3) {
            pos[i] += 0.018; // rise
            pos[i - 1] += Math.sin(elapsedTime + i) * 0.003; // horizontal drift
            if (pos[i] > 3.2) {
              pos[i] = 0.55;
              pos[i - 1] = (Math.random() - 0.5) * 1.2;
              pos[i + 1] = (Math.random() - 0.5) * 1.2;
            }
          }
          particleSteam.geometry.attributes.position.needsUpdate = true;
        } else {
          particleSteam.visible = false;
        }

        renderer.render(scene, camera);
      };

      animate();

      // Handle Resize
      const handleResize = () => {
        if (!mountRef.current) return;
        const newW = mountRef.current.clientWidth;
        const newH = mountRef.current.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        dom.removeEventListener('mousedown', handlePointerDown);
        dom.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchend', handlePointerUp);
        dom.removeEventListener('wheel', handleWheel);
        renderer.dispose();
      };
    } catch (glErr) {
      console.warn('WebGL initialization failed, using graceful visual fallback:', glErr);
      setWebGlSupported(false);
    }
  }, [actionType, heatLevel]);

  // Camera Presets
  const applyCameraPreset = (preset) => {
    setCameraPreset(preset);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#131A15] border-2 border-[#D99A38]/40 shadow-card-hover text-white">
      {/* ── 3D CANVAS VIEWPORT ────────────────────────────────────────── */}
      <div className="relative aspect-16/10 sm:aspect-16/9 w-full min-h-[380px] sm:min-h-[460px] overflow-hidden select-none cursor-grab active:cursor-grabbing">
        {webGlSupported ? (
          <div ref={mountRef} className="h-full w-full" />
        ) : (
          /* Graceful Fallback for non-WebGL environments */
          <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#19241D] to-[#0E1511]">
            <div className="h-20 w-20 rounded-full bg-[#244B39] flex items-center justify-center mb-4 shadow-inner text-[#D99A38]">
              <Sparkles className="h-10 w-10 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <h4 className="font-serif text-xl font-bold text-white">
              Interactive Culinary Technique: {actionType}
            </h4>
            <p className="text-xs text-[#A7B99A] max-w-md mt-2">
              {currentStep.text}
            </p>
          </div>
        )}

        {/* ── OVERLAY: FLOATING CULINARY METRICS & TECHNIQUES ─────────── */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          {/* Active Step Technique Badge */}
          <span className="flex items-center gap-1.5 rounded-full bg-[#244B39]/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white border border-[#D99A38]/30 shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
            <span>Step {currentStepIdx + 1}: {actionType}</span>
          </span>

          {/* Temperature & Flame Indicator */}
          <span className="flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-medium text-white/95 border border-white/10 shadow-md">
            <Flame className={`h-3.5 w-3.5 ${heatLevel > 0 ? 'text-[#D97556] animate-pulse' : 'text-gray-400'}`} />
            <span>{temp}</span>
          </span>
        </div>

        {/* ── OVERLAY: CAMERA & AUDIO CONTROLS (TOP RIGHT) ────────────── */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:bg-black/80 hover:text-white transition shadow-md border border-white/10"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-gray-400" /> : <Volume2 className="h-4 w-4 text-[#D99A38]" />}
          </button>

          {/* Hint Overlay for Orbit */}
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] text-white/70 border border-white/10">
            <Camera className="h-3 w-3 text-[#D99A38]" />
            <span>Drag to Orbit</span>
          </span>
        </div>

        {/* ── OVERLAY: STEP INSTRUCTIONS BANNER (BOTTOM OF CANVAS) ────── */}
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 p-3.5 sm:p-4 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D99A38] uppercase tracking-wider">
                Active Step {currentStepIdx + 1} of {instructions.length}
              </span>
              <span className="text-white/40">•</span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                {currentStep.title}
              </h4>
            </div>
            <p className="text-xs text-white/80 line-clamp-2 max-w-2xl">
              {currentStep.text}
            </p>
          </div>

          {/* Timer Countdown Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-xs font-mono font-bold bg-[#244B39] px-3 py-1.5 rounded-xl border border-[#D99A38]/30">
              <Clock className="h-3.5 w-3.5 text-[#96805b]" />
              <span>{timerRemaining}s</span>
            </div>

            {/* Play/Pause Auto-step */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D99A38] text-[#131A15] font-bold hover:bg-[#e0a94e] transition shadow-md"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE TIMELINE & NAVIGATION BAR ─────────────────────── */}
      <div className="bg-[#18221C] border-t border-white/10 p-4 sm:p-6 space-y-4">
        {/* Step Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {instructions.map((step, idx) => {
            const isCurrent = idx === currentStepIdx;
            const isPast = idx < currentStepIdx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCurrentStepIdx(idx);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  isCurrent
                    ? 'bg-[#D99A38] text-[#131A15] shadow-md'
                    : isPast
                    ? 'bg-[#244B39] text-white hover:bg-[#244B39]/80'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                <span>{step.step || idx + 1}.</span>
                <span className="truncate max-w-[130px]">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next & Step Slider Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={currentStepIdx === 0}
            onClick={() => {
              setCurrentStepIdx((idx) => Math.max(0, idx - 1));
              setIsPlaying(false);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Technique</span>
          </button>

          <div className="text-center hidden sm:block">
            <span className="text-xs text-[#A7B99A]">
              Click and drag anywhere on 3D canvas to rotate view • Scroll to zoom
            </span>
          </div>

          <button
            type="button"
            disabled={currentStepIdx === instructions.length - 1}
            onClick={() => {
              setCurrentStepIdx((idx) => Math.min(instructions.length - 1, idx + 1));
              setIsPlaying(false);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#244B39] border border-[#D99A38]/40 px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1a382a] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Next Technique</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
