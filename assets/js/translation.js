// Skifter sprog på siden ud fra brugerens tidligere valg, eller bruger dansk som standard
changeLanguage(localStorage.getItem("lang") || "da");

// Tilføjer klikfunktion til alle sprogknapper
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // Henter hvilket sprog brugeren har valgt
    const lang = btn.getAttribute("data-lang");
    // Skifter sproget på siden
    changeLanguage(lang);
    window.location.reload();
  });
});


// Funktion der skifter sprog og gemmer det i localStorage
async function changeLanguage(lang) {
  const selectedLang = lang || "da";
  const currentLang = localStorage.getItem("lang");
  localStorage.setItem("lang", selectedLang);

// Hvis sproget allerede er dansk og ikke ændret, så gør ingenting
  if (selectedLang === currentLang && selectedLang === "da") {
    return;
  }
   // Hvis brugeren vælger dansk, genindlæses siden
   if (selectedLang === "da") {
    window.location.reload(); 
    return;
  }
// Finder navnet på den aktuelle side, fx "forside" eller "kontakt"
  const currentPage = window.location.pathname.split("/").pop().split(".")[0];

  try {
    const sharedRes = await fetch(
      `./assets/translations/shared.${selectedLang}.json`
    );
    const sharedTranslations = await sharedRes.json();

    let pageTranslations = {};

    try {
      const pageRes = await fetch(
        `./assets/translations/${currentPage}.${selectedLang}.json`
      );
      if (!pageRes.ok)
        throw new Error(
          `No translation file found for ${currentPage}.${selectedLang}`
        );
      pageTranslations = await pageRes.json();
    } catch (innerErr) {
      console.warn(innerErr.message);
    }

    const translations = { ...sharedTranslations, ...pageTranslations };
// Går alle elementer med data-i18n igennem og sætter teksten ud fra oversættelserne. data-i18n står for "data-internationalization". det bruges til at markere, hvilke elementer der skal oversættes.
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
  } catch (error) {
    // Hvis noget går galt (fx fil mangler), vises fejlen i konsollen
    console.error("Translation load error:", error);
  }
}
