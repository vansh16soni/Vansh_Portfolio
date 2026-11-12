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

