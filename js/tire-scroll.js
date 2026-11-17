/**
 * High-Performance Motorsport Tire Scroll Controller
 * Renders a rolling race tire assembly along a vertical telemetry track.
 * Features:
 * - 60 FPS synchronized rotation based on scroll distance and velocity
 * - Rubber skid mark & thermal heat trail
 * - Live speed (KM/H) & sequential gear shift telemetry HUD
 * - Click & drag scrubbable pit-lane track
 * - Zero-layout-thrashing architecture: cached metrics & RAF-scheduled updates
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
  let isTicking = false;

  // Cached layout metrics to prevent layout thrashing on scroll
  let cachedDocHeight = 1;
  let cachedTrackHeight = 0;
  let cachedTireHeight = 46;
  let cachedMaxTravel = 0;
  let cachedSections = [];

  // Active section gear mapping
  const SECTIONS = [
    { id: 'hero', gear: 'N' },
    { id: 'about', gear: '1ST' },
    { id: 'games', gear: '2ND' },
    { id: 'projects', gear: '3RD' },
    { id: 'more-to-know', gear: '4TH' },
    { id: 'experience', gear: '5TH' },
    { id: 'certificates', gear: '6TH' },
    { id: 'cv', gear: '6TH' },
    { id: 'inquiries', gear: '7TH' }
  ];

  function cacheMetrics() {
    if (!track || !tireAssembly) return;

    cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    cachedTrackHeight = track.clientHeight || 0;
    cachedTireHeight = tireAssembly.clientHeight || 46;
    cachedMaxTravel = Math.max(0, cachedTrackHeight - cachedTireHeight);

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    cachedSections = SECTIONS.map((s) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollTop;
      return {
        gear: s.gear,
        top: top,
        bottom: top + (el.offsetHeight || 0)
      };
    }).filter(Boolean);
  }

  function init() {
    track = document.getElementById('tire-scroll-track');
    tireAssembly = document.getElementById('rolling-tire-assembly');
    tireWheel = document.getElementById('rolling-tire-wheel');
    rubberTrail = document.getElementById('tire-rubber-trail');
    speedVal = document.getElementById('tire-speed-val');
    gearVal = document.getElementById('tire-gear-val');

    if (!track || !tireAssembly || !tireWheel) return;

    // Compute initial cached geometry
    cacheMetrics();

    // Initial position & bind events
    applyTireUpdate();
    bindEvents();

    // Start telemetry velocity decay loop
    rafId = requestAnimationFrame(telemetryLoop);
  }

  function getScrollProgress(scrollY) {
    if (cachedDocHeight <= 0) return 0;
    return Math.min(1, Math.max(0, scrollY / cachedDocHeight));
  }

  function getActiveGear(scrollY) {
    const scrollMiddle = scrollY + window.innerHeight * 0.35;
    for (let i = 0; i < cachedSections.length; i++) {
      const sec = cachedSections[i];
      if (scrollMiddle >= sec.top && scrollMiddle < sec.bottom) {
        return sec.gear;
      }
    }
    return 'N';
  }

  function applyTireUpdate() {
    isTicking = false;
    if (!track || !tireAssembly || !tireWheel) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const progress = getScrollProgress(scrollY);
    const currentY = progress * cachedMaxTravel;

    // Move tire down the track
    tireAssembly.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`;

    // Rotate wheel proportional to scroll
    const rotationDeg = (scrollY * 0.85) % 360;
    tireWheel.style.transform = `rotate(${rotationDeg.toFixed(1)}deg)`;

    // Extend rubber trail
    if (rubberTrail) {
      rubberTrail.style.height = `${(currentY + (cachedTireHeight / 2)).toFixed(1)}px`;
    }

    // Update active gear
    if (gearVal) {
      gearVal.textContent = getActiveGear(scrollY);
    }
  }

  function requestTireTick() {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(applyTireUpdate);
    }
  }

  function telemetryLoop(now) {
    const dt = Math.max(1, now - lastTime);
    lastTime = now;

    const currentScroll = window.scrollY || document.documentElement.scrollTop;
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

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cacheMetrics();
      requestTireTick();
    }, 80);
  }

  function bindEvents() {
    window.addEventListener('scroll', requestTireTick, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

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
