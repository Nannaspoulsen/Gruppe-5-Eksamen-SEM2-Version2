const items = document.querySelectorAll('.gallery-item');
let current = 0;

function updateCarousel() {
  items.forEach((img, i) => {
    img.classList.remove('prev', 'active', 'next');
    img.hidden = true;
  });

  const getIndex = i => (i + items.length) % items.length;
  [getIndex(current - 1), current, getIndex(current + 1)].forEach((i, pos) => {
    items[i].classList.add(['prev', 'active', 'next'][pos]);
    items[i].hidden = false;
  });
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
