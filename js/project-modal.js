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
    demo: "#",
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
    demo: "#",
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
    demo: "#",
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
    tech: ["Python", "Spring Boot", "Cisco Packet Tracer", "LLM Reasoning Chains", "OSI Layer Classifier", "REST APIs"],
    role: "AI Engineering Intern",
    github: "https://github.com/vansh16soni",
    demo: "#",
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
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Power BI", "Linear Regression", "Statistical Modeling"],
    role: "Government Data Analytics Intern",
    github: "https://github.com/vansh16soni",
    demo: "#",
    problem: "Identifying early churn drivers in regional telecom circles before customer departure requires correlating granular technical network telemetry with financial billing patterns.",
    architecture: [
      "Cleaned, normalized, and explored 10,000+ simulated telecom telemetry records encompassing latency, jitter, call drop rates, and billing cycles.",
      "Established an empirical 0.7 Pearson correlation index demonstrating direct causality between Quality of Service (QoS) degradation and Average Revenue Per User (ARPU) decline.",
      "Trained regularized Scikit-learn regression models to forecast at-risk regional revenue segments, pinpointing approximately INR 2 Lakhs/month in vulnerable subscriber revenue.",
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

  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeProjectModal = function () {
  const backdrop = document.getElementById('project-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeProjectModal();
    window.closeResumeModal();
  }
});

