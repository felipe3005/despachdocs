if (window.matchMedia('(pointer:fine)').matches) {
  // Tilt card effect
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      const rx = ((y - cy) / cy) * -4;
      const ry = ((x - cx) / cx) * 4;
      card.style.transform = 'perspective(800px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Magnetic button effect
  document.querySelectorAll('.btn-primary,.btn-outline,.nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + x * .15 + 'px,' + y * .15 + 'px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
