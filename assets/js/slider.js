const gallery = document.querySelector('.gallery');
const items = document.querySelectorAll('.gallery-item');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');


if(gallery) {
function updateCarousel() {
  items.forEach((img, i) => {
    img.classList.remove('prev', 'active', 'next');
    img.hidden = true;
  });

  galleryNext.addEventListener('click', () => {
    current = (current + 1) % items.length;
    updateCarousel();
  });

  updateCarousel();
}

document.querySelector('.gallery-prev').onclick = () => {
  current = (current - 1 + items.length) % items.length;
  updateCarousel();
};

document.querySelector('.gallery-next').onclick = () => {
  current = (current + 1) % items.length;
  updateCarousel();
};

updateCarousel();
}




// Burger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains("redirect")) {
        window.location.href = link.href;
      } else if (link.classList.contains("drop")) {
        e.preventDefault();
        link.classList.add("redirect");
      } else {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
}
