/* =============================================
   SOLAR ENERGY IN INDIA - Main JavaScript File
   Handles:
   - Navbar scroll effect & mobile menu
   - Scroll reveal animations
   - Counter animations
   - Chart.js charts
   - Solar savings calculator
   - Range slider sync
   - Contact form validation
   - Back-to-top button
============================================= */

/* ===== 1. NAVBAR: scroll effect & active link ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Add scrolled class for background blur
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Back to top button visibility
  const backBtn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
});

/* ===== 2. HAMBURGER MENU (mobile) ===== */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  // Animate hamburger lines
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
  });
});

/* ===== 3. SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for siblings
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80); // 80ms stagger
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ===== 4. COUNTER ANIMATION (hero stats) ===== */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 2000; // ms
  const step = target / (duration / 16); // 60fps

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current < target) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };
  update();
}

// Trigger counters when hero is visible
const heroStats = document.querySelectorAll('.stat-num');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      heroStats.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
      });
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero-stats'));

/* ===== 5. RANGE SLIDER SYNC ===== */
const sunHoursRange = document.getElementById('sunHours');
const sunHoursVal = document.getElementById('sunHoursVal');

if (sunHoursRange) {
  sunHoursRange.addEventListener('input', () => {
    sunHoursVal.textContent = parseFloat(sunHoursRange.value).toFixed(1) + ' hrs';
    // Update gradient fill of range
    const min = parseFloat(sunHoursRange.min);
    const max = parseFloat(sunHoursRange.max);
    const val = parseFloat(sunHoursRange.value);
    const pct = ((val - min) / (max - min)) * 100;
    sunHoursRange.style.background = `linear-gradient(to right, #F59E0B ${pct}%, #E2E8F0 ${pct}%)`;
  });
}

/* ===== 6. SOLAR SAVINGS CALCULATOR ===== */
function calculateSavings() {
  // Get input values
  const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
  const roofArea = parseFloat(document.getElementById('roofArea').value);
  const sunHours = parseFloat(document.getElementById('sunHours').value);
  const tariff = parseFloat(document.getElementById('tariff').value);

  // Validate inputs
  if (!monthlyBill || !roofArea || !tariff) {
    alert('⚠️ Please fill in all fields before calculating!');
    return;
  }

  if (monthlyBill <= 0 || roofArea <= 0 || tariff <= 0) {
    alert('⚠️ Please enter valid positive numbers.');
    return;
  }

  /* --- Calculation Logic ---
     1 kW system needs ~100 sq ft of roof space
     1 kW system generates: sunHours × 365 kWh/year
     Monthly consumption = monthlyBill / tariff (in kWh)
     System size needed = monthlyConsumption / (sunHours × 30)
     Cost: ~₹65,000 per kW (market average 2024)
     CO2 saved: 0.82 kg per kWh generated
  */

  // Monthly electricity consumption in kWh
  const monthlyKWh = monthlyBill / tariff;

  // Recommended system size (capped by roof area)
  const maxSystemByRoof = roofArea / 100; // 1 kW per 100 sq ft
  const idealSystem = monthlyKWh / (sunHours * 30);
  const systemSize = Math.min(idealSystem, maxSystemByRoof);
  const systemSizeRounded = Math.round(systemSize * 10) / 10;

  // Annual energy generation (kWh)
  const annualGenKWh = systemSize * sunHours * 365;

  // Monthly and annual savings
  const annualBill = monthlyBill * 12;
  const annualSavingsKWh = Math.min(annualGenKWh, monthlyKWh * 12);
  const annualSavingsRs = annualSavingsKWh * tariff;
  const monthlySavingsRs = annualSavingsRs / 12;

  // Solar coverage percentage
  const solarPercent = Math.min(Math.round((annualSavingsKWh / (monthlyKWh * 12)) * 100), 100);

  // Estimated system cost (₹65,000/kW after 30% subsidy for residential)
  const systemCost = systemSizeRounded * 65000;

  // Payback period in years
  const paybackYears = annualSavingsRs > 0 ? (systemCost / annualSavingsRs).toFixed(1) : 'N/A';

  // CO2 saved per year (0.82 kg CO2 per kWh in India grid)
  const co2Saved = (annualSavingsKWh * 0.82 / 1000).toFixed(2);

  // --- Display results ---
  document.getElementById('systemSize').textContent = systemSizeRounded + ' kW';
  document.getElementById('monthlySavings').textContent = '₹' + Math.round(monthlySavingsRs).toLocaleString('en-IN') + '/month';
  document.getElementById('annualSavings').textContent = '₹' + Math.round(annualSavingsRs).toLocaleString('en-IN') + '/year';
  document.getElementById('systemCost').textContent = '₹' + systemCost.toLocaleString('en-IN');
  document.getElementById('payback').textContent = paybackYears + ' years';
  document.getElementById('co2Saved').textContent = co2Saved + ' tonnes/year';
  document.getElementById('solarPercent').textContent = solarPercent;

  // Animate the savings bar
  const fillEl = document.getElementById('savingsFill');
  fillEl.style.width = '0%';
  setTimeout(() => { fillEl.style.width = solarPercent + '%'; }, 100);

  // Show results panel, hide placeholder
  document.getElementById('resultsPlaceholder').style.display = 'none';
  document.getElementById('resultsData').style.display = 'block';
}

/* ===== 7. CHART.JS — Solar Growth Chart ===== */
function initCharts() {
  // Chart 1: India's Solar Growth Over Years
  const ctx1 = document.getElementById('solarGrowthChart');
  if (!ctx1) return;

  const growthChart = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Solar Capacity (GW)',
          data: [3.7, 9, 12.2, 22, 28.2, 34.6, 46.8, 56.1, 66.8, 73],
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(245,158,11,0.9)');
            gradient.addColorStop(1, 'rgba(245,158,11,0.2)');
            return gradient;
          },
          borderColor: '#F59E0B',
          borderWidth: 2,
          borderRadius: 6,
        },
        {
          label: 'Annual Target (GW)',
          data: [5, 12, 20, 30, 40, 50, 60, 70, 80, 100],
          type: 'line',
          borderColor: '#10B981',
          backgroundColor: 'rgba(16,185,129,0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#10B981',
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: { color: 'rgba(255,255,255,0.7)', font: { family: 'DM Sans' } }
        },
        tooltip: {
          callbacks: {
            label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y + ' GW'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255,255,255,0.6)' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: 'rgba(255,255,255,0.6)', callback: v => v + ' GW' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });

  // Chart 2: State-wise Solar Capacity
  const ctx2 = document.getElementById('stateChart');
  if (!ctx2) return;

  const stateChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['Rajasthan', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Others'],
      datasets: [{
        data: [18.7, 10.5, 9.5, 7.2, 5.9, 21.2],
        backgroundColor: [
          '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#6B7280'
        ],
        borderWidth: 3,
        borderColor: '#1E293B',
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'rgba(255,255,255,0.7)',
            font: { family: 'DM Sans' },
            padding: 16,
            usePointStyle: true,
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + ' GW'
          }
        }
      }
    }
  });
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initCharts);

/* ===== 8. CONTACT FORM VALIDATION & SUBMISSION ===== */
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const msgEl = document.getElementById('formMsg');

  // Clear previous message
  msgEl.className = 'form-msg';
  msgEl.style.display = 'none';

  // Validation
  if (!name || !email || !subject || !message) {
    msgEl.textContent = '⚠️ Please fill in all fields before submitting.';
    msgEl.className = 'form-msg error';
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msgEl.textContent = '⚠️ Please enter a valid email address.';
    msgEl.className = 'form-msg error';
    return;
  }

  // Simulate form submission (no backend)
  msgEl.textContent = '✅ Thank you, ' + name + '! Your message has been sent successfully. We\'ll get back to you shortly.';
  msgEl.className = 'form-msg success';

  // Clear form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('message').value = '';

  // Scroll to message
  msgEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ===== 9. BACK TO TOP ===== */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== 10. SMOOTH NAV LINK SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== 11. HAMBURGER ANIMATION ===== */
// CSS-free hamburger toggle lines → X shape
const style = document.createElement('style');
style.textContent = `
  .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(style);
