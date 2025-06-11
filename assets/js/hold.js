  const holdCardWrapperEl = document.querySelector(".holdCardWrapper");
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
      createJuniorCard(data);
    })
    .catch(error => console.log("Der er sket en fejl:", error));


  function createContact(contacts) {
    


    contacts.forEach(contact => {
      const contactEl = document.createElement("section");
      contactEl.classList.add("contactCard");

      const imageUrl = contact.acf?.billede?.url || "./assets/images/flyers-fav-icon.svg";
      const role = contact.acf?.rolle || "Ukendt rolle";
      const name = contact.acf?.navn || "Ukendt navn";
      const email = contact.acf?.email || "";
      const phone = contact.acf?.telefonnummer || "";

      contactEl.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${role.toUpperCase()}</h3>
        <p>${name.toUpperCase()}</p>
        <p>Email: ${email.toUpperCase()}</p>
        <p>Telefon: ${phone}</p>
      `;

      if(role === "Formand" || role === "Kasserer") {
        bestyrelsenEl.insertBefore(contactEl, bestyrelsenEl.firstChild);
      }

      else if (bestyrelsesRoller.includes(role)) {
        bestyrelsenEl.appendChild(contactEl);
      }
      else {
        traenereEl.appendChild(contactEl);
      }
      
    });
  }