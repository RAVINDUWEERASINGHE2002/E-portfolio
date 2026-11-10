/**
 * RAVINDU LAKSHAN WEERASINGHE — PORTFOLIO CLIENT SCRIPTS
 * Lightweight Vanilla JavaScript: Animations, 3D Tilt, Filtering & Accessibility
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* --------------------------------------------------------------------------
     1. Typewriter Animation (Hero Section)
     -------------------------------------------------------------------------- */
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'DevOps Engineer',
    'Software Developer',
    'AI / ML Enthusiast',
    'Aspiring Cloud Specialist'
  ];

  if (typewriterEl) {
    if (prefersReducedMotion) {
      typewriterEl.textContent = 'Aspiring DevOps Engineer';
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typeSpeed = 80;

      function typeLoop() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
          typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
          typeSpeed = 40;
        } else {
          typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
          typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
          typeSpeed = 1800; // Pause at end of word
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typeSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeLoop, typeSpeed);
      }

      // Initial start delay
      setTimeout(typeLoop, 800);
    }
  }

  /* --------------------------------------------------------------------------
     2. Scroll-Triggered Reveal (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
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
     3. Active Navigation State (Scrollspy)
     -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('#navlinks .nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
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
     4. Interactive 3D Card Tilt with Radial Glow
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');

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

        const rotateX = ((y - centerY) / centerY) * -5.5; // Max 5.5deg
        const rotateY = ((x - centerX) / centerX) * 5.5;  // Max 5.5deg

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
     5. Filterable Projects Showcase
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active filter button state
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category') || '';
          const categoryList = categories.split(' ');

          if (filterValue === 'all' || categoryList.includes(filterValue)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Accessible Mobile Navigation
     -------------------------------------------------------------------------- */
  const menuBtn = document.querySelector('.menu');
  const navList = document.querySelector('#navlinks');

  if (menuBtn && navList) {
    function toggleMenu(forceClose = false) {
      const isOpen = forceClose ? false : !navList.classList.contains('open');
      navList.classList.toggle('open', isOpen);
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close menu when clicking any nav link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        toggleMenu(true);
        menuBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. Click to Copy Email
     -------------------------------------------------------------------------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const emailText = 'Ravinduweerasinghe5739422@gmail.com';

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailText);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = emailText;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalText = copyFeedback.textContent;
        copyFeedback.textContent = 'Copied to Clipboard! ✓';
        copyBtn.style.background = '#1b3b68';

        setTimeout(() => {
          copyFeedback.textContent = originalText;
          copyBtn.style.background = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. Dynamic Year in Footer
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
