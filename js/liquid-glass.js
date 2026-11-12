/**
 * Interactive Liquid Glass Effects Engine
 * Manages dynamic caustics, 3D card tilt with Z-depth, gentle mountain water cursor wake,
 * background liquid aurora parallax, and wordmark magnetic liquid kinematics.
 * Natural Green Mountain & Glacial Sky Optical Aesthetics (100% Zero-Irritation).
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Dynamic Glass Card Caustics & 3D Tilt with Z-Depth Separation
  const interactiveGlassCards = document.querySelectorAll(
    '.hero-glass-stage, .project-plate-full, .project-plate-asymmetric, .skill-category-card, .cert-document-plate, .inquiries-glass-panel, .editorial-modal-window'
  );

  interactiveGlassCards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width;
      const yNorm = (e.clientY - rect.top) / rect.height;

      // Update caustics focal coordinates
      card.style.setProperty('--mouse-x', `${(xNorm * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(yNorm * 100).toFixed(1)}%`);

      // 3D Card Perspective Tilt (Only on project plates & skill cards, restrained to max 7.5 deg)
      if (!prefersReducedMotion && (card.classList.contains('project-plate-full') || card.classList.contains('project-plate-asymmetric') || card.classList.contains('skill-category-card'))) {
        const tiltX = (yNorm - 0.5) * -7.5;
        const tiltY = (xNorm - 0.5) * 7.5;
        card.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      if (card.classList.contains('project-plate-full') || card.classList.contains('project-plate-asymmetric') || card.classList.contains('skill-category-card')) {
        card.style.transform = '';
      }
    });
  });

  // 2. Liquid Click Ripple Wave
  function createLiquidRipple(e, container) {
    if (prefersReducedMotion) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'liquid-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);

    // If click occurred on hero stage, also trigger 3D sculpture wave
    if (container.classList.contains('hero-glass-stage') && typeof window.triggerSculptureRipple === 'function') {
      const uAngle = (x / rect.width) * Math.PI * 2;
      window.triggerSculptureRipple(uAngle, 0.55);
    }

    setTimeout(() => {
      ripple.remove();
    }, 950);
  }

  // Attach ripple to major glass interactive containers
  const rippleTargets = document.querySelectorAll(
    '.hero-glass-stage, .project-plate-full, .project-plate-asymmetric, .skill-category-card, .cert-document-plate, .inquiries-glass-panel'
  );
  rippleTargets.forEach((target) => {
    target.addEventListener('click', (e) => {
      if (e.target.closest('a, button, input, textarea, canvas')) return;
      createLiquidRipple(e, target);
    });
  });

  // 3. Gentle Mountain Water Cursor Wake (Restrained, Natural Flow)
  let lastWakeTime = 0;
  if (!prefersReducedMotion && !window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastWakeTime < 95) return; // Throttled to ~10 drops/sec max

      const target = e.target.closest('.hero-glass-stage, .project-plate-full, .project-plate-asymmetric, .skill-category-card');
      if (target) {
        lastWakeTime = now;
        const drop = document.createElement('span');
        drop.className = 'water-wake-drop';
        drop.style.left = `${e.clientX}px`;
        drop.style.top = `${e.clientY}px`;
        document.body.appendChild(drop);

        setTimeout(() => {
          drop.remove();
        }, 720);
      }
    }, { passive: true });
  }

  // 4. Floating Liquid Glass Lens Cursor Follower (Desktop Only)
  if (!window.matchMedia('(pointer: coarse)').matches) {
    const lens = document.createElement('div');
    lens.className = 'liquid-glass-lens';
    lens.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lens);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lensX = mouseX;
    let lensY = mouseY;
    let isLensActive = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isLensActive) {
        isLensActive = true;
        lens.classList.add('active');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isLensActive = false;
      lens.classList.remove('active');
    });

    // Expand lens when hovering interactive elements
    const interactiveSelectors = 'a, button, canvas, .project-visual-viewport, .nav-pill-group, .hero-vertical-year, .project-spec-table';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        lens.classList.add('lens-expanded');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        lens.classList.remove('lens-expanded');
      }
    });

    function updateLens() {
      if (!prefersReducedMotion) {
        lensX += (mouseX - lensX) * 0.18;
        lensY += (mouseY - lensY) * 0.18;
        lens.style.transform = `translate3d(${lensX.toFixed(1)}px, ${lensY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(updateLens);
    }
    requestAnimationFrame(updateLens);
  }

  // 5. Dynamic Background Liquid Aurora Parallax
  const blob1 = document.getElementById('aurora-blob-1');
  const blob2 = document.getElementById('aurora-blob-2');
  const blob3 = document.getElementById('aurora-blob-3');

  if ((blob1 || blob2 || blob3) && !prefersReducedMotion) {
    let targetBlobX = 0;
    let targetBlobY = 0;
    let currentBlobX = 0;
    let currentBlobY = 0;

    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetBlobX = nx * 24;
      targetBlobY = ny * 18;
    }, { passive: true });

    function updateAurora() {
      currentBlobX += (targetBlobX - currentBlobX) * 0.04;
      currentBlobY += (targetBlobY - currentBlobY) * 0.04;

      if (blob1) blob1.style.transform = `translate3d(${(currentBlobX * 0.7).toFixed(1)}px, ${(currentBlobY * 0.7).toFixed(1)}px, 0)`;
      if (blob2) blob2.style.transform = `translate3d(${(-currentBlobX * 0.9).toFixed(1)}px, ${(-currentBlobY * 0.9).toFixed(1)}px, 0)`;
      if (blob3) blob3.style.transform = `translate3d(${(currentBlobX * 0.5).toFixed(1)}px, ${(-currentBlobY * 0.6).toFixed(1)}px, 0)`;

      requestAnimationFrame(updateAurora);
    }
    requestAnimationFrame(updateAurora);
  }

  // 6. Hero Starting Page Interactive Controls
  const btnRipple = document.getElementById('btn-liquid-ripple');
  const btnMode = document.getElementById('btn-liquid-mode');
  const modeLabel = document.getElementById('liquid-mode-label');

  if (btnRipple) {
    btnRipple.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.triggerSculptureRipple === 'function') {
        window.triggerSculptureRipple(Math.random() * Math.PI * 2, 0.7);
      }
      const stage = document.querySelector('.hero-glass-stage');
      if (stage) {
        const fakeEvent = {
          clientX: stage.getBoundingClientRect().left + stage.clientWidth / 2,
          clientY: stage.getBoundingClientRect().top + stage.clientHeight / 2
        };
        createLiquidRipple(fakeEvent, stage);
      }
    });
  }

  if (btnMode && modeLabel) {
    btnMode.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.toggleSculptureViscosity === 'function') {
        const newMode = window.toggleSculptureViscosity();
        if (newMode === 'mercury') {
          btnMode.classList.add('mode-mercury');
          modeLabel.textContent = 'FLOW: LIQUID MERCURY';
        } else {
          btnMode.classList.remove('mode-mercury');
          modeLabel.textContent = 'FLOW: VISCOUS GLACIAL';
        }
      }
    });
  }

  // 7. Interactive Magnetic Parallax on Editorial Name Letters
  const wordmark = document.querySelector('.hero-editorial-name, .hero-giant-wordmark');
  if (wordmark && !prefersReducedMotion) {
    const letters = wordmark.querySelectorAll('.word-letter');
    const heroStage = document.querySelector('.hero-glass-stage');

    if (heroStage && letters.length) {
      heroStage.addEventListener('mousemove', (e) => {
        const rect = heroStage.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        letters.forEach((letter, i) => {
          const factor = (i % 2 === 0 ? 1 : -1) * 3.5;
          const xOffset = normX * factor;
          const yOffset = normY * factor * 0.7;
          letter.style.transform = `translate3d(${xOffset.toFixed(1)}px, ${yOffset.toFixed(1)}px, 0)`;
        });
      }, { passive: true });

      heroStage.addEventListener('mouseleave', () => {
        letters.forEach((letter) => {
          letter.style.transform = '';
        });
      });
    }
  }
});
