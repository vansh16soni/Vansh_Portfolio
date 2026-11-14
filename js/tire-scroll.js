/**
 * High-Performance Motorsport Tire Scroll Controller
 * Renders a rolling race tire assembly along a vertical telemetry track.
 * Features:
 * - 60 FPS synchronized rotation based on scroll distance and velocity
 * - Rubber skid mark & thermal heat trail
 * - Live speed (KM/H) & sequential gear shift telemetry HUD
 * - Click & drag scrubbable pit-lane track
 */

(function () {
  'use strict';

  let track = null;
  let tireAssembly = null;
  let tireWheel = null;
  let rubberTrail = null;
  let speedVal = null;
  let gearVal = null;

  let lastScrollY = window.scrollY;
  let lastTime = performance.now();
  let currentSpeed = 0;
  let isDragging = false;
  let rafId = null;

  // Active section gear mapping
  const SECTIONS = [
    { id: 'hero', gear: 'N' },
    { id: 'skills', gear: '1ST' },
    { id: 'projects', gear: '2ND' },
    { id: 'experience', gear: '3RD' },
    { id: 'certificates', gear: '4TH' },
    { id: 'cv', gear: '5TH' },
    { id: 'inquiries', gear: '6TH' }
  ];

  function init() {
    track = document.getElementById('tire-scroll-track');
    tireAssembly = document.getElementById('rolling-tire-assembly');
    tireWheel = document.getElementById('rolling-tire-wheel');
    rubberTrail = document.getElementById('tire-rubber-trail');
    speedVal = document.getElementById('tire-speed-val');
    gearVal = document.getElementById('tire-gear-val');

    if (!track || !tireAssembly || !tireWheel) return;

    // Initial position & bind events
    updateTire();
    bindEvents();

    // Start telemetry velocity decay loop
    rafId = requestAnimationFrame(telemetryLoop);
  }

  function getScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / docHeight));
  }

  function getActiveGear() {
    const scrollMiddle = window.scrollY + window.innerHeight * 0.35;
    let activeGear = 'N';

    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollMiddle >= top && scrollMiddle < top + height) {
          activeGear = SECTIONS[i].gear;
          break;
        }
      }
    }
    return activeGear;
  }

  function updateTire() {
    if (!track || !tireAssembly || !tireWheel) return;

    const progress = getScrollProgress();
    const trackHeight = track.clientHeight;
    const tireHeight = tireAssembly.clientHeight || 46;
    const maxTravel = Math.max(0, trackHeight - tireHeight);
    const currentY = progress * maxTravel;

    // Move tire down the track
    tireAssembly.style.transform = `translate3d(0, ${currentY}px, 0)`;

    // Rotate wheel proportional to scroll
    const rotationDeg = (window.scrollY * 0.85) % 360;
    tireWheel.style.transform = `rotate(${rotationDeg}deg)`;

    // Extend rubber trail
    if (rubberTrail) {
      rubberTrail.style.height = `${currentY + (tireHeight / 2)}px`;
    }

    // Update active gear
    if (gearVal) {
      gearVal.textContent = getActiveGear();
    }
  }

  function telemetryLoop(now) {
    const dt = Math.max(1, now - lastTime);
    lastTime = now;

    const currentScroll = window.scrollY;
    const scrollDelta = Math.abs(currentScroll - lastScrollY);
    lastScrollY = currentScroll;

    // Calculate instantaneous velocity in simulated km/h
    const targetSpeed = Math.min(340, (scrollDelta / dt) * 320);
    // Smooth easing
    currentSpeed += (targetSpeed - currentSpeed) * 0.18;

    if (speedVal) {
      const displayKmh = Math.max(0, Math.round(currentSpeed));
      speedVal.textContent = `${displayKmh} KM/H`;

      // High-speed brake heat effect
      if (displayKmh > 200) {
        tireAssembly.classList.add('high-speed-thermal');
      } else {
        tireAssembly.classList.remove('high-speed-thermal');
      }
    }

    rafId = requestAnimationFrame(telemetryLoop);
  }

  function bindEvents() {
    window.addEventListener('scroll', updateTire, { passive: true });
    window.addEventListener('resize', updateTire, { passive: true });

    // Track click to scrub
    track.addEventListener('click', (e) => {
      if (isDragging) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const progress = Math.min(1, Math.max(0, clickY / rect.height));
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: progress * docHeight,
        behavior: 'smooth'
      });
    });

    // Dragging support
    function onPointerMove(e) {
      if (!isDragging) return;
      const rect = track.getBoundingClientRect();
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const currentY = clientY - rect.top;
      const progress = Math.min(1, Math.max(0, currentY / rect.height));
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: progress * docHeight
      });
    }

    function onPointerUp() {
      if (isDragging) {
        isDragging = false;
        document.body.classList.remove('scrubbing-tire');
      }
    }

    tireAssembly.addEventListener('mousedown', (e) => {
      isDragging = true;
      document.body.classList.add('scrubbing-tire');
      e.stopPropagation();
    });

    tireAssembly.addEventListener('touchstart', (e) => {
      isDragging = true;
      document.body.classList.add('scrubbing-tire');
      e.stopPropagation();
    }, { passive: true });

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
