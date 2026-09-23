/* ============================================================
   Moody Harold — Portfolio
   One scroll handler · pausable orbits · playful extras
   ============================================================ */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  let toastTimer;
  function showToast(msg) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------- Navbar hide/show + scroll-spy + progress + rocket (one handler) ---------- */
  const navbar = $('.navbar');
  const progressBar = $('.scroll-progress');
  const rocketTop = $('#rocketTop');
  const sections = $$('section');
  const navItems = $$('.nav-links a');
  const docEl = document.documentElement;

  let lastScroll = 0;
  let scrollTicking = false;

  function onScrollFrame() {
    const currentScroll = window.scrollY;
    const maxScroll = docEl.scrollHeight - window.innerHeight;

    navbar.classList.toggle('hidden', currentScroll > lastScroll && currentScroll > 80);

    let current = '';
    sections.forEach(section => {
      if (currentScroll >= section.offsetTop - 120) current = section.id;
    });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    if (progressBar) {
      progressBar.style.transform = `scaleX(${maxScroll > 0 ? currentScroll / maxScroll : 0})`;
    }
    if (rocketTop) {
      rocketTop.classList.toggle('show', currentScroll > 600);
    }

    lastScroll = currentScroll;
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  /* ---------- Hamburger menu ---------- */
  const hamburger = $('.hamburger');
  const navLinks = $('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ---------- Reveal on scroll (staggered) ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.about-content, .projects-grid, .contact-content, .reveal').forEach(el => {
    if (!prefersReducedMotion) revealObserver.observe(el);
    else el.classList.add('visible');
  });

  /* ---------- Galaxy background ---------- */
  (function createGalaxyBackground() {
    const skills = $('#skills');
    const container = document.createElement('div');
    container.className = 'stars';

    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = star.style.height = (Math.random() * 2.5 + 1) + 'px';
      star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }

    const systems = [
      { left: 8, top: 12, size: 18, color: '#ffdd88', ringCount: 2 },
      { left: 85, top: 8, size: 14, color: '#88bbff', ringCount: 1 },
      { left: 92, top: 55, size: 20, color: '#ffaaff', ringCount: 2 },
      { left: 5, top: 78, size: 16, color: '#aaffcc', ringCount: 1 },
      { left: 20, top: 88, size: 12, color: '#ff9966', ringCount: 2 },
      { left: 75, top: 90, size: 15, color: '#ccddff', ringCount: 1 },
      { left: 12, top: 45, size: 10, color: '#ddffaa', ringCount: 1 },
      { left: 88, top: 30, size: 22, color: '#ffbb88', ringCount: 2 },
      { left: 50, top: 5, size: 13, color: '#aabbff', ringCount: 1 },
      { left: 45, top: 93, size: 11, color: '#ffccaa', ringCount: 2 },
    ];

    systems.forEach(sys => {
      const el = document.createElement('div');
      el.className = 'distant-system';
      el.style.left = sys.left + '%';
      el.style.top = sys.top + '%';
      el.style.width = sys.size + 'px';
      el.style.height = sys.size + 'px';
      el.style.animationDelay = (Math.random() * 8) + 's';

      const sun = document.createElement('div');
      sun.className = 'ds-sun';
      sun.style.background = sys.color;
      sun.style.boxShadow = `0 0 ${sys.size * 0.6}px ${sys.color}`;
      el.appendChild(sun);

      const ring1 = document.createElement('div');
      ring1.className = 'ds-ring';
      const r1Size = sys.size * 0.9;
      ring1.style.width = r1Size + 'px';
      ring1.style.height = r1Size + 'px';
      ring1.style.borderColor = sys.color;
      el.appendChild(ring1);

      if (sys.ringCount === 2) {
        const ring2 = document.createElement('div');
        ring2.className = 'ds-ring-2';
        const r2Size = sys.size * 0.6;
        ring2.style.width = r2Size + 'px';
        ring2.style.height = r2Size + 'px';
        ring2.style.borderColor = sys.color;
        el.appendChild(ring2);
      }

      container.appendChild(el);
    });

    skills.insertBefore(container, skills.firstChild);
  })();

  /* ---------- Solar system ---------- */
  const solarSystem = $('#solarSystem');
  const skillsData = [
    { name: 'HTML', icon: 'fab fa-html5', level: 90, color: '#e34f26', radius: 80, speed: 0.008 },
    { name: 'CSS', icon: 'fab fa-css3-alt', level: 85, color: '#1572b6', radius: 110, speed: 0.006 },
    { name: 'JavaScript', icon: 'fab fa-js', level: 75, color: '#f7df1e', radius: 140, speed: 0.005 },
    { name: 'Flutter', icon: 'fab fa-flutter', level: 75, color: '#02569b', radius: 170, speed: 0.004 },
    { name: 'Java', icon: 'fab fa-java', level: 70, color: '#007396', radius: 200, speed: 0.0035 },
    { name: 'SQL', icon: 'fas fa-database', level: 55, color: '#4479a1', radius: 230, speed: 0.003 },
    { name: 'Python', icon: 'fab fa-python', level: 50, color: '#3776ab', radius: 260, speed: 0.0025 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 50, color: '#f05032', radius: 290, speed: 0.002 },
    { name: 'Data Structures', icon: 'fas fa-code', level: 50, color: '#6c63ff', radius: 320, speed: 0.0018 },
  ];

  const skillDescriptions = {
    'HTML': 'Building structured, semantic web pages with modern HTML5 standards.',
    'CSS': 'Crafting responsive, visually engaging layouts with CSS3 and animations.',
    'JavaScript': 'Adding interactivity and dynamic behavior to web applications.',
    'Flutter': 'Building cross-platform mobile apps with Dart and Flutter framework.',
    'Java': 'Developing robust applications with object-oriented Java programming.',
    'SQL': 'Querying and managing relational databases with SQL.',
    'Python': 'Scripting, automation, and backend development with Python.',
    'Git': 'Version control and collaborative development using Git.',
    'Data Structures': 'Understanding and implementing efficient data structures and algorithms.',
  };

  // Design-space metrics: everything computed at 680px, scaled to actual size.
  const DESIGN_SIZE = 680;

  // Scale factor from container width — CSS handles --orbit-scale for the rings,
  // JS uses the same number for planet positions.
  function getScaleFactor() {
    return solarSystem.clientWidth / DESIGN_SIZE;
  }

  const planets = [];

  skillsData.forEach((skill, i) => {
    const el = document.createElement('div');
    el.className = 'planet';
    el.dataset.skill = skill.name;
    el.dataset.icon = skill.icon;
    el.dataset.level = skill.level;
    el.dataset.color = skill.color;
    el.title = skill.name;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${skill.name} — ${skill.level}% — open details`);
    const size = Math.max(28, 36 - i);
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.background = skill.color;
    el.style.marginLeft = -(size / 2) + 'px';
    el.style.marginTop = -(size / 2) + 'px';
    el.innerHTML = `<i class="${skill.icon}" style="font-size:${size * 0.45}px"></i>`;
    solarSystem.appendChild(el);

    planets.push({
      el,
      angle: (i / skillsData.length) * Math.PI * 2,
      ...skill,
      size,
    });
  });

  // Set --orbit-scale so CSS rings always match JS-computed planet orbits.
  function syncOrbitScale() {
    solarSystem.style.setProperty('--orbit-scale', getScaleFactor());
  }
  syncOrbitScale();
  window.addEventListener('resize', syncOrbitScale, { passive: true });

  /* Pause orbits when the section is off-screen or the tab is hidden */
  let orbitsRunning = false;
  let animId = null;

  function animatePlanets() {
    if (!orbitsRunning) { animId = null; return; }
    const scale = getScaleFactor();
    const c = { x: solarSystem.clientWidth / 2, y: solarSystem.clientWidth / 2 };
    planets.forEach(p => {
      p.angle += p.speed;
      const x = c.x + p.radius * Math.cos(p.angle) * scale;
      const y = c.y + p.radius * Math.sin(p.angle) * scale;
      p.el.style.left = x + 'px';
      p.el.style.top = y + 'px';
      p.el.style.zIndex = y < c.y ? 5 : 25;
    });
    animId = requestAnimationFrame(animatePlanets);
  }

  function startOrbits() {
    if (orbitsRunning || prefersReducedMotion) return;
    orbitsRunning = true;
    animId = requestAnimationFrame(animatePlanets);
  }

  function stopOrbits() {
    orbitsRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  const orbitObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => startOrbits());
    if (!entries.some(e => e.isIntersecting)) stopOrbits();
  }, { threshold: 0.05 });

  orbitObserver.observe(solarSystem);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopOrbits();
    else {
      // restart only if the section is in view
      const rect = solarSystem.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) startOrbits();
    }
  });

  // Position planets once even if animations are disabled (reduced motion)
  function placePlanetsStatic() {
    const scale = getScaleFactor();
    const c = { x: solarSystem.clientWidth / 2, y: solarSystem.clientWidth / 2 };
    planets.forEach(p => {
      const x = c.x + p.radius * Math.cos(p.angle) * scale;
      const y = c.y + p.radius * Math.sin(p.angle) * scale;
      p.el.style.left = x + 'px';
      p.el.style.top = y + 'px';
    });
  }
  placePlanetsStatic();

  /* ---------- Skill popup ---------- */
  const popup = $('#skillPopup');
  const popupIcon = $('#popupIcon');
  const popupTitle = $('#popupTitle');
  const popupBarFill = $('#popupBarFill');
  const popupLevel = $('#popupLevel');
  const popupDesc = $('#popupDesc');
  let lastFocused = null;

  function openPopup(planet) {
    const skill = planet.dataset.skill;
    const icon = planet.dataset.icon;
    const level = parseInt(planet.dataset.level, 10);
    const color = planet.dataset.color;

    popupIcon.className = icon;
    popupIcon.style.color = '#fff';
    $('.popup-icon-wrapper').style.setProperty('--popup-color', color);
    popupTitle.textContent = skill;
    popupLevel.textContent = level + '%';
    popupDesc.textContent = skillDescriptions[skill] || '';
    popupBarFill.style.width = '0%';
    popupBarFill.style.background = color;

    popup.classList.add('active');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      popupBarFill.style.width = level + '%';
    });
  }

  function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }

  planets.forEach(planet => {
    const el = planet.el;
    el.addEventListener('click', () => {
      // wobble for fun
      el.classList.remove('wobble');
      void el.offsetWidth; // restart animation
      el.classList.add('wobble');
      openPopup(el);
    });

    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopup(el);
      }
    });
  });

  $('.popup-close').addEventListener('click', closePopup);
  popup.addEventListener('click', e => {
    if (e.target === popup) closePopup();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('active')) closePopup();
  });

  /* ---------- Counter animation ---------- */
  function animateCounter(element) {
    if (element.dataset.done) return;
    element.dataset.done = '1';
    const target = parseInt(element.dataset.target, 10);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, 16);
  }

  /* ---------- Project card 3D tilt ---------- */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    $$('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Hero parallax ---------- */
  const heroBg = $('.hero-bg');
  if (heroBg && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.4}px) scale(1.05)`;
      }
    }, { passive: true });
  }

  /* ---------- Rocket back-to-top ---------- */
  if (rocketTop) {
    rocketTop.addEventListener('click', () => {
      rocketTop.classList.add('launched');
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setTimeout(() => rocketTop.classList.remove('launched'), 800);
    });
  }

  /* ---------- Confetti ---------- */
  const CONFETTI_COLORS = ['#6c63ff', '#ff6b6b', '#a855f7', '#ffd700', '#4ade80', '#38bdf8'];

  function confettiBurst(count = 90) {
    if (prefersReducedMotion) return;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDuration = (Math.random() * 2 + 2.2) + 's';
      piece.style.animationDelay = (Math.random() * 0.4) + 's';
      if (Math.random() > 0.5) {
        piece.style.borderRadius = '50%';
        piece.style.width = '8px';
        piece.style.height = '8px';
      }
      piece.addEventListener('animationend', () => piece.remove());
      document.body.appendChild(piece);
    }
  }

  /* ---------- Contact form → WhatsApp ---------- */
  const WHATSAPP_NUMBER = '255674499424';

  $('.contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const name = $('#cfName').value.trim();
    const email = $('#cfEmail').value.trim();
    const message = $('#cfMessage').value.trim();

    const text =
      `Hello Moody! 👋\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n\n` +
      `${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');

    confettiBurst(60);
    showToast('Opening WhatsApp… 🚀');
    form.reset();
  });

  /* ---------- Coming-soon social links ---------- */
  $$('.coming-soon').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const network = link.getAttribute('aria-label').replace(' \(coming soon\)', '');
      showToast(`${network} coming soon! 🕐`);
    });
  });

  /* ---------- Ongoing project links ---------- */
  $$('.ongoing-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showToast('🚧 This project is still ongoing — links coming soon!');
    });
  });

  /* ---------- Sun easter egg: supernova after 3 pokes ---------- */
  const sun = $('.sun');
  let sunPokes = 0;
  if (sun) {
    sun.addEventListener('click', () => {
      sunPokes++;
      if (sunPokes === 3) {
        sun.classList.add('supernova');
        const wave = document.createElement('div');
        wave.className = 'shockwave';
        solarSystem.appendChild(wave);
        wave.addEventListener('animationend', () => wave.remove());

        // Blast planets outward, then pull them home
        const originals = planets.map(p => ({ p, radius: p.radius }));
        planets.forEach((p, i) => {
          p.radius += 90;
          p.speed *= 3;
        });
        setTimeout(() => {
          originals.forEach(({ p, radius }) => {
            const start = p.radius;
            const t0 = performance.now();
            (function springBack(now) {
              const t = Math.min(1, (now - t0) / 900);
              const eased = 1 - Math.pow(1 - t, 3);
              p.radius = start + (radius - start) * eased;
              p.speed = skillsData[planets.indexOf(p)].speed * (1 + (1 - eased) * 2);
              if (t < 1) requestAnimationFrame(springBack);
              else p.speed = skillsData[planets.indexOf(p)].speed;
            })(performance.now());
          });
        }, 500);

        showToast('☀️ SUPERNOVA! The planets are scattered!');
        confettiBurst(140);
        sun.classList.remove('supernova');
        sunPokes = 0;
      } else {
        showToast(sunPokes === 1 ? 'The sun rumbles... 👀' : 'Once more! ☀️');
      }
    });
  }

  /* ---------- Konami-lite: type "hire" anywhere ---------- */
  let typedBuf = '';
  document.addEventListener('keydown', e => {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typedBuf = (typedBuf + e.key.toLowerCase()).slice(-4);
      if (typedBuf === 'hire') {
        confettiBurst(160);
        showToast('💼 Great choice! Scroll to the contact form 😄');
        $('#contact').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        typedBuf = '';
      }
    }
  });
})();
