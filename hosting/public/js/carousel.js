const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.carousel-dot');
const slideCounter = document.getElementById('slideCounter');
let currentSlide = 0;
let carouselInterval;

function showSlide(i) {
  if (i === currentSlide) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  slideCounter.textContent = String(i + 1).padStart(2, '0');
  currentSlide = i;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function resetInterval() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(nextSlide, 5000);
}

dots.forEach(d => {
  d.addEventListener('click', () => {
    const idx = parseInt(d.dataset.index);
    if (idx !== currentSlide) {
      showSlide(idx);
      resetInterval();
    }
  });
});

carouselInterval = setInterval(nextSlide, 5000);
