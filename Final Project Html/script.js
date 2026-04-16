/* ════════════════════════════════════════
   DEVOID — script.js
   Alex Bowes | SETU 2025
════════════════════════════════════════ */

/* ──────────────────────────────────────
   DRIFTING STARS
────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('stars');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function spawn(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x:       Math.random() * W,
        y:       Math.random() * H,
        r:       Math.random() * 1.4 + 0.2,
        speed:   Math.random() * 0.18 + 0.03,
        alpha:   Math.random() * 0.65 + 0.3,
        phase:   Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() / 1000;
    for (const s of stars) {
      s.phase += 0.018;
      const a = s.alpha * (0.65 + 0.35 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > H) { s.y = -2; s.x = Math.random() * W; }
    }
    requestAnimationFrame(draw);
  }

  resize();
  spawn(260);
  draw();
  window.addEventListener('resize', () => { resize(); spawn(260); });
})();

/* ──────────────────────────────────────
   POINTS COUNT-UP (hero)
────────────────────────────────────── */
function countUp(el, target, duration) {
  const start = performance.now();
  (function step(ts) {
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  })(performance.now());
}

const ptsEl = document.getElementById('pts');
if (ptsEl) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      countUp(ptsEl, 5840, 1800);
      obs.disconnect();
    }
  }, { threshold: 0.4 });
  obs.observe(ptsEl);
}

/* ──────────────────────────────────────
   NAV ACTIVE LINK on scroll
────────────────────────────────────── */
const navLinks = document.querySelectorAll('#nav a');
const secs     = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  const scrollY = window.scrollY + 110;
  secs.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    navLinks.forEach(a => {
      if (a.getAttribute('href') === '#' + sec.id) {
        a.classList.toggle('active', scrollY >= top && scrollY < bottom);
      }
    });
  });
}, { passive: true });

/* ──────────────────────────────────────
   SMOOTH SCROLL
────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────
   FADE-IN ELEMENTS on scroll
────────────────────────────────────── */
const fadeTargets = document.querySelectorAll(
  '.feat-card, .tech-card, .gal-item, .stat, .dev-card, .about-shot'
);

fadeTargets.forEach(el => el.classList.add('js-fade'));

const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

fadeTargets.forEach(el => fadeObs.observe(el));

/* ──────────────────────────────────────
   STAGGER FEAT CARDS (subtle delay)
────────────────────────────────────── */
document.querySelectorAll('.feat-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 60) + 'ms';
});

document.querySelectorAll('.tech-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 50) + 'ms';
});
