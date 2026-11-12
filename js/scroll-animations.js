/**
 * Scroll Animations & Mountain Parallax Choreography
 * Uses GSAP + ScrollTrigger when available, with a graceful native fallback.
 */

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progressBar = document.getElementById('scroll-progress');
  const masthead = document.querySelector('.site-masthead');

  // 1. Scroll Progress Hairline & Masthead Depth State
  function updateScrollChrome() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

    if (progressBar) {
      progressBar.style.width = `${pct.toFixed(2)}%`;
    }
    if (masthead) {
      if (scrollTop > 32) {
        masthead.classList.add('scrolled');
      } else {
        masthead.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateScrollChrome, { passive: true });
  updateScrollChrome();

  // 2. Active Navigation Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.masthead-nav .nav-link');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-35% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach((sec) => navObserver.observe(sec));
  }

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('revealed'));
    return;
  }

  // 3. GSAP + ScrollTrigger Choreography (with native fallback)
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (hasGSAP) {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Clear CSS initial hide so GSAP owns opacity/transform cleanly
    gsap.set('.reveal-on-scroll', { opacity: 1, y: 0, clearProps: 'transition' });

    // A. Hero Entrance Choreography
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from('.hero-glass-stage', { y: 24, opacity: 0, duration: 0.9 })
      .from('.hero-editorial-name', { y: 20, opacity: 0, duration: 0.8 }, '-=0.65')
      .from('.hero-editorial-sub, .hero-editorial-bio, .hero-chips-row', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.55')
      .from('.hero-cta-group', { y: 14, opacity: 0, duration: 0.65 }, '-=0.45')
      .from('.hero-sculpture-chamber', { scale: 0.94, opacity: 0, duration: 0.9 }, '-=0.65')
      .from('.hero-stage-top, .hero-stage-bottom', { opacity: 0, duration: 0.6 }, '-=0.4');

    // B. Parallax Alpine Mountain Ridges & Sky Atmosphere on Scroll
    gsap.to('#mountain-far', {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    gsap.to('#mountain-mid', {
      yPercent: -24,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0
      }
    });

    gsap.to('#mountain-near', {
      yPercent: -34,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    gsap.to('.sky-atmosphere', {
      y: -90,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
      }
    });

    // C. Subtle Hero Frame Parallax on Scroll Out
    gsap.to('.hero-giant-wordmark', {
      y: -36,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // D. Section Headers Reveal
    gsap.utils.toArray('.editorial-section-header').forEach((header) => {
      gsap.from(header, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 86%',
          once: true
        }
      });
    });

    // E. Frosted Glass Project Plates Reveal
    gsap.utils.toArray('.project-plate-full, .project-plate-asymmetric').forEach((plate) => {
      gsap.from(plate, {
        y: 44,
        opacity: 0,
        scale: 0.985,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: plate,
          start: 'top 85%',
          once: true
        }
      });
    });

    // F. Staggered Skill Cards
    if (document.querySelector('.skills-editorial-grid')) {
      gsap.from('.skill-category-card', {
        y: 34,
        opacity: 0,
        duration: 0.72,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-editorial-grid',
          start: 'top 84%',
          once: true
        }
      });
    }

    // G. Experience Timeline Entries
    gsap.utils.toArray('.timeline-entry').forEach((entry) => {
      gsap.from(entry, {
        x: -24,
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          once: true
        }
      });
    });

    // H. Certificates Stagger
    if (document.querySelector('.certificates-grid')) {
      gsap.from('.cert-document-plate', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.certificates-grid',
          start: 'top 85%',
          once: true
        }
      });
    }

    // I. Inquiries Glass Panel
    if (document.querySelector('.inquiries-glass-panel')) {
      gsap.from('.inquiries-glass-panel', {
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.inquiries-glass-panel',
          start: 'top 86%',
          once: true
        }
      });
    }
  } else {
    // Graceful Native Fallback (if CDN offline)
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('revealed'));
    }

    // Lightweight native parallax fallback for mountain layers
    const mFar = document.getElementById('mountain-far');
    const mMid = document.getElementById('mountain-mid');
    const mNear = document.getElementById('mountain-near');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (mFar) mFar.style.transform = `translate3d(0, ${-y * 0.04}px, 0)`;
      if (mMid) mMid.style.transform = `translate3d(0, ${-y * 0.08}px, 0)`;
      if (mNear) mNear.style.transform = `translate3d(0, ${-y * 0.12}px, 0)`;
    }, { passive: true });
  }
})();

