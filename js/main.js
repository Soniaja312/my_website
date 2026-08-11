/* ============================================
   SOPHIA JAKEL — main.js
   1. Intro animation
   2. Menu overlay open/close
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. INTRO ─────────────────────────── */
  const intro   = document.getElementById('intro');
  const site    = document.getElementById('site');
  const letters = document.querySelectorAll('.intro-letter');

  const LETTER_DELAY   = 55;   // ms between each letter appearing
  const HOLD_DURATION  = 800;  // ms the full name stays visible

  letters.forEach((letter, i) => {
    setTimeout(() => letter.classList.add('show'), i * LETTER_DELAY);
  });

  const totalTime = letters.length * LETTER_DELAY + HOLD_DURATION;

  setTimeout(() => {
    if (intro) intro.classList.add('fade-out');
    setTimeout(() => {
      if (intro) intro.style.display = 'none';
      if (site)  { site.classList.remove('hidden'); site.classList.add('visible'); }
    }, 800);
  }, totalTime);


  /* ── 2. MENU OVERLAY ──────────────────── */
  const menuBtn     = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');

  if (!menuBtn || !menuOverlay) return;

  function openMenu() {
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.textContent = 'Close';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.textContent = 'Menu';
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close when clicking anywhere on the overlay (not on links)
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay || e.target.classList.contains('menu-inner')) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── 3a. SCROLL REVEAL (generic, any page) ─── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── 3. SCROLL ANIMATIONS (about page) ─── */
  const animItems = document.querySelectorAll('.about-list li, .project-item');
  if (animItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, _) => {
        if (entry.isIntersecting) {
          // stagger siblings so they appear one after another
          const siblings = [...entry.target.parentElement.children];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animItems.forEach(el => observer.observe(el));
  }

  /* ── 3b. FEATURE CAROUSEL (projects page) ──── */
  document.querySelectorAll('.feature-carousel').forEach(carousel => {
    const slides   = carousel.querySelectorAll('.carousel-slide');
    const captions = carousel.querySelectorAll('.carousel-caption');
    const dots     = carousel.querySelectorAll('.carousel-dot');
    if (slides.length < 2) return;

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = Number(dot.dataset.index);
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === target));
        captions.forEach((cap, i) => cap.classList.toggle('is-active', i === target));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === target));
      });
    });
  });

  /* ── 4. LIGHTBOX (photography page) ──── */
  if (document.querySelector('.photo-grid')) {

    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = '<button id="lightbox-close">Close ✕</button><img id="lightbox-img" src="" alt="" />';
    document.body.appendChild(lb);

    const lbImg = document.getElementById('lightbox-img');

    document.querySelectorAll('.photo-item img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    lb.addEventListener('click', e => { if (e.target !== lbImg) closeLightbox(); });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

});
