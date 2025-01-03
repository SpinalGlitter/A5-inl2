async function fetchAboutJson() {
  const res = await fetch('../../data/about.json');
  const data = await res.json();
  return {
    mainHeadline: data.aboutUs,
    headline: data.headline,
    aboutPage: data.aboutPage,
  };
}

async function updateDomWithAboutJson() {
  const { mainHeadline, headline, aboutPage } = await fetchAboutJson();

  if (mainHeadline && headline && aboutPage) {
    createSections(aboutPage, headline, mainHeadline);
  }
}

function createSections(aboutData, pageHeadline, mainHeadline) {
  // Main headline
  const mainHeadlineElement = document.querySelector('.about-main-header');
  const mainHeading = document.createElement('h1');
  mainHeading.textContent = mainHeadline;
  mainHeadlineElement.appendChild(mainHeading);

  // Headline
  const headlineElement = document.querySelector('.about-header');
  const heading = document.createElement('h2');
  heading.textContent = pageHeadline;
  headlineElement.appendChild(heading);

  // Sektion 1
  const section1 = document.querySelector('.section-1');
  const heading1 = document.createElement('h3');
  heading1.textContent = aboutData[0].section;
  const content1 = document.createElement('p');
  content1.textContent = aboutData[0].content;
  section1.appendChild(heading1);
  section1.appendChild(content1);

  // Sektion 2
  const section2 = document.querySelector('.section-2');
  const heading2 = document.createElement('h3');
  heading2.textContent = aboutData[1].section;
  const content2 = document.createElement('p');
  content2.textContent = aboutData[1].content;
  section2.appendChild(heading2);
  section2.appendChild(content2);

  // Sektion 3
  const section3 = document.querySelector('.section-3');
  const heading3 = document.createElement('h3');
  heading3.textContent = aboutData[2].section;
  const content3 = document.createElement('p');
  content3.textContent = aboutData[2].content;
  section3.appendChild(heading3);
  section3.appendChild(content3);

  // Sektion 4
  const section4 = document.querySelector('.section-4');
  const heading4 = document.createElement('h3');
  heading4.textContent = aboutData[3].section;
  const content4 = document.createElement('p');
  content4.textContent = aboutData[3].content;
  section4.appendChild(heading4);
  section4.appendChild(content4);
}

updateDomWithAboutJson();
