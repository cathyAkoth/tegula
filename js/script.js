// Mobile Menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Carousel
let index = 0;
function slide(dir){
  const track = document.getElementById("track");
  const max = track.children.length - 1;
  index += dir;
  index = Math.max(0, Math.min(index, max));
  track.style.transform = `translateX(${-index * 340}px)`;
}

// Auto slide
setInterval(() => slide(1), 5000);

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add("visible");
    }
  });
},{threshold:0.2});

reveals.forEach(r => observer.observe(r));

const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    // Reset animation
    slide.querySelector('.hero-content').style.opacity = 0;
  });
  const activeSlide = slides[index];
  activeSlide.classList.add('active');

  // Trigger reflow to restart animation
  void activeSlide.offsetWidth;
  activeSlide.querySelector('.hero-content').style.opacity = 1;
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// Auto-slide every 5 seconds
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

// Initialize first slide
showSlide(current);

// Testimonials Carousel
let testimonialIndex = 0;
function testimonialSlide(direction) {
  const track = document.getElementById('testimonialTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  const cardWidth = cards[0].offsetWidth + 20; // 20px gap
  testimonialIndex += direction;

  if(testimonialIndex < 0) testimonialIndex = cards.length - 1;
  if(testimonialIndex >= cards.length) testimonialIndex = 0;

  track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}

// Scroll Reveal for About Us Sections
const faders = document.querySelectorAll('.fade-slide');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

