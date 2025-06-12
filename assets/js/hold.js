const holdCardWrapperEl = document.querySelector(".holdCardWrapper");
const domain = "https://antonstest.antonshjemmeside.dk/";
const postsEndpoint = "wp-json/wp/v2/posts";
const getRealImageUrls = "?acf_format=standard";
const authEndpoint = "wp-json/jwt-auth/v1/token";
const fullImage = "?acf_format=standard&per_page=100";
const lang = localStorage.getItem("lang") || "da";

const url = domain + postsEndpoint + fullImage;








fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    createJuniorCard(data);
  })
  .catch((error) => console.log("Der er sket en fejl:", error));

  function createJuniorCard(contacts) {

  let targetCategoryId
  
  if (lang === "da") {
    targetCategoryId = 9;
  } else if (lang === "en") {
    targetCategoryId = 11; 
  }

  contacts.forEach(contact => {
  
  if (!contact.categories.includes(targetCategoryId)) return;

  const imageUrl = contact.acf?.billede?.url || "./assets/images/fallback.jpg";
  const title = contact.acf?.holdnavn || "Ukendt rolle";
  const schedule = contact.acf?.tidspunkt || "Træningstid ikke angivet";
  const coaches = contact.acf?.traener || "Trænere ikke angivet";
  const fullDescription = contact.acf?.beskrivelse || "";
  const shortDescription = contact.acf?.kort_beskrivelse || "";
  const slug = contact.slug || "ukendt";

  
  const maxWords = 20;
  let description = "";
  const words = fullDescription.trim().split(/\s+/);
  if (words.length > maxWords) {
    description = words.slice(0, maxWords).join(" ") + "...";
  } else {
    description = fullDescription;
  }

  
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
      <button data-dialog="dialog-${slug}" class="openDialogBtn" data-i18n="training.btn">Læs mere om holdet</button>
    </div>
  `;
  holdCardWrapperEl.appendChild(cardEl);


const dialogEl = document.createElement("dialog");
  dialogEl.id = `dialog-${slug}`;
  dialogEl.classList.add("modalDialog");

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
  document.body.appendChild(dialogEl);

  const openBtn = cardEl.querySelector(`[data-dialog="dialog-${slug}"]`);
  const closeBtn = dialogEl.querySelector(".closeBtn");

  openBtn.addEventListener("click", () => dialogEl.showModal());
  closeBtn.addEventListener("click", () => dialogEl.close());

  });
}


