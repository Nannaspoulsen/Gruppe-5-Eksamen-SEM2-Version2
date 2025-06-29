// Opsætning af billedgalleri med forrige/næste-knapper
const gallery = document.querySelector('.gallery');
const items = document.querySelectorAll('.gallery-item');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
let current = 0;

// Kun hvis galleriet findes på siden, fortsætter vi
if (gallery) {
  // Funktion til at vise det aktuelle billede og dets naboer
  function updateCarousel() {
    // Først skjuler vi alle billeder og fjerner klasser
    items.forEach((img, i) => {
      img.classList.remove('prev', 'active', 'next');
      img.hidden = true;
    });
// Udregner hvilke billeder der er før, nu og efter – og viser dem
    const getIndex = i => (i + items.length) % items.length;
    [getIndex(current - 1), current, getIndex(current + 1)].forEach((i, pos) => {
      items[i].classList.add(['prev', 'active', 'next'][pos]);
      items[i].hidden = false;
    });
  }
// Når man klikker på "forrige", rykker vi ét billede tilbage
  galleryPrev.onclick = () => {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
  };
// Når man klikker på "næste", rykker vi ét billede frem
  galleryNext.onclick = () => {
    current = (current + 1) % items.length;
    updateCarousel();
  };
// Kalder funktionen første gang, så noget vises fra start
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
