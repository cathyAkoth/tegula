const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

