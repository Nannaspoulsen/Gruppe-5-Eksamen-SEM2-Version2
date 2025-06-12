const holdCardWrapperEl = document.querySelector(".holdCardWrapper");
const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const authEndpoint = "wp-json/jwt-auth/v1/token";
const fullImage = "?acf_format=standard&per_page=100";

const url = domain + postsEndpoint + fullImage;




// Vælger alle elementer med klassen "lang-btn" og looper gennem dem én for én
document.querySelectorAll(".lang-btn").forEach((btn) => {
   // Tilføjer en klik-eventlistener til hver knap
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // Henter værdien fra attributten "data-lang" på den knap, der blev klikket
    const lang = btn.getAttribute("data-lang");
  });
});

// Henter data fra det link, der står i 'url'
fetch(url)
// Når vi får svar, laver vi det om til noget JavaScript kan læse (JSON)
  .then((response) => response.json())
  // Når data er klar, gør vi to ting:
  .then((data) => {
    // Vi viser data i konsollen, så vi kan tjekke det
    console.log(data);
     // Vi sender data videre til en funktion, der viser det på siden
    createJuniorCard(data);
  })
  // Hvis noget går galt undervejs, fanger vi fejlen og viser en besked
  .catch((error) => console.log("Der er sket en fejl:", error));

  function createJuniorCard(contacts) {
    // Finder ud af hvilket sprog brugeren har valgt – standard er dansk ("da")
  const lang = localStorage.getItem("lang") || "da";
  // Vælger det rigtige kategori-ID alt efter sprog (bruges til at filtrere)
  const targetCategoryId = lang === "da" ? 9 : 11; 

  contacts.forEach(contact => {
  // Hvis kontaktpersonen ikke hører til den valgte kategori, springes den over
  if (!contact.categories.includes(targetCategoryId)) return;
// Henter billedets URL – hvis der ikke er et billede, bruges et fallback-billede
  const imageUrl = contact.acf?.billede?.url || "./assets/images/fallback.jpg";
  const title = contact.acf?.holdnavn || "Ukendt rolle";
  const schedule = contact.acf?.tidspunkt || "Træningstid ikke angivet";
  const coaches = contact.acf?.traener || "Trænere ikke angivet";
  const fullDescription = contact.acf?.beskrivelse || "";
  const shortDescription = contact.acf?.kort_beskrivelse || "";
  const slug = contact.slug || "ukendt";

  // Vi sætter en grænse på 20 ord til beskrivelsen
  const maxWords = 20;
  // Her skal den forkortede tekst gemmes
  let description = "";
  // Vi splitter hele teksten op i enkeltord
  const words = fullDescription.trim().split(/\s+/);
  // Hvis der er mere end 20 ord, tager vi kun de første 20 og tilføjer "..."
  if (words.length > maxWords) {
    description = words.slice(0, maxWords).join(" ") + "...";
  } else {
     // Hvis teksten er kort nok, bruger vi den som den er
    description = fullDescription;
  }

  // Opretter og bygger et holdkort med billede, titel, info, beskrivelse og knap
  const cardEl = document.createElement("div");
  cardEl.classList.add("holdCard");
  cardEl.innerHTML = `
    <img src="${imageUrl}" alt="${title}" />
    <div class="cardContent">
      <h3>${title}</h3>
      <div class="cardInfo">
        <div class="infoItem">
          <i class="fa-solid fa-clock"></i>
          <span>Træning: ${schedule}</span>
        </div>
        <div class="infoItem">
          <i class="fa-solid fa-user"></i>
          <span>Trænere: ${coaches}</span>
        </div>
      </div>
      <p>${description}</p>
      <details class="accordion">
  <summary>
    <i class="fas fa-chevron-right accordion-arrow"></i>
  </summary>
  <div class="accordion-content">
    <p>${fullDescription}</p>
  </div>
</details>
      <button data-dialog="dialog-${slug}" class="openDialogBtn">Læs mere om holdet</button>
    </div>
  `;
  // Tilføjer kortet til siden
  holdCardWrapperEl.appendChild(cardEl);

// Opretter en dialogboks (modal) med mere info om holdet
const dialogEl = document.createElement("dialog");
  dialogEl.id = `dialog-${slug}`;
  dialogEl.classList.add("modalDialog");
// Laver indholdet i dialogen: luk-knap, billede, titel, info, fuld tekst og kontaktknap
  dialogEl.innerHTML = `
    <div>
      <button class="closeBtn">X</button>
      <img src="${imageUrl}" alt="${title}" />
      <div class="modalContent">
        <h3>${title} - ${shortDescription}</h3>
        <div class="infoItem">
          <i class="fa-solid fa-clock"></i>
          <span>Træning: ${schedule}</span>
        </div>
        <div class="infoItem">
          <i class="fa-solid fa-user"></i>
          <span>Trænere: ${coaches}</span>
        </div>
        <p>${fullDescription}</p>
        <a href="./kontakt.html" class="modalButton">Kontakt træneren</a>
      </div>
    </div>
  `;
  // Tilføjer dialogboksen til selve body'en på siden
  document.body.appendChild(dialogEl);
  
// Her sørger vi for, at dialogboksen kan åbnes og lukkes:
// Vi finder "Læs mere"-knappen i kortet og luk-knappen i dialogen
// Når brugeren klikker på knappen, åbnes dialogen
// Når brugeren klikker på krydset, lukkes den igen
  const openBtn = cardEl.querySelector(`[data-dialog="dialog-${slug}"]`);
  const closeBtn = dialogEl.querySelector(".closeBtn");

  openBtn.addEventListener("click", () => dialogEl.showModal());
  closeBtn.addEventListener("click", () => dialogEl.close());

  });
}


