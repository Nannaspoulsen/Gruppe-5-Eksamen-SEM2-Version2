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




const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
}) 

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.classList.contains("redirect")) {
      window.location.href = link.href
    } if (link.classList.contains("drop")) {
      e.preventDefault()
      e.target.classList.add("redirect")
    } else {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }

  });
})



document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const lang = btn.getAttribute("data-lang");
    changeLanguage(lang);
  });
});



async function changeLanguage(lang = null) {
  const selectedLang = lang || localStorage.getItem("lang") || "da"; 

  localStorage.setItem("lang", selectedLang);

  try {
    const res = await fetch(`./assets/translations/shared.${selectedLang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
  } catch (error) {
    console.error("Translation load error:", error);
  }
}