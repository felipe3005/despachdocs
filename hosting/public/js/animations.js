// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => obs.observe(el));

// Stat counter animation
const statNums = document.querySelectorAll('.stat-number[data-target]');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      let cur = 0;
      const inc = target / 60;
      const suf = el.closest('.stat-item').querySelector('.stat-label').textContent.includes('%') ? '%' : '+';
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = Math.floor(cur) + suf;
      }, 30);
      cObs.unobserve(el);
    }
  });
}, { threshold: .5 });
statNums.forEach(el => cObs.observe(el));

// Section label clip-path animation
const lObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.clipPath = 'inset(0 0 0 0)';
      lObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });

document.querySelectorAll('.section-label').forEach(l => {
  l.style.clipPath = 'inset(0 100% 0 0)';
  l.style.transition = 'clip-path .8s cubic-bezier(.16,1,.3,1),opacity .8s';
  l.style.opacity = '0';
  lObs.observe(l);
});

// Parallax grid lines on scroll
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const g = document.querySelector('.hero-grid-lines');
  if (g) g.style.transform = 'translateY(' + sy * .15 + 'px)';
});
