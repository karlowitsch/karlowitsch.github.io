fetch('json/dealers.json')
  .then(response => response.json())
  .then(data => {
    const itemList = document.getElementById('item-list'); // Container finden

    // JSON-Daten durchlaufen
    data.forEach(country => {
      // <a> für das Land erstellen
      const countryLink = document.createElement('div');
      countryLink.className = 'item country-item';
      countryLink.href = '#'; // Optional, falls das Land verlinkt werden soll

      // <picture> für Landes-Flagge
      const countryPicture = document.createElement('picture');
      const countryImg = document.createElement('img');
      countryImg.src = country.img;
      countryImg.alt = `${country.land} Flag`;
      countryPicture.appendChild(countryImg);
      countryLink.appendChild(countryPicture);

      // <p> mit Landesnamen
      const countryText = document.createElement('p');
      countryText.textContent = country.land;
      countryLink.appendChild(countryText);

      // Füge das Land zum Container hinzu
      itemList.appendChild(countryLink);

      // Händler des Landes durchlaufen
      country.items.forEach(dealer => {
        // <a> für den Händler erstellen
        const dealerLink = document.createElement('div');
        dealerLink.className = 'item dealer-item';
        dealerLink.href = dealer.link;

        // <picture> für Händler-Logo
        const dealerPicture = document.createElement('a');
        const dealerImg = document.createElement('img');
        dealerImg.src = dealer.img;
        dealerImg.alt = dealer.alt;
        dealerPicture.appendChild(dealerImg);
        dealerLink.appendChild(dealerPicture);

        // <p> mit Händlernamen
        const dealerText = document.createElement('p');
        dealerText.textContent = dealer.text;
        dealerLink.appendChild(dealerText);

        // Füge den Händler zum Container hinzu
        itemList.appendChild(dealerLink);
      });
    });
  })
  .catch(error => console.error('Fehler beim Laden der Daten:', error));


  