/**
 * 3D Interactive LEGO® Ferrari (Speed Champions Edition)
 * Real-time procedural 3D brick-built Ferrari with authentic LEGO studs,
 * iconic Rosso Corsa livery, sloped wedge nose, quad round taillights,
 * F40-style rear wing, spinning wheels, projector headlights, and 360° drag orbit.
 * Built with Three.js (WebGL) + zero-dependency Canvas fallback.
 */

(function () {
  const canvas = document.getElementById('hero-sculpture-canvas');
  if (!canvas) return;

  function init() {
    if (typeof THREE !== 'undefined') {
      initThreeJSLegoFerrari();
    } else {
      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        if (typeof THREE !== 'undefined') {
          clearInterval(interval);
          initThreeJSLegoFerrari();
        } else if (retries > 15) {
          clearInterval(interval);
          initCanvasFallbackLego();
        }
      }, 100);
    }
  }

  // ==========================================================================
  // 1. THREE.JS HIGH-END 3D LEGO FERRARI RENDERER (WEBGL)
  // ==========================================================================
  function initThreeJSLegoFerrari() {
    const parent = canvas.parentElement;
    let width = parent.clientWidth || 460;
    let height = parent.clientHeight || 340;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(5.5, 2.8, 6.2);
    camera.lookAt(0, 0.35, 0);

    // Iconic Ferrari Livery Presets
    const LIVERY_PRESETS = [
      { name: "ROSSO CORSA", body: 0xd4001a, secondary: 0x111311, accent: 0xffd700, underglow: 0xff1e32 },
      { name: "MODENA GIALLO", body: 0xf5c400, secondary: 0x111311, accent: 0xd4001a, underglow: 0xf5c400 },
      { name: "NERO DAYTONA", body: 0x181a19, secondary: 0xd4001a, accent: 0xffd700, underglow: 0xd4001a },
      { name: "TOUR DE FRANCE", body: 0x1c4d7d, secondary: 0xf0f3f6, accent: 0xffd700, underglow: 0x7eaec7 }
    ];
    let currentLiveryIdx = 0;

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: LIVERY_PRESETS[currentLiveryIdx].body,
      roughness: 0.18,
      metalness: 0.15,
      envMapIntensity: 1.1
    });

    const blackBrickMaterial = new THREE.MeshStandardMaterial({
      color: 0x141615,
      roughness: 0.35,
      metalness: 0.25
    });

    const yellowShieldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.2,
      metalness: 0.4
    });

    const transGlassMaterial = new THREE.MeshStandardMaterial({
      color: 0x223545,
      roughness: 0.08,
      metalness: 0.85,
      transparent: true,
      opacity: 0.78
    });

    const tireRubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1e1d,
      roughness: 0.8,
      metalness: 0.05
    });

    const wheelRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd2d8dc,
      roughness: 0.22,
      metalness: 0.9
    });

    const headlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    const taillightMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1e32
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xf2f8ff, 0.95);
    scene.add(ambientLight);

    const dirLightKey = new THREE.DirectionalLight(0xfffaed, 1.5);
    dirLightKey.position.set(6, 10, 7);
    dirLightKey.castShadow = true;
    dirLightKey.shadow.mapSize.width = 1024;
    dirLightKey.shadow.mapSize.height = 1024;
    scene.add(dirLightKey);

    const dirLightFill = new THREE.DirectionalLight(0x7eaec7, 0.7);
    dirLightFill.position.set(-6, 4, -5);
    scene.add(dirLightFill);

    // Headlight Spotlights
    const leftHeadSpot = new THREE.SpotLight(0xfff7e8, 3.8, 14, Math.PI / 7, 0.4, 1.2);
    leftHeadSpot.position.set(-0.62, 0.52, 2.1);
    leftHeadSpot.target.position.set(-0.62, 0.1, 8);

    const rightHeadSpot = new THREE.SpotLight(0xfff7e8, 3.8, 14, Math.PI / 7, 0.4, 1.2);
    rightHeadSpot.position.set(0.62, 0.52, 2.1);
    rightHeadSpot.target.position.set(0.62, 0.1, 8);

    // Atmospheric Underglow PointLight
    const underglowLight = new THREE.PointLight(LIVERY_PRESETS[currentLiveryIdx].underglow, 2.2, 5.5);
    underglowLight.position.set(0, 0.18, 0);

    // ========================================================================
    // BUILD LEGO FERRARI BRICK GEOMETRY
    // ========================================================================
    const carGroup = new THREE.Group();
    scene.add(carGroup);
    carGroup.add(leftHeadSpot);
    carGroup.add(leftHeadSpot.target);
    carGroup.add(rightHeadSpot);
    carGroup.add(rightHeadSpot.target);
    carGroup.add(underglowLight);

    // Shared Reusable Stud Geometry
    const studGeo = new THREE.CylinderGeometry(0.082, 0.082, 0.045, 14);

    function addStud(parent, x, y, z, mat) {
      const stud = new THREE.Mesh(studGeo, mat || bodyMaterial);
      stud.position.set(x, y + 0.0225, z);
      stud.castShadow = true;
      parent.add(stud);
      return stud;
    }

    function createBrick(w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      if (rx) mesh.rotation.x = rx;
      if (ry) mesh.rotation.y = ry;
      if (rz) mesh.rotation.z = rz;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      carGroup.add(mesh);
      return mesh;
    }

    // 1. Black Lower Chassis Base Plate (8x24 studs scale)
    createBrick(1.88, 0.14, 4.3, blackBrickMaterial, 0, 0.25, 0);

    // 2. Front Splitter / Lower Aero Chin
    createBrick(1.94, 0.08, 0.55, blackBrickMaterial, 0, 0.18, 2.15);

    // 3. Lower Front Bumper & Radiator Intake
    createBrick(1.82, 0.22, 0.75, bodyMaterial, 0, 0.38, 1.95);
    // Center Front Grille Intake
    createBrick(0.95, 0.12, 0.08, blackBrickMaterial, 0, 0.32, 2.29);

    // Yellow Ferrari Prancing Horse Modena Shield Badge on Bumper
    createBrick(0.18, 0.14, 0.03, yellowShieldMaterial, 0, 0.44, 2.3);

    // 4. Sloped Front Hood Wedge (Ferrari Aerodynamic Nose)
    const hoodMesh = createBrick(1.72, 0.18, 1.45, bodyMaterial, 0, 0.52, 1.05, 0.11, 0, 0);

    // Hood Cooling Duct Channels (F40 / 488 Style Dual Indents)
    createBrick(0.24, 0.04, 0.7, blackBrickMaterial, -0.42, 0.59, 1.12, 0.11, 0, 0);
    createBrick(0.24, 0.04, 0.7, blackBrickMaterial, 0.42, 0.59, 1.12, 0.11, 0, 0);

    // Authentic LEGO Studs on Front Hood
    const hoodStudPositions = [
      { x: -0.65, z: 0.65 }, { x: -0.22, z: 0.65 }, { x: 0.22, z: 0.65 }, { x: 0.65, z: 0.65 },
      { x: -0.65, z: 1.35 }, { x: -0.22, z: 1.42 }, { x: 0.22, z: 1.42 }, { x: 0.65, z: 1.35 }
    ];
    hoodStudPositions.forEach((p) => {
      addStud(carGroup, p.x, 0.58 + (p.z > 1 ? -0.06 : 0.02), p.z, bodyMaterial);
    });

    // 5. Angular LEGO Headlight Blocks (Trans-Clear Tiles with Projector Glow)
    createBrick(0.32, 0.10, 0.16, headlightMaterial, -0.64, 0.50, 2.05, 0, 0.14, 0);
    createBrick(0.32, 0.10, 0.16, headlightMaterial, 0.64, 0.50, 2.05, 0, -0.14, 0);

    // 6. Cockpit & Canopy (Translucent Smoke LEGO Windshield & Roof)
    // Sloped Windshield
    createBrick(1.48, 0.08, 0.85, transGlassMaterial, 0, 0.82, 0.42, -0.45, 0, 0);

    // Cockpit Side Windows
    createBrick(0.06, 0.38, 1.45, transGlassMaterial, -0.69, 0.80, -0.18);
    createBrick(0.06, 0.38, 1.45, transGlassMaterial, 0.69, 0.80, -0.18);

    // Interior Details (Steering Wheel & Bucket Seat visible through trans-glass)
    createBrick(0.55, 0.38, 0.55, blackBrickMaterial, 0, 0.45, -0.2); // Seat base
    createBrick(0.48, 0.45, 0.12, bodyMaterial, 0, 0.72, -0.45);      // Seat back
    const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 16), blackBrickMaterial);
    steerWheel.position.set(-0.25, 0.72, 0.22);
    steerWheel.rotation.x = 0.5;
    carGroup.add(steerWheel);

    // LEGO Roof Plate with Studs
    createBrick(1.42, 0.09, 1.15, bodyMaterial, 0, 1.02, -0.32);
    // Roof Studs (2x4 array)
    for (let rx = -0.48; rx <= 0.49; rx += 0.48) {
      for (let rz = -0.72; rz <= 0.15; rz += 0.42) {
        addStud(carGroup, rx, 1.06, rz, bodyMaterial);
      }
    }

    // 7. Mid-Engine Bay & Stepped Rear Louvers (Ferrari F40 / Daytona Slat Grill)
    createBrick(1.78, 0.28, 1.45, bodyMaterial, 0, 0.52, -1.25);

    // Translucent Slat Engine Cover
    createBrick(1.05, 0.06, 0.95, transGlassMaterial, 0, 0.68, -1.25);
    // 4 Black Horizontal Louvers / Engine Slats
    for (let l = 0; l < 4; l++) {
      const zSlat = -0.92 - l * 0.22;
      createBrick(1.15, 0.035, 0.08, blackBrickMaterial, 0, 0.70, zSlat);
    }

    // Side Air Intake Scoops
    createBrick(0.15, 0.24, 0.65, blackBrickMaterial, -0.85, 0.52, -0.75);
    createBrick(0.15, 0.24, 0.65, blackBrickMaterial, 0.85, 0.52, -0.75);

    // 8. Iconic Ferrari F40 High Rear Wing & Diffuser
    // Wing Side Endplates (Red)
    createBrick(0.12, 0.48, 0.72, bodyMaterial, -0.86, 0.78, -2.05);
    createBrick(0.12, 0.48, 0.72, bodyMaterial, 0.86, 0.78, -2.05);

    // Top Wing Blade (Elevated Aero Surface)
    createBrick(1.94, 0.09, 0.48, bodyMaterial, 0, 0.98, -2.05);
    // Studs on top of Ferrari Wing (6 studs)
    [-0.72, -0.24, 0.24, 0.72].forEach((sx) => {
      addStud(carGroup, sx, 1.02, -2.05, bodyMaterial);
    });

    // Lower Rear Diffuser
    createBrick(1.85, 0.14, 0.55, blackBrickMaterial, 0, 0.24, -2.18, -0.15, 0, 0);

    // 9. Quad Round LEGO Ferrari Taillights (Signature Dual Trans-Red Cylinders)
    const tailCylGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16);
    tailCylGeo.rotateX(Math.PI / 2);

    const tailPositions = [
      { x: -0.68, y: 0.54, z: -2.14 },
      { x: -0.42, y: 0.54, z: -2.14 },
      { x: 0.42, y: 0.54, z: -2.14 },
      { x: 0.68, y: 0.54, z: -2.14 }
    ];

    tailPositions.forEach((pos) => {
      const tailMesh = new THREE.Mesh(tailCylGeo, taillightMaterial);
      tailMesh.position.set(pos.x, pos.y, pos.z);
      carGroup.add(tailMesh);
    });

    // Center Quad Exhaust Pipes (Titanium / Chrome Tubes)
    const exhaustGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 12);
    exhaustGeo.rotateX(Math.PI / 2);
    [-0.14, -0.05, 0.05, 0.14].forEach((ex) => {
      const exMesh = new THREE.Mesh(exhaustGeo, wheelRimMaterial);
      exMesh.position.set(ex, 0.28, -2.25);
      carGroup.add(exMesh);
    });

    // 10. LEGO Speed Champions Wheels (Black Tires + 5-Spoke Rims + Yellow Hub)
    const wheels = [];
    const wheelPositions = [
      { x: -0.98, y: 0.36, z: 1.28, isFront: true },   // Front Left
      { x: 0.98, y: 0.36, z: 1.28, isFront: true },    // Front Right
      { x: -0.98, y: 0.38, z: -1.28, isFront: false },  // Rear Left
      { x: 0.98, y: 0.38, z: -1.28, isFront: false }   // Rear Right
    ];

    const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 24);
    tireGeo.rotateZ(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 16);
    rimGeo.rotateZ(Math.PI / 2);

    const hubCapGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.305, 12);
    hubCapGeo.rotateZ(Math.PI / 2);

    wheelPositions.forEach((pos) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(pos.x, pos.y, pos.z);

      const rotHub = new THREE.Group();

      // Black Chunky LEGO Tire
      const tireMesh = new THREE.Mesh(tireGeo, tireRubberMaterial);
      tireMesh.castShadow = true;
      rotHub.add(tireMesh);

      // Silver Rim Disc
      const rimMesh = new THREE.Mesh(rimGeo, wheelRimMaterial);
      rotHub.add(rimMesh);

      // 5-Spoke Star Pattern
      for (let s = 0; s < 5; s++) {
        const spokeAngle = (s / 5) * Math.PI * 2;
        const spokeGeo = new THREE.BoxGeometry(0.038, 0.20, 0.03);
        const spokeMesh = new THREE.Mesh(spokeGeo, wheelRimMaterial);
        spokeMesh.position.y = Math.sin(spokeAngle) * 0.10;
        spokeMesh.position.z = Math.cos(spokeAngle) * 0.10;
        spokeMesh.rotation.x = spokeAngle;
        rotHub.add(spokeMesh);
      }

      // Yellow Center Ferrari Hub Cap
      const hubMesh = new THREE.Mesh(hubCapGeo, yellowShieldMaterial);
      rotHub.add(hubMesh);

      wheelAssembly.add(rotHub);
      carGroup.add(wheelAssembly);
      wheels.push({ assembly: wheelAssembly, rotHub: rotHub, isFront: pos.isFront });
    });

    // 11. Turntable Showroom Platform & Concentric Grid Rings
    const turntableGroup = new THREE.Group();
    scene.add(turntableGroup);

    // Outer Illuminated Showroom Ring
    const outerRingGeo = new THREE.RingGeometry(3.2, 3.25, 64);
    outerRingGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4001a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(outerRingGeo, ringMat);
    ringMesh.position.y = 0.01;
    turntableGroup.add(ringMesh);

    // Inner Concentric Ring
    const innerRingGeo = new THREE.RingGeometry(1.9, 1.93, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, ringMat);
    innerRingMesh.position.y = 0.012;
    turntableGroup.add(innerRingMesh);

    // Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.6, 5.4);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050806,
      transparent: true,
      opacity: 0.72
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.005;
    carGroup.add(shadowPlane);

    // ========================================================================
    // INTERACTION & ANIMATION LOOP
    // ========================================================================
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragVelX = 0;
    let dragVelY = 0;
    let carRotY = -0.62;
    let carRotX = 0.14;

    let areHeadlightsOn = true;

    // Mouse Drag Orbit
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragVelX = 0;
      dragVelY = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - dragStartX) * 0.009;
      const dy = (e.clientY - dragStartY) * 0.006;
      carRotY += dx;
      carRotX = Math.max(-0.15, Math.min(0.42, carRotX + dy));
      dragVelX = dx;
      dragVelY = dy;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support
    canvas.addEventListener('touchstart', (e) => {
      if (!e.touches.length) return;
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      dragVelX = 0;
      dragVelY = 0;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches.length) return;
      const dx = (e.touches[0].clientX - dragStartX) * 0.009;
      const dy = (e.touches[0].clientY - dragStartY) * 0.006;
      carRotY += dx;
      carRotX = Math.max(-0.15, Math.min(0.42, carRotX + dy));
      dragVelX = dx;
      dragVelY = dy;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Headlights Toggle Button
    const btnHeadlights = document.getElementById('btn-car-headlights') || document.getElementById('btn-liquid-ripple');
    const labelHeadlights = document.getElementById('car-headlights-label');

    function toggleHeadlights() {
      areHeadlightsOn = !areHeadlightsOn;
      leftHeadSpot.intensity = areHeadlightsOn ? 3.8 : 0;
      rightHeadSpot.intensity = areHeadlightsOn ? 3.8 : 0;
      headlightMaterial.color.setHex(areHeadlightsOn ? 0xffffff : 0x223344);
      taillightMaterial.color.setHex(areHeadlightsOn ? 0xff1e32 : 0x44080e);
      underglowLight.intensity = areHeadlightsOn ? 2.2 : 0.4;
      if (labelHeadlights) {
        labelHeadlights.textContent = areHeadlightsOn ? 'LIGHTS: ON' : 'LIGHTS: OFF';
      }
    }

    if (btnHeadlights) {
      btnHeadlights.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleHeadlights();
      });
    }

    // Livery Cycle Button (Ferrari Finishes)
    const btnColor = document.getElementById('btn-car-color') || document.getElementById('btn-liquid-mode');
    const labelColor = document.getElementById('car-color-label') || document.getElementById('liquid-mode-label');

    function cycleFerrariLivery() {
      currentLiveryIdx = (currentLiveryIdx + 1) % LIVERY_PRESETS.length;
      const livery = LIVERY_PRESETS[currentLiveryIdx];
      bodyMaterial.color.setHex(livery.body);
      underglowLight.color.setHex(livery.underglow);
      ringMat.color.setHex(livery.underglow);
      if (labelColor) {
        labelColor.textContent = `LIVERY: ${livery.name}`;
      }
    }

    if (btnColor) {
      btnColor.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleFerrariLivery();
      });
    }

    // Resize Handler
    function onResize() {
      width = parent.clientWidth || 460;
      height = parent.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        carRotY += dragVelX;
        carRotX += dragVelY;
        dragVelX *= 0.92;
        dragVelY *= 0.92;

        // Smooth continuous showroom idle rotation
        carRotY += delta * 0.35;
      }

      carGroup.rotation.y = carRotY;
      carGroup.rotation.x = carRotX;
      turntableGroup.rotation.y = carRotY * 0.25;

      // Realistic wheel driving rotation
      const spinSpeed = delta * 7.2;
      wheels.forEach((w) => {
        w.rotHub.rotation.x += spinSpeed;
        if (w.isFront) {
          // Dynamic steering response
          w.assembly.rotation.y = Math.max(-0.35, Math.min(0.35, dragVelX * 14));
        }
      });

      // Subtle suspension breathing
      carGroup.position.y = Math.sin(clock.getElapsedTime() * 3.8) * 0.012;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ==========================================================================
  // 2. SELF-CONTAINED CANVAS FALLBACK (ZERO DEPENDENCIES)
  // ==========================================================================
  function initCanvasFallbackLego() {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 460;
      height = rect.height || 340;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let angleY = -0.55;
    let isDragging = false;
    let lastX = 0;

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      angleY += (e.clientX - lastX) * 0.009;
      lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    function renderFallback() {
      if (!isDragging) angleY += 0.01;

      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2 + 10;
      const scale = Math.min(width, height) * 0.22;

      ctx.save();
      ctx.translate(cx, cy);

      // Rotating Base Turntable
      ctx.beginPath();
      ctx.ellipse(0, scale * 0.65, scale * 1.45, scale * 0.44, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 0, 26, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Stylized LEGO Ferrari Silhouette (Rosso Corsa Red)
      ctx.beginPath();
      ctx.moveTo(-scale * 0.95, scale * 0.18);
      ctx.lineTo(-scale * 0.75, -scale * 0.08);
      ctx.lineTo(-scale * 0.35, -scale * 0.42);
      ctx.lineTo(scale * 0.38, -scale * 0.42);
      ctx.lineTo(scale * 0.78, -scale * 0.02);
      ctx.lineTo(scale * 0.98, scale * 0.18);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, -scale * 0.5, 0, scale * 0.5);
      grad.addColorStop(0, 'rgba(235, 20, 45, 0.95)');
      grad.addColorStop(0.65, 'rgba(195, 0, 24, 0.85)');
      grad.addColorStop(1, 'rgba(22, 24, 23, 0.95)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top Wing and Studs
      ctx.fillStyle = '#d4001a';
      ctx.fillRect(-scale * 0.95, -scale * 0.28, scale * 0.28, scale * 0.08);

      // Headlight glow
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fff7e8';
      ctx.shadowBlur = 14;
      ctx.fillRect(scale * 0.78, 0, 12, 6);
      ctx.shadowBlur = 0;

      ctx.restore();
      requestAnimationFrame(renderFallback);
    }
    renderFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
