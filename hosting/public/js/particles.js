const pc = document.getElementById('heroParticles');

for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 8 + 's';
  p.style.animationDuration = (6 + Math.random() * 6) + 's';
  const s = (2 + Math.random() * 3) + 'px';
  p.style.width = s;
  p.style.height = s;
  pc.appendChild(p);
}
