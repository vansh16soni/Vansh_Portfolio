/**
 * AST Dependency Graph & Code Architecture Canvas
 * Visual Anchor: Simulates a live Directed Acyclic Graph (DAG) and AST parsing network.
 * Human-art-directed: Clean lines, restrained physics, Spring/Java technical aesthetic.
 */

(function () {
  const canvas = document.getElementById('hero-anchor-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const coordDisplay = document.getElementById('canvas-coords');
  const nodeCountDisplay = document.getElementById('canvas-nodes');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  let mouse = { x: -1000, y: -1000, active: false };
  let animFrameId = null;

  // Node taxonomy representing Vansh's technical architecture
  const NODE_BLUEPRINTS = [
    { label: 'RepoCity::AST', type: 'core', xRel: 0.5, yRel: 0.45 },
    { label: 'DAG::Resolver', type: 'algo', xRel: 0.3, yRel: 0.32 },
    { label: 'Spring::Context', type: 'java', xRel: 0.72, yRel: 0.28 },
    { label: 'SpringAI::Client', type: 'java', xRel: 0.85, yRel: 0.45 },
    { label: 'Three::CityMesh', type: 'graphics', xRel: 0.38, yRel: 0.68 },
    { label: 'MediaPipe::WASM', type: 'cv', xRel: 0.18, yRel: 0.55 },
    { label: 'Groq::Fallback', type: 'ai', xRel: 0.65, yRel: 0.65 },
    { label: 'Gemini::Engine', type: 'ai', xRel: 0.82, yRel: 0.72 },
    { label: 'JWT::Security', type: 'sec', xRel: 0.62, yRel: 0.18 },
    { label: 'Mongo::Stream', type: 'data', xRel: 0.22, yRel: 0.78 },
    { label: 'PacketTracer::OSI', type: 'cisco', xRel: 0.48, yRel: 0.2 }
  ];

  const EDGES = [
    [0, 1], [0, 4], [0, 2],
    [2, 3], [3, 6], [3, 7],
    [1, 9], [4, 5], [2, 8],
    [1, 10], [6, 7], [0, 8]
  ];

  let nodes = [];

  function initNodes() {
    nodes = NODE_BLUEPRINTS.map((bp, i) => {
      const baseX = bp.xRel * width;
      const baseY = bp.yRel * height;
      return {
        id: i,
        label: bp.label,
        type: bp.type,
        baseX: baseX,
        baseY: baseY,
        x: baseX + (Math.random() - 0.5) * 20,
        y: baseY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: bp.type === 'core' ? 6 : bp.type === 'java' ? 5 : 4,
        highlight: false
      };
    });

    if (nodeCountDisplay) {
      nodeCountDisplay.textContent = `${nodes.length} NODES // ${EDGES.length} EDGES`;
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initNodes();
  }

  function update() {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Gentle spring return to base position
      const dxBase = node.baseX - node.x;
      const dyBase = node.baseY - node.y;
      node.vx += dxBase * 0.015;
      node.vy += dyBase * 0.015;

      // Mouse repulsion / proximity highlight
      if (mouse.active) {
        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const dist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          node.vx += (dxMouse / dist) * force * 1.2;
          node.vy += (dyMouse / dist) * force * 1.2;
          node.highlight = true;
        } else {
          node.highlight = false;
        }
      } else {
        node.highlight = false;
      }

      // Damping
      node.vx *= 0.88;
      node.vy *= 0.88;

      node.x += node.vx;
      node.y += node.vy;
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines (Swiss technical graph)
    ctx.strokeStyle = 'rgba(234, 233, 225, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Edges (Directed graph lines with flow dot)
    const time = Date.now() * 0.0015;
    for (let i = 0; i < EDGES.length; i++) {
      const [fromIdx, toIdx] = EDGES[i];
      const from = nodes[fromIdx];
      const to = nodes[toIdx];
      if (!from || !to) continue;

      const isConnectedToHover = from.highlight || to.highlight;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = isConnectedToHover
        ? 'rgba(109, 179, 63, 0.65)'
        : 'rgba(234, 233, 225, 0.12)';
      ctx.lineWidth = isConnectedToHover ? 1.5 : 1;
      ctx.stroke();

      // Flowing particle along edge
      const flowT = (time + i * 0.35) % 1;
      const flowX = from.x + (to.x - from.x) * flowT;
      const flowY = from.y + (to.y - from.y) * flowT;

      ctx.beginPath();
      ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = isConnectedToHover ? '#6DB33F' : 'rgba(234, 233, 225, 0.4)';
      ctx.fill();
    }

    // Draw Nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Node outer glow / halo if highlighted
      if (node.highlight) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(109, 179, 63, 0.18)';
        ctx.fill();
      }

      // Node Body
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      if (node.type === 'java') {
        ctx.fillStyle = '#F89820'; // Java Orange
      } else if (node.type === 'core' || node.highlight) {
        ctx.fillStyle = '#6DB33F'; // Spring Green
      } else {
        ctx.fillStyle = '#EAE9E1'; // Warm Off-White
      }
      ctx.fill();

      // Node Label (Monospace technical text)
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.fillStyle = node.highlight
        ? '#6DB33F'
        : node.type === 'java'
        ? '#F89820'
        : 'rgba(234, 233, 225, 0.7)';
      ctx.fillText(node.label, node.x + node.radius + 6, node.y + 3);
    }
  }

  function loop() {
    update();
    render();
    animFrameId = requestAnimationFrame(loop);
  }

  // Mouse tracking
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    if (coordDisplay && width > 0 && height > 0) {
      const normX = (mouse.x / width).toFixed(2);
      const normY = (mouse.y / height).toFixed(2);
      coordDisplay.textContent = `LOC: [${normX}, ${normY}]`;
    }
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
    if (coordDisplay) {
      coordDisplay.textContent = 'LOC: [IDLE_STANDBY]';
    }
  });

  // Window resize observer
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 100);
  });

  // Init
  resize();
  loop();
})();
