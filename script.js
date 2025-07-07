/*  Portfolio Template Interactions  */

// Hero parallax effect (desktop only)
const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer:fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    // scale down motion
    hero.style.setProperty('--mx', `${dx * -0.02}px`);
    hero.style.setProperty('--my', `${dy * -0.02}px`);
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.setProperty('--mx', '0px');
    hero.style.setProperty('--my', '0px');
  });
}

// Page transition fade
window.addEventListener('pageshow', () => {
  document.body.classList.add('page-show');
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close nav when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
});

// Intersection Observer for section reveal
const observerOptions = {
  threshold: 0.15,
};

const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, observerOptions);

document.querySelectorAll('.section').forEach((section) => {
  sectionObserver.observe(section);
});

// Smooth scroll for nav links (no jQuery needed!)
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  });
});

// Tilt effect on portfolio cards
VanillaTilt.init(document.querySelectorAll('.project-card'), {
  max: 15,
  speed: 400,
  glare: true,
  'max-glare': 0.3,
});

// Contact form dummy submit
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Grazie per il tuo messaggio!');
  form.reset();
});

// Service slider with autoplay & dots
const serviceSlider = document.querySelector('.service-slider');
if (serviceSlider) {
  const slides = Array.from(serviceSlider.querySelectorAll('.service-slide'));
  // Create dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'slider-dots';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Vai alla slide ${idx + 1}`);
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      serviceSlider.scrollTo({ left: idx * serviceSlider.clientWidth, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });
  // Inserisci i dots dopo lo slider
  serviceSlider.parentElement.appendChild(dotsContainer);

  const slideInterval = 4000; // 4s
  const nextSlide = () => {
    const index = Math.round(serviceSlider.scrollLeft / serviceSlider.clientWidth);
    const nextIndex = (index + 1) % slides.length;
    serviceSlider.scrollTo({ left: nextIndex * serviceSlider.clientWidth, behavior: 'smooth' });
  };

  let autoScroll = setInterval(nextSlide, slideInterval);

  // Update active dots on scroll
  const updateDots = () => {
    const index = Math.round(serviceSlider.scrollLeft / serviceSlider.clientWidth);
    dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  };
  serviceSlider.addEventListener('scroll', () => requestAnimationFrame(updateDots));

  // Pause on hover for accessibility
  serviceSlider.addEventListener('mouseenter', () => clearInterval(autoScroll));
  serviceSlider.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      const maxScroll = serviceSlider.scrollWidth - serviceSlider.clientWidth;
      if (serviceSlider.scrollLeft + serviceSlider.clientWidth >= maxScroll - 1) {
        serviceSlider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        serviceSlider.scrollBy({ left: serviceSlider.clientWidth, behavior: 'smooth' });
      }
    }, slideInterval);
  });
}
