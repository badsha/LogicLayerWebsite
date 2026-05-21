  // Nav scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  try {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => obs.observe(r));
  } catch (err) {
      // ignore
    reveals.forEach(r => r.classList.add('visible'));
  }

  // Form submit
  function handleSubmit(btn) {
    const form = btn.closest('.contact-form-wrap');
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    let valid = true;
    inputs.forEach(i => {
      if (!i.value.trim()) { i.style.borderColor = 'rgba(232,67,147,0.5)'; valid = false; }
      else i.style.borderColor = '';
    });
    if (!valid) return;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg> Message Sent!`;
    btn.style.background = '#2ecc71';
    setTimeout(() => {
      btn.innerHTML = `Send Message <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      btn.style.background = '';
      inputs.forEach(i => i.value = '');
    }, 3000);
  }

  function countUp(el, target, suffix = '') {
    if (!el) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = String(target); clearInterval(timer); }
      else el.textContent = String(Math.floor(start));
    }, 24);
  }
  try {
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countUp(document.getElementById('stat1'), 150);
          countUp(document.getElementById('stat2'), 80);
          countUp(document.getElementById('stat3'), 94);
          countUp(document.getElementById('stat4'), 12);
          statObs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) statObs.observe(statsBar);
  } catch (err) {
    // ignore
  }

// Photo upload handlers for team roles
document.querySelectorAll('.upload-photo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrapper = btn.closest('.role-avatar');
    if (!wrapper) return;
    const input = wrapper.querySelector('.role-photo-input');
    if (!input) return;
    input.click();
  });
});

document.querySelectorAll('.role-photo-input').forEach(input => {
  input.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const wrapper = input.closest('.role-avatar');
    const img = wrapper && wrapper.querySelector('.role-photo');
    if (img) img.src = URL.createObjectURL(file);
    const btn = wrapper && wrapper.querySelector('.upload-photo-btn');
    if (btn) btn.textContent = 'Change';
  });
});

// Service Modal Logic
const serviceDetails = {
  erp: {
    title: "ERP Software <em>Solutions</em>",
    about: "A custom ERP project built to centralize core business operations into one system.",
    desc: "Centralize finance, inventory, sales, HR, and operations with ERP systems tailored to your workflow.",
    details: [
      "Custom Financial Modules & Reporting",
      "Inventory & Supply Chain Management",
      "Human Resource Management Systems",
      "Sales & CRM Integration",
      "Seamless Departmental Communication"
    ]
  },
  ai: {
    title: "AI-Integrated <em>Software</em>",
    about: "A product upgrade project focused on adding automation and intelligence to existing software.",
    desc: "Add smart recommendations, predictive insights, chatbots, and automation into your software products.",
    details: [
      "Predictive Analytics & Forecasting",
      "Custom LLM & Chatbot Integration",
      "Automated Data Entry & Processing",
      "Smart Recommendation Engines",
      "Computer Vision Solutions"
    ]
  },
  odoo: {
    title: "Odoo <em>Implementation</em>",
    about: "An Odoo rollout project designed to match the client’s workflows and internal processes.",
    desc: "Set up, customize, and extend Odoo for your business workflows, modules, and operational needs.",
    details: [
      "Full-cycle Odoo Implementation",
      "Custom Module Development",
      "Third-party API Integrations",
      "Data Migration & Maintenance",
      "Odoo Training & Support"
    ]
  },
  custom: {
    title: "Custom Software <em>Development</em>",
    about: "A full custom development project shaped around the client’s business goals and product roadmap.",
    desc: "End-to-end development of web, desktop, and cloud software built around your business goals.",
    details: [
      "Full-stack Web Applications",
      "Scalable Cloud Architecture",
      "Microservices & API Development",
      "Legacy System Modernization",
      "Cross-platform Desktop Apps"
    ]
  },
  design: {
    title: "System Analysis & <em>UX Design</em>",
    about: "A discovery and design project that turns requirements into clear user flows and interfaces.",
    desc: "We turn business requirements into clean workflows, modern interfaces, and intuitive user experiences.",
    details: [
      "User Research & Personas",
      "Information Architecture",
      "High-fidelity Wireframing",
      "Interactive Prototyping",
      "Design System Development"
    ]
  },
  mvp: {
    title: "MVP & <em>App Development</em>",
    about: "A fast-launch project for validating an idea with a clean, scalable first release.",
    desc: "Launch MVPs and scalable applications quickly so you can validate ideas and move faster.",
    details: [
      "Rapid Prototype Development",
      "Agile MVP Roadmap",
      "Product-Market Fit Analysis",
      "Scalable Mobile & Web Apps",
      "Post-launch Iteration & Support"
    ]
  }
};

const modal = document.getElementById('service-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.modal-overlay');

function openModal(serviceId) {
  if (!modal || !modalBody) return;
  const data = serviceDetails[serviceId];
  if (!data) return;
  // create a safe alt text by stripping any HTML from the title
  const plainTitle = (data.title || '').replace(/<[^>]*>/g, '').trim();

  // inline SVG placeholder (data URI) to avoid external network dependency
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='420' viewBox='0 0 800 420'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%230b0b0b'/><stop offset='1' stop-color='%231b1b1b'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)' rx='8'/><rect x='40' y='40' width='720' height='340' rx='8' fill='%23000000' opacity='0.18'/><circle cx='140' cy='180' r='48' fill='%23c8f53a' opacity='0.12'/><rect x='220' y='120' width='420' height='180' rx='8' fill='rgba(255,255,255,0.03)'/><text x='50%' y='50%' fill='%23c8f53a' font-family='DM Mono,monospace' font-size='28' dominant-baseline='middle' text-anchor='middle'>Project Preview</text></svg>";
  const svgBase64 = btoa(svg);
  const defaultImg = `data:image/svg+xml;base64,${svgBase64}`;
  const imgSrc = data.image || defaultImg;

  modalBody.innerHTML = `
    <h3 class="modal-title" id="modal-title">${data.title}</h3>
    <div class="modal-image">
      <img src="${imgSrc}" alt="${plainTitle} screenshot">
    </div>
    <div class="modal-text">
      <p><strong>About the project</strong></p>
      <p>${data.about}</p>
      <p>${data.desc}</p>
      <ul>
        ${data.details.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p>Ready to build this solution? Our team of experts is here to help you every step of the way, from initial concept to final deployment.</p>
    </div>
    <div class="modal-cta">
      <a href="#contact" class="btn-primary" onclick="closeModal()">Start a Project</a>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.service-card-v2 .sv2-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const card = link.closest('.service-card-v2');
    const serviceId = card.getAttribute('data-service-id');
    openModal(serviceId);
  });
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});


