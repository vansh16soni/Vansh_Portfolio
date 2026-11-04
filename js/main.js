/**
 * Main Controller Script
 * Editorial portfolio logic, Indian Standard Time clock, notebook tabs, resume modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live IST Clock
  const clockEl = document.getElementById('ist-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    // Format in IST
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `JABALPUR, IN // ${timeStr} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }

  // 3. Technical Notebook Tab Switcher
  const notebookTabs = document.querySelectorAll('.notebook-tab-btn');
  const codeDisplayEl = document.getElementById('notebook-code-display');
  const codeTitleEl = document.getElementById('notebook-entry-title');
  const codeDescEl = document.getElementById('notebook-entry-desc');
  const codeLangEl = document.getElementById('notebook-entry-lang');
  const codeRepoLink = document.getElementById('notebook-entry-repo');

  const NOTEBOOK_DATA = [
    {
      title: "Multi-Language AST Dependency Graph & Topological Sorting",
      lang: "TypeScript / Node.js & Java",
      repo: "https://github.com/vansh16soni/RepoCity",
      desc: "Algorithm deployed in Repo City to recursively visit file import statements, generate an adjacency list representation of software modules, and execute Kahn's algorithm to compute topological execution order and detect cyclic dependencies.",
      code: `// AST Module Dependency Walker & Cycle Detection
class DependencyGraph {
    private adjacencyList: Map<string, Set<string>> = new Map();
    private inDegree: Map<string, number> = new Map();

    public addDependency(fromModule: string, toModule: string): void {
        if (!this.adjacencyList.has(fromModule)) {
            this.adjacencyList.set(fromModule, new Set());
            this.inDegree.set(fromModule, 0);
        }
        if (!this.adjacencyList.has(toModule)) {
            this.adjacencyList.set(toModule, new Set());
            this.inDegree.set(toModule, 0);
        }
        if (!this.adjacencyList.get(fromModule)!.has(toModule)) {
            this.adjacencyList.get(fromModule)!.add(toModule);
            this.inDegree.set(toModule, (this.inDegree.get(toModule) || 0) + 1);
        }
    }

    public computeTopologicalOrder(): { order: string[], cycles: string[] } {
        const queue: string[] = [];
        const order: string[] = [];
        const inDegreeCopy = new Map(this.inDegree);

        for (const [node, degree] of inDegreeCopy.entries()) {
            if (degree === 0) queue.push(node);
        }

        while (queue.length > 0) {
            const current = queue.shift()!;
            order.push(current);

            for (const neighbor of this.adjacencyList.get(current) || []) {
                const updated = inDegreeCopy.get(neighbor)! - 1;
                inDegreeCopy.set(neighbor, updated);
                if (updated === 0) queue.push(neighbor);
            }
        }

        const cycles = Array.from(inDegreeCopy.entries())
            .filter(([_, degree]) => degree > 0)
            .map(([node]) => node);

        return { order, cycles };
    }
}`
    },
    {
      title: "Spring Boot 3 + Spring AI Multi-Model Resilience Controller",
      lang: "Java 21 / Spring Boot 3 / Spring AI",
      repo: "https://github.com/vansh16soni",
      desc: "Robust architectural pattern leveraging Java Virtual Threads and Spring AI client abstractions to attempt inference on primary reasoning models with automatic seamless fallback to ultra-low-latency secondary models upon rate limits or latency thresholds.",
      code: `@RestController
@RequestMapping("/api/v1/synthesis")
public class AIReasoningController {

    private final ChatClient geminiChatClient;
    private final ChatClient groqChatClient;
    private static final Logger log = LoggerFactory.getLogger(AIReasoningController.class);

    public AIReasoningController(
        @Qualifier("geminiClient") ChatClient geminiClient,
        @Qualifier("groqClient") ChatClient groqClient
    ) {
        this.geminiChatClient = geminiClient;
        this.groqChatClient = groqClient;
    }

    @PostMapping("/notes")
    public CompletableFuture<ResponseEntity<SynthesisResponse>> generateStructuredNotes(
        @Valid @RequestBody LecturePayload payload
    ) {
        // Dispatched on Java 21 Virtual Thread
        return CompletableFuture.supplyAsync(() -> {
            try {
                log.info("Dispatching chunk {} to primary Gemini reasoning pipeline", payload.chunkId());
                String response = geminiChatClient.prompt()
                    .system(SYSTEM_PROMPT_KNOWLEDGE_EXTRACTION)
                    .user(payload.transcriptText())
                    .call()
                    .content();

                return ResponseEntity.ok(new SynthesisResponse(payload.chunkId(), response, "GEMINI_1_5"));
            } catch (Exception ex) {
                log.warn("Gemini threshold breached; falling back to high-throughput Groq engine", ex);
                String fallbackResponse = groqChatClient.prompt()
                    .system(SYSTEM_PROMPT_KNOWLEDGE_EXTRACTION)
                    .user(payload.transcriptText())
                    .call()
                    .content();

                return ResponseEntity.ok(new SynthesisResponse(payload.chunkId(), fallbackResponse, "GROQ_LLAMA3_FALLBACK"));
            }
        });
    }
}`
    },
    {
      title: "21 Hand Landmark Vector Normalization & Silhouette Mapping",
      lang: "JavaScript / MediaPipe WASM / Canvas API",
      repo: "https://github.com/vansh16soni/ShadowPlay",
      desc: "Vector mathematics implemented in ShadowPlay to calculate hand gesture aspect ratios and joint angles directly from client-side WebAssembly landmark arrays without streaming webcam pixels to external servers.",
      code: `// Client-side WebAssembly Landmark Processing
function computeHandKinematics(landmarks) {
    if (!landmarks || landmarks.length < 21) return null;

    // Landmark 0: Wrist, 4: Thumb Tip, 8: Index Tip, 12: Middle Tip
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];

    // Compute Euclidean distance in normalized 3D space
    function getDistance3D(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = (p1.z || 0) - (p2.z || 0);
        return Math.hypot(dx, dy, dz);
    }

    // Determine pinch aperture for shadow puppet beak manipulation
    const pinchDistance = getDistance3D(thumbTip, indexTip);
    const handSpan = getDistance3D(wrist, indexTip);
    const normalizedAperture = Math.min(Math.max(pinchDistance / (handSpan * 0.45), 0), 1);

    // Compute vector angle for pitch/yaw
    const angleRad = Math.atan2(indexTip.y - wrist.y, indexTip.x - wrist.x);

    return {
        aperture: normalizedAperture,
        rotation: angleRad,
        center: {
            x: (thumbTip.x + indexTip.x) / 2,
            y: (thumbTip.y + indexTip.y) / 2
        }
    };
}`
    },
    {
      title: "Linear Regression QoS Degradation vs. ARPU Loss Modeling",
      lang: "Python / Pandas / Scikit-Learn",
      repo: "https://github.com/vansh16soni",
      desc: "Analytical pipeline developed during BSNL Government Data Analytics Internship evaluating packet jitter and call drop rates against subscriber revenue contraction.",
      code: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# Load and preprocess 10,000+ simulated telecom telemetry records
def model_qos_revenue_impact(dataset_path: str):
    df = pd.read_csv(dataset_path)
    
    # Feature engineering: Composite Quality of Service (QoS) Penalty Score
    df['qos_penalty'] = (
        0.4 * (df['packet_drop_rate'] / df['packet_drop_rate'].max()) +
        0.35 * (df['latency_jitter_ms'] / df['latency_jitter_ms'].max()) +
        0.25 * (df['call_disconnect_rate'] / df['call_disconnect_rate'].max())
    )
    
    # Pearson Correlation Coefficient Calculation
    correlation = df['qos_penalty'].corr(df['arpu_loss_inr'])
    print(f"Empirical Pearson Correlation (QoS vs. ARPU Loss): {correlation:.2f}") # Output: 0.70
    
    X = df[['qos_penalty', 'regional_tier', 'network_band_mhz']]
    y = df['arpu_loss_inr']
    
    regressor = LinearRegression()
    regressor.fit(X, y)
    
    projected_at_risk = np.sum(regressor.predict(X[df['qos_penalty'] > 0.65]))
    print(f"Projected Monthly At-Risk Regional Revenue: INR {projected_at_risk:,.2f}")
    
    return regressor`
    }
  ];

  notebookTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      notebookTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const entry = NOTEBOOK_DATA[index];
      if (entry && codeDisplayEl) {
        codeDisplayEl.textContent = entry.code;
        if (codeTitleEl) codeTitleEl.textContent = entry.title;
        if (codeDescEl) codeDescEl.textContent = entry.desc;
        if (codeLangEl) codeLangEl.textContent = entry.lang;
        if (codeRepoLink) codeRepoLink.href = entry.repo;
      }
    });
  });

  // 4. Interactive Resume Modal
  window.openResumeModal = function () {
    const backdrop = document.getElementById('resume-modal-backdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeResumeModal = function () {
    const backdrop = document.getElementById('resume-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // 5. Certificate Preview Modal
  const certModalBackdrop = document.getElementById('cert-modal-backdrop');
  const certTitleEl = document.getElementById('modal-cert-title');
  const certIssuerEl = document.getElementById('modal-cert-issuer');
  const certDescEl = document.getElementById('modal-cert-desc');
  const certDateEl = document.getElementById('modal-cert-date');

  const CERT_DATA = {
    sih: {
      title: "Smart India Hackathon '25 — National Runner-up",
      issuer: "Ministry of Education & AICTE",
      date: "2025",
      desc: "Selected as National Runner-up among the top 40 national finalist teams out of thousands of competing nationwide collegiate engineering teams for developing scalable technology solutions addressing national civic and administrative challenges."
    },
    srit: {
      title: "Hack SRIT '24 & Technogenesis '24 — Top 30 Finalist",
      issuer: "Shri Ram Institute of Technology",
      date: "2024",
      desc: "Top 30 Finalist in regional hackathons focusing on rapid prototyping of full-stack web applications and hardware/software automation systems."
    },
    aws_ml: {
      title: "AWS Academy Machine Learning Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "August 2026",
      desc: "Comprehensive certification covering machine learning pipelines on AWS, feature engineering, model training, evaluation metrics, and cloud inference architectures."
    },
    aws_nlp: {
      title: "AWS Academy ML for Natural Language Processing",
      issuer: "Amazon Web Services (AWS)",
      date: "July 2026",
      desc: "Specialized certification covering transformer architectures, tokenization, text embeddings, sentiment classifiers, and deep language processing workflows on cloud infrastructure."
    },
    aws_cloud: {
      title: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      desc: "Foundational mastery of cloud computing concepts, AWS core services, security compliance, network VPC peering, IAM role management, and pricing architecture."
    },
    sololearn_java: {
      title: "Introduction to Java Certification",
      issuer: "SoloLearn",
      date: "April 2024",
      desc: "Verified certification establishing core mastery in Java object-oriented programming, inheritance, polymorphism, abstract classes, collections framework, and multi-threading."
    }
  };

  window.openCertModal = function (certKey) {
    const cert = CERT_DATA[certKey];
    if (!cert) return;

    if (certTitleEl) certTitleEl.textContent = cert.title;
    if (certIssuerEl) certIssuerEl.textContent = cert.issuer;
    if (certDateEl) certDateEl.textContent = `ISSUED: ${cert.date}`;
    if (certDescEl) certDescEl.textContent = cert.desc;

    if (certModalBackdrop) {
      certModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCertModal = function () {
    if (certModalBackdrop) {
      certModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // 6. Copy Email to Clipboard with Toast
  window.copyEmail = function () {
    const email = "vansh16tanay@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      const toast = document.getElementById('copy-toast');
      if (toast) {
        toast.textContent = "COPIED TO CLIPBOARD: " + email;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  // Close modals on clicking backdrop
  document.querySelectorAll('.editorial-modal-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) {
        bd.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});

