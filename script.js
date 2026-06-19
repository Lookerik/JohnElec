// ============================================
// ÉLECTRICIEN PARIS — SCRIPT.JS
// Vanilla JS — mobile menu, scroll reveal, carousel
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    navLinks.classList.add('is-open');
    navOverlay.classList.add('is-active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('is-open');
    navOverlay.classList.remove('is-active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll reveal (fade-in) ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------- Carousel (curtain gallery effect) ---------- */
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.querySelectorAll('.carousel__slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  let currentIndex = 0;
  const total = slides.length;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    dot.setAttribute('aria-label', `Aller à l'image ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('.carousel__dot'));

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.remove('is-center', 'is-adjacent', 'is-hidden-slide');

      const diff = (i - currentIndex + total) % total;

      if (diff === 0) {
        slide.classList.add('is-center');
      } else if (diff === 1 || diff === total - 1) {
        slide.classList.add('is-adjacent');
      } else {
        slide.classList.add('is-hidden-slide');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + total) % total;
    render();
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Click on a side slide to bring it to center
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (!slide.classList.contains('is-center')) {
        goToSlide(i);
      }
    });
    slide.style.cursor = 'pointer';
  });

  // Swipe support (touch)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    const threshold = 40;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  }

  // Drag support (desktop mouse)
  let isDragging = false;
  let dragStartX = 0;
  let dragEndX = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
  });

  track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    dragEndX = e.clientX;
    isDragging = false;
    const diff = dragStartX - dragEndX;
    const threshold = 40;
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Keyboard arrow support when carousel is focused/visible
  document.addEventListener('keydown', (e) => {
    const rect = track.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  render();

  /* ---------- Nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  function updateNavBg() {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(13,13,13,0.92)';
    } else {
      nav.style.background = 'rgba(13,13,13,0.7)';
    }
  }
  window.addEventListener('scroll', updateNavBg, { passive: true });
  updateNavBg();

});
