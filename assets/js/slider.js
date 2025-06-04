const items = document.querySelectorAll('.gallery-item');
let current = 0;

function updateCarousel() {
  items.forEach((img, i) => {
    img.className = 'gallery-item'; // reset all
    img.style.display = 'none';
  });

  const getIndex = i => (i + items.length) % items.length;

  [getIndex(current - 1), current, getIndex(current + 1)].forEach((i, pos) => {
    const classMap = ['prev', 'active', 'next'];
    items[i].classList.add(classMap[pos]);
    items[i].style.display = 'block';
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
