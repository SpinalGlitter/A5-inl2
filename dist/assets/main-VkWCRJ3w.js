(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
  new MutationObserver((e) => {
    for (const c of e)
      if (c.type === 'childList')
        for (const r of c.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && u(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function p(e) {
    const c = {};
    return (
      e.integrity && (c.integrity = e.integrity),
      e.referrerPolicy && (c.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (c.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (c.credentials = 'omit')
          : (c.credentials = 'same-origin'),
      c
    );
  }
  function u(e) {
    if (e.ep) return;
    e.ep = !0;
    const c = p(e);
    fetch(e.href, c);
  }
})();
async function T() {
  return await (await fetch('./data/header.json')).json();
}
function k(a) {
  const o = document.querySelector('#navigation-menu'),
    p = document.createElement('nav');
  p.className = 'main-nav';
  const u = document.createElement('div');
  u.className = 'nav-left';
  const e = document.createElement('a');
  e.href = 'index.html';
  const c = document.createElement('img');
  (c.src = a.header.mainHeader.logo), (c.alt = a.header.mainHeader.alt), (c.className = 'nav-logo'), e.appendChild(c);
  const r = document.createElement('a');
  r.href = 'index.html';
  const i = document.createElement('span');
  (i.className = 'brand-name'),
    (i.textContent = a.header.mainHeader.brandName),
    r.appendChild(i),
    u.appendChild(e),
    u.appendChild(r);
  const n = document.createElement('div');
  n.className = 'nav-right';
  const d = document.createElement('button');
  (d.className = 'hamburger-btn'), (d.innerHTML = '<i class="fas fa-bars"></i>');
  const s = document.createElement('div');
  (s.className = 'menu-overlay'), (s.style.display = 'none');
  const t = document.createElement('div');
  t.className = 'overlay-blur';
  const l = document.createElement('div');
  l.className = 'overlay-logo';
  const m = document.createElement('button');
  (m.className = 'close-btn'), (m.innerHTML = '<i class="fas fa-times"></i>'), s.appendChild(m);
  const h = document.createElement('img');
  (h.src = a.header.hamburgerMenu.menuLogo),
    (h.alt = a.header.mainHeader.alt),
    (h.className = 'overlay-logo'),
    l.appendChild(h),
    s.appendChild(l);
  const f = document.createElement('ul');
  (f.className = 'menu-links'),
    a.header.hamburgerMenu.menuLinks.forEach((E) => {
      const C = document.createElement('li'),
        y = document.createElement('a');
      switch (E.text) {
        case 'Om oss':
          y.href = 'about.html';
          break;
        case 'Barnkalas':
          y.href = 'kids.html';
          break;
        default:
          y.href = '#';
      }
      (y.textContent = E.text), C.appendChild(y), f.appendChild(C);
    }),
    s.appendChild(f),
    d.addEventListener('click', () => {
      (s.style.display = 'block'), t.classList.add('active');
    }),
    m.addEventListener('click', () => {
      (s.style.display = 'none'), t.classList.remove('active');
    }),
    t.addEventListener('click', () => {
      (s.style.display = 'none'), t.classList.remove('active');
    }),
    n.appendChild(f.cloneNode(!0)),
    n.appendChild(d),
    p.appendChild(u),
    p.appendChild(n),
    o.appendChild(p),
    o.appendChild(s),
    o.appendChild(t);
}
async function S() {
  const a = await T();
  k(a);
}
const v = screen.width;
async function w() {
  try {
    const a = await fetch('./data/barnkalasEvent.json');
    if (!a.ok) throw new Error('Could not fetch data');
    const o = await a.json(),
      p = document.querySelector('.article-party');
    o.kalas.forEach((u) => {
      const e = document.createElement('div');
      e.classList.add('party-div'), p.append(e);
      const c = document.createElement('img');
      c.classList.add('party-img'), (c.src = u.image), (c.alt = u.imageAlt), e.append(c);
      const r = document.createElement('div');
      r.classList.add('party-styling'), e.append(r);
      const i = document.createElement('h2');
      i.classList.add('party-header'), (i.innerText = u.titel), r.append(i);
      const n = document.createElement('p');
      n.classList.add('party-text'), (n.innerText = u.description), r.append(n);
      const d = document.createElement('ol');
      d.classList.add('party-list'),
        r.append(d),
        u.content.forEach((l) => {
          const m = document.createElement('li');
          m.classList.add('party-listItem'), (m.innerText = l), d.append(m);
        });
      const t = document.createElement('button');
      t.classList.add('party-button'), (t.innerText = u.book), r.append(t);
    });
  } catch (a) {
    console.error(a);
  }
}
async function q() {
  try {
    const a = await fetch('./data/barnkalasContent.json');
    if (!a.ok) throw new Error('Could not fetch data');
    const o = await a.json(),
      p = document.querySelector('.div-hero'),
      u = document.querySelector('.article-kids');
    o.barnkalas.forEach((e) => {
      const c = document.createElement('img');
      c.classList.add('kids-hero'),
        v < 1280 ? (c.src = e.imgHero) : (c.src = e.imgHeroDesktop),
        (c.alt = e.imgAltHero),
        p.append(c);
      const r = document.createElement('img');
      r.classList.add('kids-img'),
        v < 1280 ? (r.src = e.imgTextMobile) : (r.src = e.imgTextDesktop),
        (r.alt = e.imgAltMobile),
        p.append(r);
      const i = document.createElement('div');
      i.classList.add('kids-div'), u.append(i);
      const n = document.createElement('h2');
      n.classList.add('kids-header'),
        v < 1280 ? (n.innerText = e.titelMobile) : (n.innerText = e.titelDesktop),
        i.append(n);
      const d = document.createElement('button');
      d.classList.add('kids-button'), (d.innerText = e.book), (d.type = 'button'), i.append(d);
      const s = document.createElement('h1');
      s.classList.add('kids-mainHeader'),
        v < 1280 ? (s.innerText = e.mainTitelMobile) : (s.style.display = 'none'),
        i.append(s);
      const t = document.createElement('p');
      t.classList.add('kids-text'),
        v < 1280 ? (t.innerText = e.descriptionMobile) : (t.innerText = e.descriptionDesktop),
        i.append(t);
    });
  } catch (a) {
    console.error(a);
  }
}
async function H() {
  w(), q();
}
async function N() {
  const a = await fetch('/api/movies');
  if (!a.ok) throw new Error(`HTTP-error! Status: ${a.status}`);
  const p = (await a.json()).data,
    u = document.querySelector('.movie-container'),
    e = document.createElement('div');
  e.classList.add('modal'),
    (e.innerHTML = `
    <div class="modal-content">
      <i class="close-button fas fa-times"></i>
      <div class="modal-body"></div>
    </div>
  `),
    document.body.appendChild(e);
  const c = document.querySelector('.modal-body');
  document.querySelector('.close-button').addEventListener('click', () => {
    e.style.display = 'none';
  }),
    window.addEventListener('click', (i) => {
      i.target === e && (e.style.display = 'none');
    }),
    p.forEach((i) => {
      const n = i.attributes,
        d = document.createElement('div');
      d.classList.add('movie-card'), u.appendChild(d);
      const s = document.createElement('img');
      (s.src = n.image.url), (s.alt = `Bild för ${n.title}`), d.appendChild(s);
      const t = document.createElement('h2');
      (t.textContent = n.title), d.appendChild(t);
      const l = document.createElement('p');
      (l.textContent = n.intro),
        d.appendChild(l),
        t.addEventListener('click', (m) => {
          m.stopPropagation(),
            (c.innerHTML = `
        <p><strong>Titel:</strong> ${n.title}</p>
        <p><strong>Handling:</strong> ${n.intro}</p>
        <img src="${n.image.url}" alt="${n.title}" />`),
            (e.style.display = 'block');
        });
    });
}
async function A() {
  const a = await fetch('data/moviesHeadline.json');
  if (!a.ok) throw new Error(`HTTP-error! Status: ${a.status}`);
  const o = await a.json(),
    p = document.querySelector('.movie-headline');
  p.textContent = o.HeadlineText;
}
async function M() {
  A(), N();
}
async function B() {
  return await (await fetch('./data/infoModal.json')).json();
}
async function j() {
  if (!(document.querySelector('.info') || document.querySelector('.information'))) return;
  const o = await B(),
    p = document.querySelector('.info-modal'),
    u = document.querySelector('.info-modal-list'),
    e = document.querySelector('.info');
  if (e) {
    const i = o.sections[0],
      n = document.querySelector('.cinema-title'),
      d = document.querySelector('.cinema-open'),
      s = document.createElement('button');
    (s.innerText = o.buttons[2].text), (n.innerText = i.title), (d.innerText = i.text);
    const t = document.querySelector('.kino-img'),
      l = document.querySelector('.info-2'),
      m = o.sections[1].modal,
      h = m[3].open,
      f = document.createElement('h3'),
      E = document.createElement('p');
    (f.innerText = m[3].title), (E.innerText = m[3].text), (t.src = o.kinoImg.src), (t.alt = o.kinoImg.alt);
    const C = document.createElement('div');
    C.appendChild(f),
      C.appendChild(E),
      C.setAttribute('class', 'open-div'),
      f.setAttribute('class', 'desktop-open-title'),
      E.setAttribute('class', 'desktop-open-paragraph'),
      h.forEach((y) => {
        const g = document.createElement('div'),
          b = document.createElement('p'),
          x = document.createElement('p'),
          L = document.createElement('p');
        g.setAttribute('class', 'open-times'),
          b.setAttribute('class', 'open-times-day'),
          x.setAttribute('class', 'open-times-date'),
          L.setAttribute('class', 'open-times-time'),
          (b.innerText = y.dag),
          (x.innerText = y.datum),
          (L.innerText = y.tid),
          g.appendChild(b),
          g.appendChild(x),
          g.appendChild(L),
          C.appendChild(g);
      }),
      l.prepend(C),
      e.appendChild(l);
  }
  const c = o.sections[1].modal;
  let r = 0;
  c.forEach((i) => {
    if (i.text == null) {
      const n = document.createElement('p');
      n.setAttribute('class', 'modal-title'), (n.innerText = i.title), p.prepend(n);
    } else {
      const n = document.createElement('li'),
        d = document.createElement('p'),
        s = document.createElement('p'),
        t = document.createElement('img');
      n.setAttribute('class', 'modal-item-' + r),
        r++,
        d.setAttribute('class', 'modal-question'),
        s.setAttribute('class', 'modal-answer'),
        t.setAttribute('class', 'modal-open'),
        (d.innerText = i.title),
        (s.innerText = i.text),
        (s.style.display = 'none'),
        (t.src = o.buttons[0].openButton),
        (t.alt = o.buttons[0].alt),
        n.appendChild(t),
        n.appendChild(d),
        t.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = o.buttons[1].closeButton), (t.alt = o.buttons[1].alt), (s.style.display = ''))
              : ((t.src = o.buttons[0].openButton), (t.alt = o.buttons[0].alt), (s.style.display = 'none'));
        }),
        d.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = o.buttons[1].closeButton), (t.alt = o.buttons[1].alt), (s.style.display = ''))
              : ((t.src = o.buttons[0].openButton), (t.alt = o.buttons[0].alt), (s.style.display = 'none'));
        }),
        'open' in i
          ? i.open.forEach((l) => {
              const m = document.createElement('p'),
                h = document.createElement('p'),
                f = document.createElement('p'),
                E = document.createElement('div');
              E.setAttribute('class', 'open-times'),
                m.setAttribute('class', 'open-times-day'),
                h.setAttribute('class', 'open-times-date'),
                f.setAttribute('class', 'open-times-time'),
                (m.innerText = l.dag),
                (h.innerText = l.datum),
                (f.innerText = l.tid),
                E.appendChild(m),
                E.appendChild(h),
                E.appendChild(f),
                s.appendChild(E),
                n.appendChild(s),
                u.appendChild(n);
            })
          : (n.appendChild(s), u.appendChild(n));
    }
  });
}
(async function () {
  try {
    const p = await (await fetch('./data/footer.json')).json(),
      u = document.querySelector('.footer-container'),
      e = document.createElement('div');
    e.classList.add('sections-container'),
      p.footer.sections.forEach((n) => {
        const d = document.createElement('section');
        d.classList.add('footer-section');
        const s = document.createElement('h4');
        (s.textContent = n.title), d.append(s);
        const t = document.createElement('ul');
        n.contact
          ? n.contact.forEach((l) => {
              const m = document.createElement('li');
              (m.textContent = `E-post: ${l.mail}`), t.append(m);
              const h = document.createElement('li');
              (h.textContent = `Telefonnummer: ${l.phoneNumber}`), t.append(h);
            })
          : n.links
            ? n.links.forEach((l) => {
                const m = document.createElement('li');
                if (l.icon) {
                  const f = document.createElement('img');
                  (f.src = l.icon), (f.alt = `${l.text || l.name} icon`), f.classList.add('footer-icon'), m.append(f);
                }
                const h = document.createElement('a');
                (h.href = l.url),
                  (h.textContent = l.text || l.name),
                  h.classList.add('footer-a'),
                  m.append(h),
                  t.append(m);
              })
            : n.adress &&
              n.adress.forEach((l) => {
                const m = document.createElement('li');
                (m.textContent = l.street), t.appendChild(m);
                const h = document.createElement('li');
                (h.textContent = l.town), t.appendChild(h);
                const f = document.createElement('li'),
                  E = document.createElement('a');
                (E.href = l.url),
                  (E.textContent = l.findUs),
                  E.classList.add('footer-afind'),
                  f.appendChild(E),
                  t.appendChild(f);
              }),
          d.append(t),
          e.append(d);
      }),
      u.append(e);
    const c = document.createElement('span');
    c.classList.add('footer-logo-p'), u.append(c);
    const r = document.createElement('img');
    (r.src = p.footer.logo), (r.alt = 'Kino Bio Logo'), r.classList.add('footer-logo'), c.append(r);
    const i = document.createElement('p');
    (i.textContent = p.footer.text), i.classList.add('footer-logotext'), c.append(i);
  } catch (o) {
    console.error('error', o);
  }
})();
async function P() {
  const o = await (await fetch('./data/about.json')).json();
  return { mainHeadline: o.aboutUs, headline: o.headline, aboutPage: o.aboutPage };
}
async function I() {
  const { mainHeadline: a, headline: o, aboutPage: p } = await P();
  a && o && p && $(p, o, a);
}
function $(a, o, p) {
  if (!document.querySelector('.about-page')) return;
  const u = document.querySelector('.about-main-header'),
    e = document.createElement('h1');
  (e.textContent = p), u.appendChild(e);
  const c = document.querySelector('.about-header'),
    r = document.createElement('h2');
  (r.textContent = o), c.appendChild(r);
  const i = document.querySelector('.section-1'),
    n = document.createElement('h3');
  n.textContent = a[0].section;
  const d = document.createElement('p');
  (d.textContent = a[0].content), i.appendChild(n), i.appendChild(d);
  const s = document.querySelector('.section-2'),
    t = document.createElement('h3');
  t.textContent = a[1].section;
  const l = document.createElement('p');
  (l.textContent = a[1].content), s.appendChild(t), s.appendChild(l);
  const m = document.querySelector('.section-3'),
    h = document.createElement('h3');
  h.textContent = a[2].section;
  const f = document.createElement('p');
  (f.textContent = a[2].content), m.appendChild(h), m.appendChild(f);
  const E = document.querySelector('.section-4'),
    C = document.createElement('h3');
  C.textContent = a[3].section;
  const y = document.createElement('p');
  (y.textContent = a[3].content), E.appendChild(C), E.appendChild(y);
}
I();
S();
const O = document.querySelector('.article-kids');
O && H();
const U = document.querySelector('.movie-container');
U && M();
(document.querySelector('.info') || document.querySelector('.info-modal')) && j();
