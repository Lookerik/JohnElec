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

  /* ---------- Projects: render cards ---------- */
  const grid = document.getElementById('projectsGrid');
  const visibleProjects = PROJECTS.slice(0, 5);

  visibleProjects.forEach((project, i) => {
    const card = document.createElement('article');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <div class="project-card__image">
        <img src="${project.cover}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-card__body">
        ${project.date ? `<span class="project-card__date">${project.date}</span>` : ''}
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__text">${project.description}</p>
        <span class="project-card__link">Voir le projet
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    `;
    card.addEventListener('click', () => openProjectModal(project));
    grid.appendChild(card);
    observer.observe(card);
  });

  /* ---------- Project modal ---------- */
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');

  let currentGalleryImages = [];

  const categoryLabels = { avant: 'Avant', pendant: 'Pendant', apres: 'Après' };

  function openProjectModal(project) {
    modalTitle.textContent = project.title;
    modalDate.textContent = project.date || '';
    modalDesc.textContent = project.description;
    modalGallery.innerHTML = '';

    currentGalleryImages = project.images.map(img => img.src);

    project.images.forEach((img, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${img.src}" alt="${project.title}" loading="lazy">
        ${img.category ? `<span class="gallery-item__tag">${categoryLabels[img.category] || img.category}</span>` : ''}
      `;
      item.addEventListener('click', () => openLightbox(i));
      modalGallery.appendChild(item);
    });

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeProjectModal);
  modalBackdrop.addEventListener('click', closeProjectModal);

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function updateLightbox() {
    lightboxImg.src = currentGalleryImages[lightboxIndex];
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${currentGalleryImages.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function lightboxNextImg() {
    lightboxIndex = (lightboxIndex + 1) % currentGalleryImages.length;
    updateLightbox();
  }

  function lightboxPrevImg() {
    lightboxIndex = (lightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateLightbox();
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', lightboxNextImg);
  lightboxPrev.addEventListener('click', lightboxPrevImg);

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lightboxNextImg();
      if (e.key === 'ArrowLeft') lightboxPrevImg();
    } else if (projectModal.classList.contains('is-open')) {
      if (e.key === 'Escape') closeProjectModal();
    }
  });

  // Swipe support for lightbox on mobile
  let lbTouchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    lbTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = lbTouchStartX - e.changedTouches[0].screenX;
    if (diff > 40) lightboxNextImg();
    else if (diff < -40) lightboxPrevImg();
  }, { passive: true });

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
