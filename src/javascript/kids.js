const screenWidth = screen.width;

async function loadEvent() {
  try {
    const responseEvent = await fetch('./data/barnkalasEvent.json');

    if (!responseEvent.ok) {
      throw new Error('Could not fetch data');
    }
    const dataEvent = await responseEvent.json();
    const event = document.querySelector('.article-party');

    dataEvent.kalas.forEach((events) => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('party-div');
      event.append(eventDiv);

      const eventImg = document.createElement('img');
      eventImg.classList.add('party-img');
      eventImg.src = events.image;
      eventImg.alt = events.imageAlt;
      eventDiv.append(eventImg);

      const eventStyling = document.createElement('div');
      eventStyling.classList.add('party-styling');
      eventDiv.append(eventStyling);

      const eventHeader = document.createElement('h2');
      eventHeader.classList.add('party-header');
      eventHeader.innerText = events.titel;
      eventStyling.append(eventHeader);

      const eventText = document.createElement('p');
      eventText.classList.add('party-text');
      eventText.innerText = events.description;
      eventStyling.append(eventText);

      const eventUl = document.createElement('ol');
      eventUl.classList.add('party-list');
      eventStyling.append(eventUl);

      const content = events.content;

      content.forEach((list) => {
        const eventLi = document.createElement('li');
        eventLi.classList.add('party-listItem');
        eventLi.innerText = list;
        eventUl.append(eventLi);
      });

      const eventButton = document.createElement('button');
      eventButton.classList.add('party-button');
      eventButton.innerText = events.book;
      eventStyling.append(eventButton);
    });
  } catch (error) {
    console.error(error);
  }
}

async function loadContent() {
  try {
    const responseContent = await fetch('./data/barnkalasContent.json');

    if (!responseContent.ok) {
      throw new Error('Could not fetch data');
    }

    const dataContent = await responseContent.json();

    const contentMainHero = document.querySelector('.div-hero');
    const info = document.querySelector('.article-kids');

    dataContent.barnkalas.forEach((content) => {
      const contentHero = document.createElement('img');
      contentHero.classList.add('kids-hero');
      if (screenWidth < 1280) {
        contentHero.src = content.imgHero;
      } else {
        contentHero.src = content.imgHeroDesktop;
      }
      contentHero.alt = content.imgAltHero;
      contentMainHero.append(contentHero);

      const contentImg = document.createElement('img');
      contentImg.classList.add('kids-img');
      if (screenWidth < 1280) {
        contentImg.src = content.imgTextMobile;
      } else {
        contentImg.src = content.imgTextDesktop;
      }
      contentImg.alt = content.imgAltMobile;
      contentMainHero.append(contentImg);

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('kids-div');
      info.append(contentDiv);

      const contentHeader = document.createElement('h2');
      contentHeader.classList.add('kids-header');
      if (screenWidth < 1280) {
        contentHeader.innerText = content.titelMobile;
      } else {
        contentHeader.innerText = content.titelDesktop;
      }
      contentDiv.append(contentHeader);

      const contentButton = document.createElement('button');
      contentButton.classList.add('kids-button');
      contentButton.innerText = content.book;
      contentButton.type = 'button';
      contentDiv.append(contentButton);

      const contentMainHeader = document.createElement('h1');
      contentMainHeader.classList.add('kids-mainHeader');
      if (screenWidth < 1280) {
        contentMainHeader.innerText = content.mainTitelMobile;
      } else {
        contentMainHeader.style.display = 'none';
      }
      contentDiv.append(contentMainHeader);

      const contentText = document.createElement('p');
      contentText.classList.add('kids-text');
      if (screenWidth < 1280) {
        contentText.innerText = content.descriptionMobile;
      } else {
        contentText.innerText = content.descriptionDesktop;
      }

      contentDiv.append(contentText);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function loadkids() {
  loadEvent();
  loadContent();
}
