(async function startFooter() {
  try {
    const response = await fetch('../../data/footer.json');
    const data = await response.json();
    const footer = document.querySelector('.footer-container');

    const sectionsContainer = document.createElement('div');
    sectionsContainer.classList.add('sections-container');

    data.footer.sections.forEach((section) => {
      const sectionDiv = document.createElement('section');
      sectionDiv.classList.add('footer-section');

      const sectionTitle = document.createElement('h4');
      sectionTitle.textContent = section.title;
      sectionDiv.append(sectionTitle);

      const ul = document.createElement('ul');

      if (section.contact) {
        section.contact.forEach((contact) => {
          const liEmail = document.createElement('li');
          liEmail.textContent = `E-post: ${contact.mail}`;
          ul.append(liEmail);
          const liPhone = document.createElement('li');
          liPhone.textContent = `Telefonnummer: ${contact.phoneNumber}`;
          ul.append(liPhone);
        });
      } else if (section.links) {
        section.links.forEach((link) => {
          const li = document.createElement('li');

          if (link.icon) {
            const icon = document.createElement('img');
            icon.src = link.icon;
            icon.alt = `${link.text || link.name} icon`;
            icon.classList.add('footer-icon');
            li.append(icon);
          }
          const a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.text || link.name;
          a.classList.add('footer-a');
          li.append(a);
          ul.append(li);
        });
      } else if (section.adress) {
        section.adress.forEach((address) => {
          const liStreet = document.createElement('li');
          liStreet.textContent = address.street;
          ul.appendChild(liStreet);

          const liTown = document.createElement('li');
          liTown.textContent = address.town;
          ul.appendChild(liTown);

          const liFindUs = document.createElement('li');
          const aFindUs = document.createElement('a');
          aFindUs.href = address.url;
          aFindUs.textContent = address.findUs;
          aFindUs.classList.add('footer-afind');
          liFindUs.appendChild(aFindUs);
          ul.appendChild(liFindUs);
        });
      }
      sectionDiv.append(ul);
      sectionsContainer.append(sectionDiv);
    });

    footer.append(sectionsContainer);

    const span = document.createElement('span');
    span.classList.add('footer-logo-p');
    footer.append(span);

    const logo = document.createElement('img');
    logo.src = data.footer.logo;
    logo.alt = 'Kino Bio Logo';
    logo.classList.add('footer-logo');
    span.append(logo);

    const text = document.createElement('p');
    text.textContent = data.footer.text;
    text.classList.add('footer-logotext');
    span.append(text);
  } catch (error) {
    console.error('error', error);
  }
})();
