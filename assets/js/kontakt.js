  const bestyrelseWrapperEl = document.querySelector(".bestyrelseWrapper");
  const domain = "https://antonstest.antonshjemmeside.dk/";
  const postsEndpoint = "wp-json/wp/v2/kontaktperson";
  const getRealImageUrls = "?acf_format=standard";
  const authEndpoint = "wp-json/jwt-auth/v1/token";
  const fullImage = "?acf_format=standard&per_page=100";   

  const url = domain + postsEndpoint + fullImage;


  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createContact(data);
    })
    .catch(error => console.log("Der er sket en fejl:", error));

// funktion sorterer kontaktpersoner i to grupper: Bestyrelsesmedlemmer og trænere, baseret på deres rolle

// Vi definerer hvilke roller der hører til bestyrelsen
  function createContact(contacts) {
    // Finder de to steder på siden, hvor vi vil vise henholdsvis bestyrelse og trænere
    const bestyrelsesRoller = ["Formand", "Kasserer", "Bestyrelsesmedlem"];
    // Finder de elementer i DOM'en hvor kontakterne skal indsættes
    const bestyrelsenEl = document.querySelector("#bestyrelsen");
    const traenereEl = document.querySelector("#traenere");

// Gennemgår alle kontaktpersoner og opretter et kort til hver
    contacts.forEach(contact => {
      const contactEl = document.createElement("section");
      contactEl.classList.add("contactCard");
// Henter data fra kontaktpersonen – eller sætter en standardværdi
      const imageUrl = contact.acf?.billede?.url || "./assets/images/flyers-fav-icon.svg";
      const role = contact.acf?.rolle || "Ukendt rolle";
      const name = contact.acf?.navn || "Ukendt navn";
      const email = contact.acf?.email || "";
      const phone = contact.acf?.telefonnummer || "";

    
// Bygger kortets HTML
      contactEl.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${role.toUpperCase()}</h3>
        <p>${name.toUpperCase()}</p>
        <p>Email: ${email.toUpperCase()}</p>
        <p>Telefon: ${phone}</p>
      `;
// Hvis personen er formand eller kasserer, sættes kortet øverst i bestyrelses-listen
      if(role === "Formand" || role === "Kasserer") {
        bestyrelsenEl.insertBefore(contactEl, bestyrelsenEl.firstChild);
      }
// Hvis personen har en anden bestyrelsesrolle, sættes de nederst i bestyrelses-listen
      else if (bestyrelsesRoller.includes(role)) {
        bestyrelsenEl.appendChild(contactEl);
      }
       // Alle andre (fx trænere) vises under træner-sektionen
      else {
        traenereEl.appendChild(contactEl);
      }
      
    });
  }