const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

if (window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * .08;
    glowY += (mouseY - glowY) * .08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}
