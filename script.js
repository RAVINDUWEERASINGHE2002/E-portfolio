/**
 * RAVINDU LAKSHAN WEERASINGHE — CLIENT INTERACTIONS
 * High-Performance Vanilla JS: Mouse Glow, 3D Tilt, Role Rotator, Filter & Scrollspy
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* --------------------------------------------------------------------------
     1. Animated Role Rotator (DevOps Enthusiast / Software Developer / AI & ML Learner)
     -------------------------------------------------------------------------- */
  const roleEl = document.getElementById('roleText');
  const roles = [
    'DevOps Enthusiast',
    'Software Developer',
    'AI & ML Learner'
  ];

  if (roleEl) {
    if (prefersReducedMotion) {
      roleEl.textContent = 'DevOps Enthusiast';
    } else {
      let roleIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let delay = 90;

      function typeRole() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
          roleEl.textContent = currentRole.substring(0, charIdx - 1);
          charIdx--;
          delay = 45;
        } else {
          roleEl.textContent = currentRole.substring(0, charIdx + 1);
          charIdx++;
          delay = 95;
        }

        if (!isDeleting && charIdx === currentRole.length) {
          delay = 2000; // Pause when word completed
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          delay = 450; // Pause before typing next word
        }

        setTimeout(typeRole, delay);
      }

      setTimeout(typeRole, 700);
    }
  }

  /* --------------------------------------------------------------------------
     2. Mouse-Following Ambient Cursor Glow
     -------------------------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && hasFinePointer && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     3. Smooth Scroll-Triggered Reveals (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));
    }
  }

  /* --------------------------------------------------------------------------
     4. Interactive 3D Perspective Card Tilt
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt-element');

  if (tiltCards.length > 0 && hasFinePointer && !prefersReducedMotion) {
    tiltCards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5.0; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5.0;  // Max 5deg

        const mouseXPercent = (x / rect.width) * 100;
        const mouseYPercent = (y / rect.height) * 100;

        card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
        card.style.setProperty('--mouse-y', `${mouseYPercent}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Category Filter for Projects
     -------------------------------------------------------------------------- */
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-showcase-card');

  if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');

        const filter = chip.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          const categoryList = categories.split(' ');

          if (filter === 'all' || categoryList.includes(filter)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Navigation Scrollspy (Active Section Highlighting)
     -------------------------------------------------------------------------- */
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navItems.length > 0 && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '-70px 0px -40% 0px'
    });

    sections.forEach(sec => spyObserver.observe(sec));
  }

  /* --------------------------------------------------------------------------
     7. Accessible Mobile Navigation
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburgerBtn && navMenu) {
    function toggleNav(forceClose = false) {
      const isOpen = forceClose ? false : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      hamburgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }

    hamburgerBtn.addEventListener('click', () => toggleNav());

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleNav(true));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleNav(true);
        hamburgerBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. One-Click Copy Email to Clipboard
     -------------------------------------------------------------------------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const emailVal = 'Ravinduweerasinghe5739422@gmail.com';

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailVal);
        } else {
          const ta = document.createElement('textarea');
          ta.value = emailVal;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        const originalText = copyFeedback.textContent;
        copyFeedback.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.borderColor = '#00f0ff';
        copyBtn.style.color = '#fff';

        setTimeout(() => {
          copyFeedback.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. Dynamic Footer Year
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
