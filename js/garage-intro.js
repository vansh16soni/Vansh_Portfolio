/**
 * Cinematic Garage Launch Intro & Tiny Blue Car Steering Cursor
 * 
 * Part 1: High-octane product launch teaser:
 * - Minimalist horizontal metallic roller shutter
 * - Idling glossy red sports car with exhaust smoke & projector headlights
 * - Thin RPM bar filling to redline (1,200 -> 8,500 RPM) with shift lights
 * - High-beam headlight flash & shutter rolling upward in slats
 * - High-speed launch out of frame with speed streaks, revealing clean portfolio
 * 
 * Part 2: Tiny Blue Car Steering Cursor:
 * - Ultra-smooth 60fps mouse-following miniature blue sports car
 * - Smooth kinematic steering rotation pointing in movement direction
 * - Realistic dual rubber skid marks on dedicated fading canvas
 * - 100% pointer-events: none; zero UI interference
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. CINEMATIC GARAGE LAUNCH INTRO
  // ========================================================================

  let overlay = null;
  let shutterContainer = null;
  let slatsWrap = null;
  let carWrapper = null;
  let rpmFill = null;
  let rpmCounter = null;
  let statusText = null;
  let shiftLights = null;
  let smokeCanvas = null;
  let smokeCtx = null;
  let speedStreaks = null;
  let skipBtn = null;

  let smokeParticles = [];
  let smokeAnimId = null;
  let isIntroActive = true;
  let introStartTime = 0;
  let currentRpm = 1200;
  let targetRpm = 1200;

  // Sound Synthesizer (Zero external audio files, pure Web Audio API oscillator)
  let audioCtx = null;

  function initIntro() {
    overlay = document.getElementById('garage-intro-overlay');
    if (!overlay) return;

    shutterContainer = document.getElementById('garage-shutter-door');
    slatsWrap = document.getElementById('shutter-slats-wrap');
    carWrapper = document.getElementById('hero-teaser-car-wrapper');
    rpmFill = document.getElementById('hud-rpm-fill');
    rpmCounter = document.getElementById('hud-rpm-counter');
    statusText = document.getElementById('hud-status-text');
    shiftLights = document.querySelectorAll('.shift-light-pip');
    smokeCanvas = document.getElementById('exhaust-smoke-canvas');
    speedStreaks = document.getElementById('launch-speed-streaks');
    skipBtn = document.getElementById('btn-skip-intro');

    // Build metallic shutter slats
    buildShutterSlats();

    // Setup exhaust smoke canvas
    if (smokeCanvas) {
      smokeCtx = smokeCanvas.getContext('2d');
      setupSmokeCanvas();
      window.addEventListener('resize', setupSmokeCanvas);
      animateSmoke();
    }

    // Skip handlers
    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isIntroActive) {
        dismissIntro();
      }
    });

    // Start Intro Choreography Timeline
    introStartTime = performance.now();
    requestAnimationFrame(introTimelineLoop);
  }

  function buildShutterSlats() {
    if (!slatsWrap) return;
    slatsWrap.innerHTML = '';
    const slatCount = 18;
    for (let i = 0; i < slatCount; i++) {
      const slat = document.createElement('div');
      slat.className = 'shutter-slat';
      slatsWrap.appendChild(slat);
    }
  }

  function setupSmokeCanvas() {
    if (!smokeCanvas) return;
    const rect = smokeCanvas.getBoundingClientRect();
    smokeCanvas.width = rect.width;
    smokeCanvas.height = rect.height;
  }

  function createSmokeParticle(isHighRev) {
    if (!smokeCanvas) return;
    const w = smokeCanvas.width;
    const h = smokeCanvas.height;
    // Left & right exhaust tips
    const isLeft = Math.random() > 0.5;
    const originX = isLeft ? w * 0.38 + (Math.random() - 0.5) * 12 : w * 0.62 + (Math.random() - 0.5) * 12;
    const originY = h * 0.72;

    smokeParticles.push({
      x: originX,
      y: originY,
      vx: (isLeft ? -1 : 1) * (Math.random() * (isHighRev ? 3.5 : 1.2) + 0.5),
      vy: -(Math.random() * (isHighRev ? 3.0 : 1.4) + 0.8),
      radius: Math.random() * (isHighRev ? 16 : 8) + 6,
      maxRadius: Math.random() * (isHighRev ? 44 : 24) + 18,
      alpha: isHighRev ? 0.65 : 0.35,
      decay: Math.random() * 0.009 + 0.008
    });
  }

  function animateSmoke() {
    if (!smokeCtx || !smokeCanvas || !isIntroActive) return;

    smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
      const p = smokeParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.radius += 0.45;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.radius >= p.maxRadius) {
        smokeParticles.splice(i, 1);
        continue;
      }

      const grad = smokeCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(200, 210, 220, ${p.alpha * 0.4})`);
      grad.addColorStop(0.6, `rgba(140, 150, 165, ${p.alpha * 0.2})`);
      grad.addColorStop(1, 'rgba(10, 12, 16, 0)');

      smokeCtx.beginPath();
      smokeCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      smokeCtx.fillStyle = grad;
      smokeCtx.fill();
    }

    smokeAnimId = requestAnimationFrame(animateSmoke);
  }

  // Cinematic Sequence Timeline
  function introTimelineLoop(now) {
    if (!isIntroActive) return;

    const elapsed = (now - introStartTime) / 1000; // seconds

    // Stage 1: Idling & Initial Rumble (0.0s - 1.8s)
    if (elapsed < 1.8) {
      targetRpm = 1200 + Math.sin(now * 0.015) * 80;
      if (Math.random() < 0.25) createSmokeParticle(false);
      if (statusText) statusText.textContent = 'SYSTEMS CHECK // IDLE';
    }
    // Stage 2: Throttle Blip & Climbing to Redline (1.8s - 3.6s)
    else if (elapsed < 3.6) {
      const p = (elapsed - 1.8) / 1.8;
      targetRpm = 1200 + p * (8500 - 1200) + (Math.random() - 0.5) * 140;
      if (carWrapper) {
        carWrapper.classList.remove('idling');
        carWrapper.classList.add('launch-ready');
      }
      if (Math.random() < 0.65) createSmokeParticle(true);
      if (statusText) statusText.textContent = 'THROTTLE ENGAGED // SPOOLING TURBOS';
    }
    // Stage 3: Shutter Rolls Up & Headlights Flash (3.6s - 5.2s)
    else if (elapsed < 5.2) {
      targetRpm = 8500;
      if (carWrapper) {
        carWrapper.classList.add('headlights-flash');
      }
      if (shutterContainer && !shutterContainer.classList.contains('rolled-up')) {
        shutterContainer.classList.add('rolled-up');
      }
      if (statusText) statusText.textContent = 'LAUNCH CONTROL ARMED // SHUTTER OPEN';
      if (Math.random() < 0.8) createSmokeParticle(true);
    }
    // Stage 4: High-Speed Launch Out of Frame (5.2s - 6.6s)
    else if (elapsed < 6.6) {
      targetRpm = 8800;
      if (carWrapper && !carWrapper.classList.contains('launching')) {
        carWrapper.classList.remove('launch-ready');
        carWrapper.classList.add('launching');
      }
      if (speedStreaks && !speedStreaks.classList.contains('active')) {
        speedStreaks.classList.add('active');
      }
      if (statusText) statusText.textContent = 'LAUNCH COMPLETE // ACCELERATING';
    }
    // Stage 5: Reveal Portfolio & Fade Out Overlay (6.6s+)
    else {
      dismissIntro();
      return;
    }

    // Smooth RPM gauge easing
    currentRpm += (targetRpm - currentRpm) * 0.16;
    updateRpmUI(currentRpm);

    requestAnimationFrame(introTimelineLoop);
  }

  function updateRpmUI(rpm) {
    if (rpmCounter) {
      rpmCounter.textContent = `${Math.round(rpm).toLocaleString()} RPM`;
    }
    if (rpmFill) {
      const pct = Math.min(100, Math.max(10, (rpm / 8800) * 100));
      rpmFill.style.width = `${pct}%`;
    }
    // Shift lights calculation
    if (shiftLights && shiftLights.length) {
      const activeIdx = Math.floor((rpm / 8800) * shiftLights.length);
      shiftLights.forEach((light, idx) => {
        light.className = 'shift-light-pip';
        if (idx <= activeIdx) {
          if (idx < 2) light.classList.add('lit-green');
          else if (idx < 4) light.classList.add('lit-yellow');
          else light.classList.add('lit-red');
        }
      });
    }
  }

  function dismissIntro() {
    if (!isIntroActive) return;
    isIntroActive = false;

    if (smokeAnimId) cancelAnimationFrame(smokeAnimId);

    if (overlay) {
      overlay.classList.add('dismissed');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 900);
    }

    // Initialize the tiny steering blue car cursor once site is revealed
    initTinyCarCursor();
  }

  // Optional Replay Functionality
  window.replayGarageIntro = function () {
    if (!overlay) return;
    overlay.style.display = 'flex';
    overlay.classList.remove('dismissed');
    if (shutterContainer) shutterContainer.classList.remove('rolled-up');
    if (carWrapper) {
      carWrapper.className = 'teaser-car-wrapper idling';
    }
    if (speedStreaks) speedStreaks.classList.remove('active');
    isIntroActive = true;
    introStartTime = performance.now();
    smokeParticles = [];
    animateSmoke();
    requestAnimationFrame(introTimelineLoop);
  };


  // ========================================================================
  // 2. TINY BLUE CAR STEERING CURSOR WITH FADING TIRE SKID MARKS
  // ========================================================================

  let cursorCanvas = null;
  let cursorCtx = null;
  let tinyCarEl = null;

  let mouseX = -9999;
  let mouseY = -9999;
  let carX = -9999;
  let carY = -9999;
  let carAngle = 0;
  let skidTracks = [];
  let isCursorActive = false;

  function initTinyCarCursor() {
    // Check if on touch screen
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    cursorCanvas = document.getElementById('cursor-tire-canvas');
    tinyCarEl = document.getElementById('tiny-car-cursor');

    if (!cursorCanvas || !tinyCarEl) return;

    cursorCtx = cursorCanvas.getContext('2d');
    resizeCursorCanvas();
    window.addEventListener('resize', resizeCursorCanvas);

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorActive) {
        carX = mouseX;
        carY = mouseY;
        isCursorActive = true;
        tinyCarEl.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (tinyCarEl) tinyCarEl.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (tinyCarEl && isCursorActive) tinyCarEl.style.opacity = '1';
    });

    // Start 60fps cursor kinematics & tire rendering loop
    requestAnimationFrame(renderCursorLoop);
  }

  function resizeCursorCanvas() {
    if (!cursorCanvas) return;
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  }

  function renderCursorLoop() {
    if (isCursorActive && carX > -1000) {
      const dx = mouseX - carX;
      const dy = mouseY - carY;
      const dist = Math.hypot(dx, dy);

      // Smooth kinematic follow
      const easeSpeed = Math.min(0.35, Math.max(0.18, dist * 0.005));
      carX += dx * easeSpeed;
      carY += dy * easeSpeed;

      // Smooth steering angle interpolation
      if (dist > 1.2) {
        const targetAngle = Math.atan2(dy, dx) + Math.PI / 2; // top of car points in movement dir

        // Shortest angle difference
        let diff = (targetAngle - carAngle) % (Math.PI * 2);
        if (diff < -Math.PI) diff += Math.PI * 2;
        if (diff > Math.PI) diff -= Math.PI * 2;

        carAngle += diff * 0.28;
      }

      // Update tiny car element transform
      if (tinyCarEl) {
        const deg = (carAngle * 180) / Math.PI;
        tinyCarEl.style.transform = `translate3d(${carX}px, ${carY}px, 0) rotate(${deg}deg)`;
      }

      // Generate tire skid marks behind rear wheels when moving
      if (dist > 2.0 && dist < 120) {
        // Calculate rear wheel offsets based on vehicle wheelbase (18px back, 6px left/right)
        const backDist = 14;
        const halfTread = 6;
        const forwardCos = Math.cos(carAngle - Math.PI / 2);
        const forwardSin = Math.sin(carAngle - Math.PI / 2);
        const sideCos = Math.cos(carAngle);
        const sideSin = Math.sin(carAngle);

        const leftWheelX = carX - forwardCos * backDist - sideCos * halfTread;
        const leftWheelY = carY - forwardSin * backDist - sideSin * halfTread;

        const rightWheelX = carX - forwardCos * backDist + sideCos * halfTread;
        const rightWheelY = carY - forwardSin * backDist + sideSin * halfTread;

        skidTracks.push({
          x1: leftWheelX,
          y1: leftWheelY,
          x2: rightWheelX,
          y2: rightWheelY,
          alpha: 0.42,
          decay: 0.008
        });
      }
    }

    // Render & fade tire tracks on canvas
    if (cursorCtx && cursorCanvas) {
      cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      for (let i = skidTracks.length - 1; i >= 0; i--) {
        const t = skidTracks[i];
        t.alpha -= t.decay;

        if (t.alpha <= 0) {
          skidTracks.splice(i, 1);
          continue;
        }

        // Draw twin rubber skid marks
        cursorCtx.fillStyle = `rgba(18, 20, 26, ${t.alpha * 0.75})`;
        cursorCtx.beginPath();
        cursorCtx.arc(t.x1, t.y1, 1.4, 0, Math.PI * 2);
        cursorCtx.fill();

        cursorCtx.beginPath();
        cursorCtx.arc(t.x2, t.y2, 1.4, 0, Math.PI * 2);
        cursorCtx.fill();
      }
    }

    requestAnimationFrame(renderCursorLoop);
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }
})();
