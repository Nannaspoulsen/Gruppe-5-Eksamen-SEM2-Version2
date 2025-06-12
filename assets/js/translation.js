
changeLanguage(localStorage.getItem("lang") || "da");


document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const lang = btn.getAttribute("data-lang");
    changeLanguage(lang);
  });
});



async function changeLanguage(lang) {
  const selectedLang = lang || "da"; 
  const currentLang = localStorage.getItem("lang");
  localStorage.setItem("lang", selectedLang);

  if (selectedLang === currentLang && selectedLang === "da") {
    return
  }
  
   if (selectedLang === "da") {
    window.location.reload(); 
    return;
  }

  const currentPage = window.location.pathname.split("/").pop().split(".")[0];

  try {
    const sharedRes = await fetch(`./assets/translations/shared.${selectedLang}.json`);
    const pageRes = await fetch(`./assets/translations/${currentPage}.${selectedLang}.json`);

    const sharedTranslations = await sharedRes.json();
    const pageTranslations = await pageRes.json();

    const translations = { ...sharedTranslations, ...pageTranslations };

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