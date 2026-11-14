/**
 * Editorial Project Case Study Modal System
 * Provides in-depth architectural dossiers without generic card popups.
 */

const PROJECT_DOSSIERS = {
  repocity: {
    num: "01",
    tag: "SOLO / SYSTEMS ARCHITECTURE",
    title: "Repo City — 3D Codebase Visualization & AI Learning Platform",
    subtitle: "Procedural 3D architectural mapping of software repositories with AST dependency graphs",
    tech: ["Three.js", "React.js", "Node.js", "Express.js", "MongoDB", "AST Parsing", "DAG Algorithms", "Gemini / OpenAI", "GitHub OAuth 2.0", "SSE"],
    role: "Lead Full-Stack & Graphics Developer",
    github: "https://github.com/vansh16soni/RepoCity",
    demo: "https://repo-city.onrender.com/",
    image: "assets/projects/repocity.png",
    problem: "Understanding large, unfamiliar codebases typically involves traversing fragmented folder trees and disconnected documentation, making structural debt, tightly coupled modules, and cognitive bottlenecks hard to identify.",
    architecture: [
      "Engineered multi-language Abstract Syntax Tree (AST) parsers to analyze code structure, module imports, and function complexity metrics across repositories.",
      "Formulated Directed Acyclic Graph (DAG) algorithms to calculate inter-module dependencies and visualize circular dependency vulnerabilities.",
      "Implemented procedural 3D building generation in Three.js where building footprint, height, and texture denote file size, cyclomatic complexity, and recent commit velocity.",
      "Integrated Server-Sent Events (SSE) alongside Gemini and OpenAI APIs to power an interactive AI tutor that conducts localized architecture walkthroughs and automated code assessments."
    ],
    outcomes: "Provides an intuitive spatial mental model of complex codebases, allowing developers to inspect dependency flows and pinpoint high-risk files instantly."
  },

  gyanai: {
    num: "02",
    tag: "SOLO / APPLIED AI PLATFORM",
    title: "GYAN.AI — AI-Powered Technical Notes & Knowledge Platform",
    subtitle: "Automated synthesis of dense technical video lectures into structured knowledge graphs",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "Groq Cloud", "React Flow", "JWT Auth", "Canvas API"],
    role: "Full-Stack AI Engineer",
    github: "https://github.com/vansh16soni/GYAN.AI",
    demo: "https://gyan-ai-mbtq.onrender.com/",
    image: "assets/projects/gyanai.png",
    problem: "Online technical lectures contain rich pedagogical value but lack structured searchability, forcing students to rewatch lengthy videos repeatedly to extract core architectural concepts.",
    architecture: [
      "Constructed a high-throughput pipeline that fetches, cleans, and chunks timestamped transcripts using contextual semantic boundary detection.",
      "Orchestrated a dual-LLM fallback mechanism pairing Google Gemini's deep reasoning with Groq's low-latency Llama-3 inference for uninterrupted pipeline reliability.",
      "Rendered dynamic, interactive concept graphs using React Flow, mapping prerequisite chains, definitions, and code syntax trees.",
      "Built multi-format export engines allowing learners to package synthesized notes into Markdown, PDF, and DOCX formats with full LaTeX math equation rendering."
    ],
    outcomes: "Transforms 60-minute technical discourses into searchable, structured study dossiers in under 12 seconds with verifiable reference timestamps."
  },

  shadowplay: {
    num: "03",
    tag: "SOLO / COMPUTER VISION & WASM",
    title: "ShadowPlay — Real-Time Hand Gesture & Shadow Puppet Studio",
    subtitle: "High-frame-rate browser shadow puppetry via 21 3D hand landmarks and client-side WebAssembly",
    tech: ["MediaPipe Hands", "WebAssembly (WASM)", "Canvas API", "Three.js", "React.js", "Node.js", "MongoDB"],
    role: "Creative Technologist & Frontend Engineer",
    github: "https://github.com/vansh16soni/ShadowPlay",
    demo: "https://shadowplay.onrender.com/",
    image: "assets/projects/shadowplay.png",
    problem: "Real-time webcam interactions frequently suffer from high computational latency and invasive cloud video streaming, raising privacy concerns and ruining tactile responsiveness.",
    architecture: [
      "Integrated MediaPipe Hands compiled to WebAssembly for sub-20ms client-side inference across 21 3D hand landmark coordinates.",
      "Engineered a zero-network-transmission pipeline: video frames remain strictly inside local browser memory, guaranteeing absolute user privacy.",
      "Devised a physics-based 2D/3D shadow casting renderer using HTML5 Canvas API and Three.js light-source shaders that deform virtual shadow puppet silhouettes in real time.",
      "Implemented gesture recognition states enabling users to summon interactive storytelling props, light filters, and mini-game challenges."
    ],
    outcomes: "Achieved continuous 60 FPS performance in standard desktop and mobile browsers without requiring external GPU server acceleration."
  },

  netsage: {
    num: "04",
    tag: "INDUSTRY / CISCO AI INTERNSHIP",
    title: "NetSage AI — AI-Powered Network Troubleshooting Assistant",
    subtitle: "Automated diagnostic synthesis for Cisco Packet Tracer topologies across the OSI stack",
    tech: ["Node.js", "Express.js", "Spring Boot", "Cisco Packet Tracer", "LLM Reasoning Chains", "OSI Layer Classifier", "REST APIs"],
    role: "AI Engineering Intern",
    github: "https://github.com/vansh16soni/Cisco_NetSage_AI",
    demo: "https://netsage-ai-c7rd.onrender.com/",
    certificate: "https://drive.google.com/file/d/1Xeq-S6DqLiRhNI5TTC_y3o3d8kw4OUrL/view",
    problem: "Troubleshooting complex simulated network labs involves tedious manual inspection of CLI routing tables, VLAN tags, and ACL rules with high risk of human oversight.",
    architecture: [
      "Designed an automated parser to extract and normalize diagnostic command outputs (such as `show ip route`, `traceroute`, `show interfaces`) from Packet Tracer lab state dumps.",
      "Constructed a multi-stage LLM diagnostic chain that maps observed packet loss and routing misconfigurations to specific OSI 7-layer tiers.",
      "Delivered confidence-weighted remediation suggestions and generated syntactically validated Cisco IOS corrective command snippets.",
      "Built a human-in-the-loop review interface to verify proposed configuration changes before applying them to topology nodes."
    ],
    outcomes: "Reduced average diagnostic time on enterprise packet routing topologies while creating a transparent audit trail of root-cause hypotheses."
  },

  telecom: {
    num: "05",
    tag: "GOVERNMENT / BSNL DATA ANALYTICS",
    title: "Telecom Data Analytics — Network Quality & Revenue Optimization",
    subtitle: "Empirical correlation modeling of QoS degradation and ARPU attrition across 10,000+ records",
    tech: ["Node.js", "React.js", "Streaming Data Pipelines", "Power BI", "Linear Regression", "Statistical Modeling"],
    role: "Government Data Analytics Intern",
    github: "https://github.com/vansh16soni/Telecom_project",
    demo: "#",
    certificate: "https://drive.google.com/file/d/1P-cfeRcdcxjL4IIfexnz2sh1z4QVsK3I/view",
    problem: "Identifying early churn drivers in regional telecom circles before customer departure requires correlating granular technical network telemetry with financial billing patterns.",
    architecture: [
      "Cleaned, normalized, and explored 10,000+ simulated telecom telemetry records encompassing latency, jitter, call drop rates, and billing cycles.",
      "Established an empirical 0.7 Pearson correlation index demonstrating direct causality between Quality of Service (QoS) degradation and Average Revenue Per User (ARPU) decline.",
      "Trained regularized statistical regression models to forecast at-risk regional revenue segments, pinpointing approximately INR 2 Lakhs/month in vulnerable subscriber revenue.",
      "Constructed executive Power BI dashboards with drill-down filters for regional telecom engineers and infrastructure planners."
    ],
    outcomes: "Equipped decision makers with actionable predictive signals to prioritize antenna and fiber maintenance in high-churn regional clusters."
  }
};

window.openProjectModal = function (projectId) {
  const data = PROJECT_DOSSIERS[projectId];
  if (!data) return;

  const backdrop = document.getElementById('project-modal-backdrop');
  const titleEl = document.getElementById('modal-project-title');
  const tagEl = document.getElementById('modal-project-tag');
  const numEl = document.getElementById('modal-project-num');
  const subtitleEl = document.getElementById('modal-project-subtitle');
  const techEl = document.getElementById('modal-project-tech');
  const problemEl = document.getElementById('modal-project-problem');
  const archListEl = document.getElementById('modal-project-arch');
  const outcomeEl = document.getElementById('modal-project-outcome');
  const githubLink = document.getElementById('modal-project-github');
  const demoLink = document.getElementById('modal-project-demo');

  if (titleEl) titleEl.textContent = data.title;
  if (tagEl) tagEl.textContent = data.tag;
  if (numEl) numEl.textContent = `CASE STUDY // ${data.num}`;
  if (subtitleEl) subtitleEl.textContent = data.subtitle;
  if (problemEl) problemEl.textContent = data.problem;
  if (outcomeEl) outcomeEl.textContent = data.outcomes;

  if (techEl) {
    techEl.innerHTML = data.tech.map(t => {
      const isJava = t.toLowerCase().includes('spring') || t.toLowerCase().includes('java');
      return `<span class="tech-stamp ${isJava ? 'stamp-java' : ''}">${t}</span>`;
    }).join('');
  }

  if (archListEl) {
    archListEl.innerHTML = data.architecture.map(a => `<li class="timeline-bullet-item">${a}</li>`).join('');
  }

  if (githubLink) {
    githubLink.href = data.github;
  }

  if (demoLink) {
    if (data.demo && data.demo !== '#') {
      demoLink.href = data.demo;
      demoLink.style.display = 'inline-flex';
    } else {
      demoLink.style.display = 'none';
    }
  }

  const certLink = document.getElementById('modal-project-cert');
  if (certLink) {
    if (data.certificate) {
      certLink.href = data.certificate;
      certLink.style.display = 'inline-flex';
    } else {
      certLink.style.display = 'none';
    }
  }

  const modalImgSection = document.getElementById('modal-visual-preview-section');
  const modalImg = document.getElementById('modal-project-img');
  const modalImgLink = document.getElementById('modal-project-img-link');
  const modalExtLink = document.getElementById('modal-project-ext-link');
  const modalUrlText = document.getElementById('modal-project-url-text');

  if (modalImgSection && modalImg) {
    if (data.image) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalImgSection.style.display = 'block';
      if (modalImgLink) {
        modalImgLink.href = (data.demo && data.demo !== '#') ? data.demo : data.github;
      }
      if (modalExtLink && modalUrlText) {
        if (data.demo && data.demo !== '#') {
          modalExtLink.href = data.demo;
          modalUrlText.textContent = data.demo.replace(/^https?:\/\//, '');
          modalExtLink.style.display = 'inline-flex';
        } else {
          modalExtLink.style.display = 'none';
        }
      }
    } else {
      modalImgSection.style.display = 'none';
    }
  }

  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    startArchTopology(projectId);
  }
};

window.closeProjectModal = function () {
  const backdrop = document.getElementById('project-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    stopArchTopology();
  }
};

// ============================================================================
// Interactive 3D Liquid Glass Component Topology Chamber
// ============================================================================
let archAnimationId = null;
let archDragX = 0.25;
let archDragY = 0.2;
let archIsDragging = false;
let archLastX = 0;
let archLastY = 0;

const TOPOLOGY_SCHEMAS = {
  repocity: [
    { id: "UI", label: "Three.js 3D View", x: -1.6, y: -0.4, z: 0 },
    { id: "API", label: "Express / SSE", x: -0.6, y: 0.6, z: -0.4 },
    { id: "AST", label: "AST Syntax Engine", x: 0.5, y: -0.5, z: 0.4 },
    { id: "DAG", label: "DAG Module Graph", x: 1.4, y: 0.4, z: -0.3 },
    { id: "AI", label: "Gemini / OpenAI", x: 0.0, y: 1.0, z: 0.5 }
  ],
  gyanai: [
    { id: "CLIENT", label: "React Client", x: -1.5, y: -0.2, z: 0.3 },
    { id: "CHUNKER", label: "Semantic Chunker", x: -0.5, y: 0.6, z: -0.4 },
    { id: "GEMINI", label: "Gemini 1.5 Pro", x: 0.7, y: 0.8, z: 0.2 },
    { id: "GROQ", label: "Groq Llama Fallback", x: 0.6, y: -0.6, z: -0.3 },
    { id: "GRAPH", label: "React Flow DAGs", x: 1.6, y: 0.0, z: 0.4 }
  ],
  shadowplay: [
    { id: "CAM", label: "Webcam Memory", x: -1.5, y: 0.0, z: 0.2 },
    { id: "WASM", label: "MediaPipe WASM", x: -0.5, y: 0.7, z: -0.3 },
    { id: "LAND", label: "21 Hand Landmarks", x: 0.5, y: -0.4, z: 0.4 },
    { id: "MESH", label: "Shadow Silhouette", x: 1.5, y: 0.4, z: -0.2 }
  ],
  netsage: [
    { id: "LAB", label: "Packet Tracer", x: -1.5, y: -0.3, z: 0.2 },
    { id: "PARSE", label: "CLI Normalizer", x: -0.4, y: 0.6, z: -0.4 },
    { id: "OSI", label: "7-Layer Classifier", x: 0.6, y: -0.5, z: 0.3 },
    { id: "LLM", label: "Root Cause Chain", x: 1.4, y: 0.5, z: -0.2 }
  ],
  telecom: [
    { id: "STREAM", label: "Node.js Streams", x: -1.5, y: 0.0, z: 0.2 },
    { id: "QOS", label: "QoS Correlator", x: -0.4, y: 0.6, z: -0.3 },
    { id: "REG", label: "Regression Model", x: 0.6, y: -0.4, z: 0.4 },
    { id: "BI", label: "Power BI Ledger", x: 1.5, y: 0.4, z: -0.2 }
  ]
};

function startArchTopology(projectId) {
  stopArchTopology();
  const canvas = document.getElementById('modal-arch-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = (rect.width || 560) * dpr;
  canvas.height = (rect.height || 195) * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const nodes = TOPOLOGY_SCHEMAS[projectId] || TOPOLOGY_SCHEMAS.repocity;
  let startTime = performance.now();

  // Mouse drag handler on canvas
  canvas.onmousedown = (e) => {
    archIsDragging = true;
    archLastX = e.clientX;
    archLastY = e.clientY;
  };

  window.onmousemove = (e) => {
    if (!archIsDragging) return;
    const dx = (e.clientX - archLastX) * 0.009;
    const dy = (e.clientY - archLastY) * 0.009;
    archDragX += dy;
    archDragY += dx;
    archLastX = e.clientX;
    archLastY = e.clientY;
  };

  window.onmouseup = () => {
    archIsDragging = false;
  };

  function render(now) {
    const elapsed = (now - startTime) * 0.001;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.5;
    const scale = Math.min(w, h) * 0.26;

    const rotX = archDragX + Math.sin(elapsed * 0.4) * 0.08;
    const rotY = archDragY + elapsed * 0.18;

    // Project 3D nodes
    const projected = nodes.map((n) => {
      // Rotate 3D
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x1 = n.x * cosY - n.z * sinY;
      const z1 = n.x * sinY + n.z * cosY;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const y2 = n.y * cosX - z1 * sinX;
      const z2 = n.y * sinX + z1 * cosX;

      const fov = 4.2;
      const camZ = 5.2 - z2;
      const p = fov / (camZ > 0.5 ? camZ : 0.5);

      return {
        id: n.id,
        label: n.label,
        sx: cx + x1 * scale * p,
        sy: cy + y2 * scale * p,
        z: z2
      };
    });

    // Draw glowing conduits between adjacent nodes
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.strokeStyle = 'rgba(121, 175, 136, 0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Moving data packet along line
        const packetT = (elapsed * 0.7 + (i + j) * 0.25) % 1;
        const px = p1.sx + (p2.sx - p1.sx) * packetT;
        const py = p1.sy + (p2.sy - p1.sy) * packetT;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(189, 217, 231, 0.85)';
        ctx.shadowColor = 'rgba(126, 174, 199, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Depth sort nodes
    projected.sort((a, b) => a.z - b.z);

    // Draw crystalline liquid glass nodes
    projected.forEach((node) => {
      const radius = 14 + node.z * 2.5;

      const grad = ctx.createRadialGradient(
        node.sx - radius * 0.3,
        node.sy - radius * 0.3,
        radius * 0.1,
        node.sx,
        node.sy,
        radius
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.35, 'rgba(189, 217, 231, 0.85)');
      grad.addColorStop(0.7, 'rgba(87, 140, 102, 0.45)');
      grad.addColorStop(1, 'rgba(14, 26, 20, 0.75)');

      ctx.beginPath();
      ctx.arc(node.sx, node.sy, Math.max(4, radius), 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(189, 217, 231, 0.55)';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Node Label
      ctx.font = '500 10px "IBM Plex Mono", monospace';
      ctx.fillStyle = 'rgba(242, 246, 243, 0.92)';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.sx, node.sy + radius + 11);
    });

    archAnimationId = requestAnimationFrame(render);
  }

  archAnimationId = requestAnimationFrame(render);
}

function stopArchTopology() {
  if (archAnimationId) {
    cancelAnimationFrame(archAnimationId);
    archAnimationId = null;
  }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (typeof window.closeProjectModal === 'function') window.closeProjectModal();
    if (typeof window.closeResumeModal === 'function') window.closeResumeModal();
    if (typeof window.closeCertModal === 'function') window.closeCertModal();
  }
});

