/**
 * Spatial Constellation & Force-Directed Skills Graph
 * Interactive physics-based network visualization of Vansh Kumar Soni's technical ecosystem.
 * Zero external dependencies, 60fps high-DPI Canvas 2D engine with spring physics & node telemetry HUD.
 */

(function () {
  'use strict';

  // --- 1. SKILLS & CONSTELLATION CLUSTERS DATA ---
  const CLUSTERS = {
    java: {
      id: 'java',
      name: 'Java & Backend Ecosystem',
      color: '#79af88',
      glow: 'rgba(121, 175, 136, 0.55)',
      fill: 'rgba(87, 140, 102, 0.22)',
      centerRatio: { x: 0.28, y: 0.38 }
    },
    mern: {
      id: 'mern',
      name: 'Full-Stack & Spatial Web',
      color: '#8ab6cc',
      glow: 'rgba(138, 182, 204, 0.55)',
      fill: 'rgba(53, 85, 102, 0.22)',
      centerRatio: { x: 0.72, y: 0.36 }
    },
    ai: {
      id: 'ai',
      name: 'Applied AI & Data Analytics',
      color: '#d8a482',
      glow: 'rgba(216, 164, 130, 0.55)',
      fill: 'rgba(180, 110, 80, 0.22)',
      centerRatio: { x: 0.34, y: 0.72 }
    },
    core: {
      id: 'core',
      name: 'Systems, Compilers & DevOps',
      color: '#c2d4dd',
      glow: 'rgba(194, 212, 221, 0.45)',
      fill: 'rgba(100, 130, 145, 0.22)',
      centerRatio: { x: 0.74, y: 0.72 }
    }
  };

  const RAW_NODES = [
    // Java Cluster
    { id: 'java', label: 'Java (Core & OOP)', isHub: true, cluster: 'java', project: 'Repo City & Cisco NetSage', projectHref: '#projects', desc: 'Enterprise multithreading, OOP design patterns, and JVM runtime optimization.' },
    { id: 'spring-boot', label: 'Spring Boot 3', isHub: true, cluster: 'java', project: 'Repo City & NetSage', projectHref: '#projects', desc: 'Deterministic RESTful microservices, dependency injection, and production config.' },
    { id: 'spring-sec', label: 'Spring Security', cluster: 'java', project: 'Repo City', projectHref: '#projects', desc: 'Stateless authentication filters, JWT tokens, and GitHub OAuth 2.0 authorization.' },
    { id: 'spring-ai', label: 'Spring AI', cluster: 'java', project: 'Repo City AI Studio', projectHref: '#projects', desc: 'Multi-LLM client abstraction, vector stores, and automated prompt engineering.' },
    { id: 'threads', label: 'Virtual Threads', cluster: 'java', project: 'Repo City Concurrency', projectHref: '#projects', desc: 'Project Loom high-throughput concurrency for high-volume repository AST parsing.' },
    { id: 'rest-apis', label: 'REST APIs', cluster: 'java', project: 'Cisco NetSage & GYAN.AI', projectHref: '#projects', desc: 'Clean, deterministic OpenAPI schemas, error hierarchies, and DTO contracts.' },

    // MERN & Spatial Web Cluster
    { id: 'react', label: 'React.js', isHub: true, cluster: 'mern', project: 'GYAN.AI & ShadowPlay', projectHref: '#projects', desc: 'Reactive state architecture, custom performance hooks, and React Flow graphs.' },
    { id: 'node', label: 'Node.js', isHub: true, cluster: 'mern', project: 'Repo City & GYAN.AI', projectHref: '#projects', desc: 'Event-driven asynchronous I/O, streams, and Server-Sent Events (SSE) server.' },
    { id: 'express', label: 'Express.js', cluster: 'mern', project: 'GYAN.AI & ShadowPlay', projectHref: '#projects', desc: 'Modular middleware pipelines, secure CORS headers, and controller routing.' },
    { id: 'mongo', label: 'MongoDB', cluster: 'mern', project: 'Repo City & GYAN.AI', projectHref: '#projects', desc: 'Flexible document schemas, indexing strategies, and aggregation pipelines.' },
    { id: 'three', label: 'Three.js / WebGL', isHub: true, cluster: 'mern', project: 'Repo City & Ferrari Hero', projectHref: '#hero', desc: 'Procedural meshes, custom shaders, orbital camera kinematics, and 60 FPS rendering.' },
    { id: 'next', label: 'Next.js', cluster: 'mern', project: 'Web Architecture', projectHref: '#projects', desc: 'Server-side rendering (SSR), app router architecture, and asset optimization.' },
    { id: 'canvas', label: 'HTML5 Canvas API', cluster: 'mern', project: 'ShadowPlay Gestures', projectHref: '#projects', desc: 'Real-time vector kinematics, 2D bone rendering, and sub-20ms frame loop.' },

    // Applied AI & Analytics Cluster
    { id: 'gemini', label: 'Google Gemini API', isHub: true, cluster: 'ai', project: 'GYAN.AI & Repo City', projectHref: '#projects', desc: 'Multimodal reasoning, long-context transcript chunking, and code tutoring.' },
    { id: 'groq', label: 'Groq Cloud LLMs', cluster: 'ai', project: 'GYAN.AI Dual-LLM', projectHref: '#projects', desc: 'Ultra low-latency LPU inference fallback for instantaneous notes synthesis.' },
    { id: 'openai', label: 'OpenAI API', cluster: 'ai', project: 'Repo City AI Quiz', projectHref: '#projects', desc: 'Streaming completion pipelines, JSON structured outputs, and embeddings.' },
    { id: 'mediapipe', label: 'MediaPipe Hands', isHub: true, cluster: 'ai', project: 'ShadowPlay Studio', projectHref: '#projects', desc: 'Computer vision pipeline tracking 21 3D hand landmarks in real-time.' },
    { id: 'python', label: 'Python (Analytics)', isHub: true, cluster: 'ai', project: 'BSNL Government Internship', projectHref: '#experience', desc: 'Telemetry data processing, feature engineering, and statistical modeling.' },
    { id: 'sklearn', label: 'Scikit-learn', cluster: 'ai', project: 'BSNL Telecom Analytics', projectHref: '#experience', desc: 'Linear regression risk modeling identifying 0.7 QoS-churn correlation.' },
    { id: 'pandas', label: 'Pandas & NumPy', cluster: 'ai', project: 'BSNL 10,000+ Records', projectHref: '#experience', desc: 'Simulated telecom telemetry dataset curation and Power BI pipeline preparation.' },

    // Core Systems, Compilers & DevOps
    { id: 'dsa', label: 'DSA & Algorithms', isHub: true, cluster: 'core', project: 'SIH \'25 National Runner-up', projectHref: '#certificates', desc: 'Graph traversal, dynamic programming, priority queues, and algorithmic problem solving.' },
    { id: 'ast', label: 'AST Parsing', cluster: 'core', project: 'Repo City Multi-Language', projectHref: '#projects', desc: 'Syntax tree generation, tokenization, and dependency graph cycle analysis.' },
    { id: 'dag', label: 'DAG Algorithms', cluster: 'core', project: 'Repo City Dependency Tree', projectHref: '#projects', desc: 'Directed Acyclic Graph topological sorting for structural repository visualization.' },
    { id: 'cpp', label: 'C & C++', cluster: 'core', project: 'Academic & Competitive', projectHref: '#about', desc: 'Low-level memory management, pointers, and algorithmic runtime analysis.' },
    { id: 'mysql', label: 'MySQL', cluster: 'core', project: 'Database Systems', projectHref: '#about', desc: 'Relational schema design, foreign key constraints, indexes, and ACID transactions.' },
    { id: 'git', label: 'Git & GitHub Actions', cluster: 'core', project: 'CI/CD & Production Repos', projectHref: '#projects', desc: 'Automated CI/CD workflows, semantic versioning, and branch protection.' },
    { id: 'render', label: 'Render & Cloud Hosting', cluster: 'core', project: 'Production Web Apps', projectHref: '#projects', desc: 'Automated cloud buildpacks, environment secret management, and zero-downtime deploys.' }
  ];

  const RAW_EDGES = [
    // Java cluster bonds
    ['java', 'spring-boot'],
    ['spring-boot', 'spring-sec'],
    ['spring-boot', 'spring-ai'],
    ['spring-boot', 'threads'],
    ['spring-boot', 'rest-apis'],
    ['spring-sec', 'rest-apis'],
    ['spring-boot', 'mysql'],
    ['spring-ai', 'gemini'],
    ['spring-ai', 'openai'],

    // MERN cluster bonds
    ['react', 'node'],
    ['node', 'express'],
    ['express', 'mongo'],
    ['node', 'mongo'],
    ['react', 'three'],
    ['react', 'next'],
    ['three', 'canvas'],
    ['react', 'canvas'],
    ['node', 'rest-apis'],

    // AI cluster bonds
    ['gemini', 'groq'],
    ['gemini', 'openai'],
    ['mediapipe', 'canvas'],
    ['mediapipe', 'react'],
    ['python', 'sklearn'],
    ['python', 'pandas'],
    ['sklearn', 'pandas'],
    ['gemini', 'react'],

    // Cross-cutting / Core CSE bonds
    ['dsa', 'ast'],
    ['ast', 'dag'],
    ['dsa', 'cpp'],
    ['ast', 'java'],
    ['ast', 'node'],
    ['git', 'render'],
    ['node', 'render'],
    ['spring-boot', 'render'],
    ['git', 'ast']
  ];

  // --- 2. ENGINE STATE ---
  let canvas = null;
  let ctx = null;
  let container = null;
  let animFrameId = null;
  let width = 0;
  let height = 0;
  let dpr = 1;

  let nodes = [];
  let edges = [];
  let activeClusterFilter = 'all';
  let hoveredNode = null;
  let draggedNode = null;
  let dragOffset = { x: 0, y: 0 };
  let mousePos = { x: -9999, y: -9999 };

  // HUD elements
  let hudName = null;
  let hudCluster = null;
  let hudDesc = null;
  let hudProjectLink = null;
  let hudProjectText = null;

  // --- 3. INITIALIZATION ---
  function init() {
    canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;

    container = canvas.parentElement;
    ctx = canvas.getContext('2d');
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Cache HUD DOM references
    hudName = document.getElementById('hud-node-name');
    hudCluster = document.getElementById('hud-node-cluster');
    hudDesc = document.getElementById('hud-node-desc');
    hudProjectLink = document.getElementById('hud-node-link');
    hudProjectText = document.getElementById('hud-node-link-text');

    setupSize();
    buildNodes();
    bindEvents();
    bindControls();

    // Start 60fps loop
    animFrameId = requestAnimationFrame(renderLoop);
  }

  function setupSize() {
    if (!container || !canvas) return;
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = Math.max(rect.height, 460);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  function buildNodes() {
    nodes = RAW_NODES.map((n, idx) => {
      const cluster = CLUSTERS[n.cluster];
      const targetCenterX = cluster.centerRatio.x * width;
      const targetCenterY = cluster.centerRatio.y * height;

      // Jitter around cluster center
      const angle = (idx / RAW_NODES.length) * Math.PI * 2 + Math.random() * 0.5;
      const dist = (n.isHub ? 25 : 55) + Math.random() * 45;

      const x = targetCenterX + Math.cos(angle) * dist;
      const y = targetCenterY + Math.sin(angle) * dist;

      return {
        ...n,
        x: Math.max(30, Math.min(width - 30, x)),
        y: Math.max(30, Math.min(height - 30, y)),
        vx: 0,
        vy: 0,
        radius: n.isHub ? 15 : 10,
        baseRadius: n.isHub ? 15 : 10,
        clusterData: cluster,
        oscOffset: idx * 0.38,
        isHovered: false
      };
    });

    // Resolve edge references to node objects
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    edges = RAW_EDGES.map(([srcId, tgtId]) => ({
      source: nodeMap.get(srcId),
      target: nodeMap.get(tgtId)
    })).filter(e => e.source && e.target);
  }

  // --- 4. PHYSICS SIMULATION ---
  function updatePhysics(time) {
    const t = time * 0.0015;

    // Center attractor & harmonic breathing
    nodes.forEach(n => {
      if (draggedNode === n) return;

      const cluster = n.clusterData;
      const targetX = cluster.centerRatio.x * width;
      const targetY = cluster.centerRatio.y * height;

      // Gentle spring to cluster center
      const dx = targetX - n.x;
      const dy = targetY - n.y;
      n.vx += dx * 0.0035;
      n.vy += dy * 0.0035;

      // Organic fluid breathing
      n.vx += Math.sin(t + n.oscOffset) * 0.12;
      n.vy += Math.cos(t * 0.8 + n.oscOffset) * 0.12;

      // Mouse repulsion/attraction if near
      if (mousePos.x > 0 && mousePos.y > 0) {
        const mdx = n.x - mousePos.x;
        const mdy = n.y - mousePos.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < 12000 && mDistSq > 1) {
          const mDist = Math.sqrt(mDistSq);
          const force = (110 - mDist) / 110;
          n.vx += (mdx / mDist) * force * 0.8;
          n.vy += (mdy / mDist) * force * 0.8;
        }
      }
    });

    // Node-to-node Coulomb repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distSq = dx * dx + dy * dy;
        const minDist = a.radius + b.radius + 36;
        if (distSq < minDist * minDist && distSq > 0.1) {
          const dist = Math.sqrt(distSq);
          const overlap = (minDist - dist) / dist;
          const fx = dx * overlap * 0.04;
          const fy = dy * overlap * 0.04;
          if (draggedNode !== a) { a.vx -= fx; a.vy -= fy; }
          if (draggedNode !== b) { b.vx += fx; b.vy += fy; }
        }
      }
    }

    // Spring forces along edges
    edges.forEach(e => {
      const a = e.source;
      const b = e.target;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const restLen = 75;
      const diff = dist - restLen;
      const force = diff * 0.004;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      if (draggedNode !== a) { a.vx += fx; a.vy += fy; }
      if (draggedNode !== b) { b.vx -= fx; b.vy -= fy; }
    });

    // Integration and boundary containment
    nodes.forEach(n => {
      if (draggedNode === n) return;

      n.vx *= 0.90; // friction
      n.vy *= 0.90;

      n.x += n.vx;
      n.y += n.vy;

      // Soft bounce within viewport boundaries
      const pad = n.radius + 15;
      if (n.x < pad) { n.x = pad; n.vx *= -0.5; }
      if (n.x > width - pad) { n.x = width - pad; n.vx *= -0.5; }
      if (n.y < pad) { n.y = pad; n.vy *= -0.5; }
      if (n.y > height - pad) { n.y = height - pad; n.vy *= -0.5; }
    });
  }

  // --- 5. RENDER LOOP ---
  function renderLoop(time) {
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    updatePhysics(time);
    drawFilaments(time);
    drawNodes(time);

    animFrameId = requestAnimationFrame(renderLoop);
  }

  function drawFilaments(time) {
    const t = time * 0.002;

    edges.forEach(e => {
      const a = e.source;
      const b = e.target;

      const isConnectedToHover = hoveredNode && (hoveredNode === a || hoveredNode === b);
      const isFilteredOut = activeClusterFilter !== 'all' && 
                            a.cluster !== activeClusterFilter && 
                            b.cluster !== activeClusterFilter;

      let alpha = 0.16;
      let strokeStyle = 'rgba(241, 244, 246, 0.12)';
      let lineWidth = 1;

      if (isFilteredOut) {
        alpha = 0.04;
      } else if (isConnectedToHover) {
        alpha = 0.90;
        lineWidth = 2.2;
        strokeStyle = hoveredNode.clusterData.color;
      } else if (a.cluster === b.cluster) {
        alpha = 0.28;
        strokeStyle = a.clusterData.color;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      // Ambient pulse particle traveling along highlighted edges
      if (isConnectedToHover || (!hoveredNode && a.isHub && b.isHub)) {
        const pulseRatio = (Math.sin(t + a.oscOffset * 2) + 1) * 0.5;
        const px = a.x + (b.x - a.x) * pulseRatio;
        const py = a.y + (b.y - a.y) * pulseRatio;

        ctx.fillStyle = a.clusterData.color;
        ctx.beginPath();
        ctx.arc(px, py, isConnectedToHover ? 2.8 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  function drawNodes(time) {
    const t = time * 0.003;

    nodes.forEach(n => {
      const isHovered = (hoveredNode === n);
      const isNeighbor = hoveredNode && edges.some(e => 
        (e.source === hoveredNode && e.target === n) || 
        (e.target === hoveredNode && e.source === n)
      );
      const isFiltered = (activeClusterFilter === 'all' || n.cluster === activeClusterFilter);

      let targetRadius = n.baseRadius;
      if (isHovered) targetRadius = n.baseRadius * 1.35;
      else if (isNeighbor) targetRadius = n.baseRadius * 1.15;
      n.radius += (targetRadius - n.radius) * 0.2;

      let opacity = isFiltered ? 1 : 0.22;
      if (hoveredNode && !isHovered && !isNeighbor) {
        opacity *= 0.45;
      }

      ctx.save();
      ctx.globalAlpha = opacity;

      // 1. Radial glow halo
      const glowGrad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.4, n.x, n.y, n.radius * 2.8);
      glowGrad.addColorStop(0, n.clusterData.glow);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Node Core Disc
      ctx.fillStyle = n.clusterData.fill;
      ctx.strokeStyle = n.clusterData.color;
      ctx.lineWidth = isHovered ? 2.5 : (n.isHub ? 2 : 1.2);

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 3. Central luminous bead
      const beadGlow = isHovered ? 4.5 : (n.isHub ? 3.5 : 2.2);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(n.x, n.y, beadGlow, 0, Math.PI * 2);
      ctx.fill();

      // 4. Pulsing orbital radar ring for active hubs
      if (n.isHub || isHovered) {
        const pulse = (Math.sin(t + n.oscOffset) + 1) * 0.5;
        const ringR = n.radius + 4 + pulse * 6;
        ctx.strokeStyle = n.clusterData.color;
        ctx.globalAlpha = opacity * (1 - pulse) * 0.65;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. Node Label (High-contrast typography)
      ctx.globalAlpha = isFiltered ? (isHovered ? 1 : (n.isHub ? 0.95 : 0.82)) : 0.2;
      ctx.font = isHovered 
        ? '600 12px "JetBrains Mono", monospace' 
        : (n.isHub ? '500 11px "JetBrains Mono", monospace' : '400 10px "JetBrains Mono", monospace');
      ctx.fillStyle = isHovered ? '#ffffff' : (n.isHub ? '#e8eff2' : '#a2b4bd');
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      // Subtle text drop shadow for legibility over filaments
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;

      ctx.fillText(n.label, n.x, n.y + n.radius + 6);

      ctx.restore();
    });
  }

  // --- 6. INTERACTION & EVENTS ---
  function findNodeAt(px, py) {
    // Search in reverse so top-drawn hubs get priority
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      const dx = px - n.x;
      const dy = py - n.y;
      const hitRadius = n.radius + 14;
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        return n;
      }
    }
    return null;
  }

  function updateHUD(node) {
    // HUD overlay removed per user preference; nodes render labels & glowing halos directly on canvas.
  }

  function bindEvents() {
    function getCanvasCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    // Pointer move
    function onPointerMove(e) {
      const coords = getCanvasCoords(e);
      mousePos.x = coords.x;
      mousePos.y = coords.y;

      if (draggedNode) {
        draggedNode.x = coords.x - dragOffset.x;
        draggedNode.y = coords.y - dragOffset.y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        canvas.style.cursor = 'grabbing';
        return;
      }

      const hit = findNodeAt(coords.x, coords.y);
      if (hit !== hoveredNode) {
        hoveredNode = hit;
        canvas.style.cursor = hit ? 'grab' : 'crosshair';
        updateHUD(hit);
      }
    }

    // Pointer down
    function onPointerDown(e) {
      const coords = getCanvasCoords(e);
      const hit = findNodeAt(coords.x, coords.y);
      if (hit) {
        draggedNode = hit;
        dragOffset.x = coords.x - hit.x;
        dragOffset.y = coords.y - hit.y;
        canvas.style.cursor = 'grabbing';
      }
    }

    // Pointer up
    function onPointerUp() {
      if (draggedNode) {
        draggedNode = null;
        canvas.style.cursor = hoveredNode ? 'grab' : 'crosshair';
      }
    }

    // Mouse leave
    function onMouseLeave() {
      mousePos.x = -9999;
      mousePos.y = -9999;
      hoveredNode = null;
      draggedNode = null;
      updateHUD(null);
    }

    canvas.addEventListener('mousemove', onPointerMove, { passive: true });
    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      onPointerDown(e);
      onPointerMove(e);
    }, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Click to scroll to project if clicked
    canvas.addEventListener('click', (e) => {
      const coords = getCanvasCoords(e);
      const hit = findNodeAt(coords.x, coords.y);
      if (hit && hit.projectHref) {
        const targetEl = document.querySelector(hit.projectHref);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupSize();
        buildNodes();
      }, 150);
    });
  }

  // --- 7. FILTER BUTTONS & VIEW TOGGLE ---
  function bindControls() {
    // Cluster Filter Pills
    const filterBtns = document.querySelectorAll('.constellation-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeClusterFilter = btn.getAttribute('data-cluster') || 'all';

        // Pulse camera center to filtered cluster
        if (activeClusterFilter !== 'all' && CLUSTERS[activeClusterFilter]) {
          const cluster = CLUSTERS[activeClusterFilter];
          nodes.forEach(n => {
            if (n.cluster === activeClusterFilter) {
              n.vx += (Math.random() - 0.5) * 5;
              n.vy += (Math.random() - 0.5) * 5;
            }
          });
        }
      });
    });

    // Dual-Mode Toggle: Constellation vs Recruiter Grid
    const modeBtns = document.querySelectorAll('.skills-mode-toggle-btn');
    const constellationViewport = document.getElementById('constellation-viewport');
    const recruiterGrid = document.getElementById('recruiter-skills-grid');

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');

        if (mode === 'constellation') {
          if (constellationViewport) constellationViewport.style.display = 'block';
          if (recruiterGrid) recruiterGrid.style.display = 'none';
          setupSize();
        } else {
          if (constellationViewport) constellationViewport.style.display = 'none';
          if (recruiterGrid) recruiterGrid.style.display = 'grid';
        }
      });
    });
  }

  // Auto-init on DOMContentLoaded or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
