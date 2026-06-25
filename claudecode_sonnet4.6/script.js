/* ============================================
   NIMBUS SOLUTIONS — Script
   ============================================ */

/* --- Header: scroll effect --- */
const header = document.getElementById('header');

function updateHeader() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();


/* --- Hamburger menu --- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll('main section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav__link');

function setActiveLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();


/* --- Scroll reveal animation --- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings within the same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.is-visible)'));
        const delay = siblings.indexOf(entry.target) * 80;

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


/* --- Contact form: client-side validation & mock submit --- */
const form = document.getElementById('contact-form');
const successBox = document.getElementById('form-success');

function showError(input) {
  input.classList.add('error');
  input.addEventListener('input', () => input.classList.remove('error'), { once: true });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#name');
  const email   = form.querySelector('#email');
  const subject = form.querySelector('#subject');
  const message = form.querySelector('#message');

  let valid = true;

  if (!name.value.trim()) { showError(name); valid = false; }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email); valid = false;
  }
  if (!subject.value.trim()) { showError(subject); valid = false; }
  if (!message.value.trim()) { showError(message); valid = false; }

  if (!valid) return;

  // Simulate sending
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Enviando...</span>';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    successBox.textContent = '¡Mensaje enviado! Nos comunicaremos en menos de 24 horas hábiles.';
    successBox.classList.add('show');

    setTimeout(() => successBox.classList.remove('show'), 5000);
  }, 1400);
});
