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

  // 2. Interactive Resume Modal
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
  const certLinkEl = document.getElementById('modal-cert-link');
  const certDemoEl = document.getElementById('modal-cert-demo');
  const certGithubEl = document.getElementById('modal-cert-github');

  const CERT_DATA = {
    cisco: {
      title: "Cisco AI Engineering Internship Certificate",
      issuer: "Cisco & AICTE",
      date: "August 2026",
      desc: "Verified certificate recognizing completion of the AI Engineering Internship at Cisco, culminating in NetSage AI for automated OSI root-cause analysis and network diagnostics.",
      link: "https://drive.google.com/file/d/1Xeq-S6DqLiRhNI5TTC_y3o3d8kw4OUrL/view",
      github: "https://github.com/vansh16soni/Cisco_NetSage_AI",
      demo: "https://netsage-ai-c7rd.onrender.com/"
    },
    bsnl: {
      title: "BSNL Telecom Data Analytics Internship Certificate",
      issuer: "Bharat Sanchar Nigam Limited (BSNL)",
      date: "February 2026",
      desc: "Official government internship certificate issued by BSNL Telecom Factory for data engineering, QoS degradation modeling, and revenue vulnerability analysis across 10,000+ records.",
      link: "https://drive.google.com/file/d/1P-cfeRcdcxjL4IIfexnz2sh1z4QVsK3I/view",
      github: "https://github.com/vansh16soni/Telecom_project"
    },
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
      desc: "Comprehensive certification covering machine learning pipelines on AWS, feature engineering, model training, evaluation metrics, and cloud inference architectures.",
      link: "https://drive.google.com/file/d/1hKHhN7QEajXOcE74O_6JSZe_GQzQqJTs/view"
    },
    aws_nlp: {
      title: "AWS Academy ML for Natural Language Processing",
      issuer: "Amazon Web Services (AWS)",
      date: "July 2026",
      desc: "Specialized certification covering transformer architectures, tokenization strategies, and deep language processing workflows on cloud infrastructure.",
      link: "https://drive.google.com/file/d/1KzajLM5apFSwLYzYlHBK96jjtFDYxS9K/view"
    },
    aws_cloud: {
      title: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      desc: "Foundational mastery of cloud computing concepts, AWS core services, security compliance, network VPC peering, IAM role management, and pricing architecture.",
      link: "https://drive.google.com/file/d/1WAcB__PuNzIYSvrQsGIjSS5aYOWmsy_g/view"
    },
    sololearn_java: {
      title: "Introduction to Java Certification",
      issuer: "SoloLearn",
      date: "April 2024",
      desc: "Verified certification establishing core mastery in Java object-oriented programming, inheritance, polymorphism, abstract classes, collections framework, and multi-threading.",
      link: "https://www.sololearn.com/en/certificates/CC-EXLXARMG"
    }
  };

  window.openCertModal = function (certKey) {
    const cert = CERT_DATA[certKey];
    if (!cert) return;

    if (certTitleEl) certTitleEl.textContent = cert.title;
    if (certIssuerEl) certIssuerEl.textContent = cert.issuer;
    if (certDateEl) certDateEl.textContent = `ISSUED: ${cert.date}`;
    if (certDescEl) certDescEl.textContent = cert.desc;

    if (certLinkEl) {
      if (cert.link) {
        certLinkEl.href = cert.link;
        certLinkEl.style.display = 'inline-flex';
      } else {
        certLinkEl.style.display = 'none';
      }
    }
    if (certDemoEl) {
      if (cert.demo) {
        certDemoEl.href = cert.demo;
        certDemoEl.style.display = 'inline-flex';
      } else {
        certDemoEl.style.display = 'none';
      }
    }
    if (certGithubEl) {
      if (cert.github) {
        certGithubEl.href = cert.github;
        certGithubEl.style.display = 'inline-flex';
      } else {
        certGithubEl.style.display = 'none';
      }
    }

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

  // 7. Project Screenshot Multi-View Gallery Switcher
  window.switchProjectImage = function (projectId, imageSrc, btnEl) {
    const imgEl = document.getElementById(`img-${projectId}`);
    if (imgEl) {
      imgEl.style.opacity = '0.35';
      imgEl.src = imageSrc;
      imgEl.onload = () => {
        imgEl.style.opacity = '1';
      };
      setTimeout(() => {
        imgEl.style.opacity = '1';
      }, 250);
    }
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.gallery-thumb-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      btnEl.classList.add('active');
    }
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

