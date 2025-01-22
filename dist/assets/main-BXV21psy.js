(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
  new MutationObserver((e) => {
    for (const c of e)
      if (c.type === 'childList')
        for (const s of c.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && u(s);
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
  return await (await fetch('/api/header')).json();
}
function k(o) {
  const n = document.querySelector('#navigation-menu'),
    p = document.createElement('nav');
  p.className = 'main-nav';
  const u = document.createElement('div');
  u.className = 'nav-left';
  const e = document.createElement('a');
  e.href = '/index.html';
  const c = document.createElement('img');
  (c.src = o.header.mainHeader.logo), (c.alt = o.header.mainHeader.alt), (c.className = 'nav-logo'), e.appendChild(c);
  const s = document.createElement('a');
  s.href = '/index.html';
  const d = document.createElement('span');
  (d.className = 'brand-name'),
    (d.textContent = o.header.mainHeader.brandName),
    s.appendChild(d),
    u.appendChild(e),
    u.appendChild(s);
  const a = document.createElement('div');
  a.className = 'nav-right';
  const r = document.createElement('button');
  (r.className = 'hamburger-btn'), (r.innerHTML = '<i class="fas fa-bars"></i>');
  const i = document.createElement('div');
  (i.className = 'menu-overlay'), (i.style.display = 'none');
  const t = document.createElement('div');
  t.className = 'overlay-blur';
  const l = document.createElement('div');
  l.className = 'overlay-logo';
  const m = document.createElement('button');
  (m.className = 'close-btn'), (m.innerHTML = '<i class="fas fa-times"></i>'), i.appendChild(m);
  const h = document.createElement('img');
  (h.src = o.header.hamburgerMenu.menuLogo),
    (h.alt = o.header.mainHeader.alt),
    (h.className = 'overlay-logo'),
    l.appendChild(h),
    i.appendChild(l);
  const f = document.createElement('ul');
  (f.className = 'menu-links'),
    o.header.hamburgerMenu.menuLinks.forEach((E) => {
      const C = document.createElement('li'),
        y = document.createElement('a');
      switch (E.text) {
        case 'Om oss':
          y.href = '/about.html';
          break;
        case 'Barnkalas':
          y.href = '/kids.html';
          break;
        default:
          y.href = '#';
      }
      (y.textContent = E.text), C.appendChild(y), f.appendChild(C);
    }),
    i.appendChild(f),
    r.addEventListener('click', () => {
      (i.style.display = 'block'), t.classList.add('active');
    }),
    m.addEventListener('click', () => {
      (i.style.display = 'none'), t.classList.remove('active');
    }),
    t.addEventListener('click', () => {
      (i.style.display = 'none'), t.classList.remove('active');
    }),
    a.appendChild(f.cloneNode(!0)),
    a.appendChild(r),
    p.appendChild(u),
    p.appendChild(a),
    n.appendChild(p),
    n.appendChild(i),
    n.appendChild(t);
}
async function S() {
  const o = await T();
  k(o);
}
const v = screen.width;
async function w() {
  try {
    const o = await fetch('./data/barnkalasEvent.json');
    if (!o.ok) throw new Error('Could not fetch data');
    const n = await o.json(),
      p = document.querySelector('.article-party');
    n.kalas.forEach((u) => {
      const e = document.createElement('div');
      e.classList.add('party-div'), p.append(e);
      const c = document.createElement('img');
      c.classList.add('party-img'), (c.src = u.image), (c.alt = u.imageAlt), e.append(c);
      const s = document.createElement('div');
      s.classList.add('party-styling'), e.append(s);
      const d = document.createElement('h2');
      d.classList.add('party-header'), (d.innerText = u.titel), s.append(d);
      const a = document.createElement('p');
      a.classList.add('party-text'), (a.innerText = u.description), s.append(a);
      const r = document.createElement('ol');
      r.classList.add('party-list'),
        s.append(r),
        u.content.forEach((l) => {
          const m = document.createElement('li');
          m.classList.add('party-listItem'), (m.innerText = l), r.append(m);
        });
      const t = document.createElement('button');
      t.classList.add('party-button'), (t.innerText = u.book), s.append(t);
    });
  } catch (o) {
    console.error(o);
  }
}
async function q() {
  try {
    const o = await fetch('./data/barnkalasContent.json');
    if (!o.ok) throw new Error('Could not fetch data');
    const n = await o.json(),
      p = document.querySelector('.div-hero'),
      u = document.querySelector('.article-kids');
    n.barnkalas.forEach((e) => {
      const c = document.createElement('img');
      c.classList.add('kids-hero'),
        v < 1280 ? (c.src = e.imgHero) : (c.src = e.imgHeroDesktop),
        (c.alt = e.imgAltHero),
        p.append(c);
      const s = document.createElement('img');
      s.classList.add('kids-img'),
        v < 1280 ? (s.src = e.imgTextMobile) : (s.src = e.imgTextDesktop),
        (s.alt = e.imgAltMobile),
        p.append(s);
      const d = document.createElement('div');
      d.classList.add('kids-div'), u.append(d);
      const a = document.createElement('h2');
      a.classList.add('kids-header'),
        v < 1280 ? (a.innerText = e.titelMobile) : (a.innerText = e.titelDesktop),
        d.append(a);
      const r = document.createElement('button');
      r.classList.add('kids-button'), (r.innerText = e.book), (r.type = 'button'), d.append(r);
      const i = document.createElement('h1');
      i.classList.add('kids-mainHeader'),
        v < 1280 ? (i.innerText = e.mainTitelMobile) : (i.style.display = 'none'),
        d.append(i);
      const t = document.createElement('p');
      t.classList.add('kids-text'),
        v < 1280 ? (t.innerText = e.descriptionMobile) : (t.innerText = e.descriptionDesktop),
        d.append(t);
    });
  } catch (o) {
    console.error(o);
  }
}
async function H() {
  w(), q();
}
async function N() {
  const o = await fetch('/api/movies');
  if (!o.ok) throw new Error(`HTTP-error! Status: ${o.status}`);
  const p = (await o.json()).data,
    u = document.querySelector('.movie-container');
  p.forEach((e) => {
    const c = e.attributes,
      s = document.createElement('div');
    s.classList.add('movie-card'), u.appendChild(s);
    const d = document.createElement('img');
    (d.src = c.image.url), (d.alt = `Bild för ${c.title}`), s.appendChild(d);
    const a = document.createElement('h2');
    (a.textContent = c.title), s.appendChild(a);
    const r = document.createElement('p');
    (r.textContent = c.intro),
      s.appendChild(r),
      a.addEventListener('click', (i) => {
        i.stopPropagation(), (window.location.href = `/movies/${e.id}`);
      });
  });
}
async function A() {
  const o = await fetch('/api/movies-headline');
  if (!o.ok) throw new Error(`HTTP-error! Status: ${o.status}`);
  const n = await o.json(),
    p = document.querySelector('.movie-headline');
  p.textContent = n.HeadlineText;
}
async function M() {
  A(), N();
}
async function B() {
  return await (await fetch('/api/info-modal')).json();
}
async function P() {
  if (!(document.querySelector('.info') || document.querySelector('.information'))) return;
  const n = await B(),
    p = document.querySelector('.info-modal'),
    u = document.querySelector('.info-modal-list'),
    e = document.querySelector('.info');
  if (e) {
    const d = n.sections[0],
      a = document.querySelector('.cinema-title'),
      r = document.querySelector('.cinema-open'),
      i = document.createElement('button');
    (i.innerText = n.buttons[2].text), (a.innerText = d.title), (r.innerText = d.text);
    const t = document.querySelector('.kino-img'),
      l = document.querySelector('.info-2'),
      m = n.sections[1].modal,
      h = m[3].open,
      f = document.createElement('h3'),
      E = document.createElement('p');
    (f.innerText = m[3].title), (E.innerText = m[3].text), (t.src = n.kinoImg.src), (t.alt = n.kinoImg.alt);
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
  const c = n.sections[1].modal;
  let s = 0;
  c.forEach((d) => {
    if (d.text == null) {
      const a = document.createElement('p');
      a.setAttribute('class', 'modal-title'), (a.innerText = d.title), p.prepend(a);
    } else {
      const a = document.createElement('li'),
        r = document.createElement('p'),
        i = document.createElement('p'),
        t = document.createElement('img');
      a.setAttribute('class', 'modal-item-' + s),
        s++,
        r.setAttribute('class', 'modal-question'),
        i.setAttribute('class', 'modal-answer'),
        t.setAttribute('class', 'modal-open'),
        (r.innerText = d.title),
        (i.innerText = d.text),
        (i.style.display = 'none'),
        (t.src = n.buttons[0].openButton),
        (t.alt = n.buttons[0].alt),
        a.appendChild(t),
        a.appendChild(r),
        t.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = n.buttons[1].closeButton), (t.alt = n.buttons[1].alt), (i.style.display = ''))
              : ((t.src = n.buttons[0].openButton), (t.alt = n.buttons[0].alt), (i.style.display = 'none'));
        }),
        r.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = n.buttons[1].closeButton), (t.alt = n.buttons[1].alt), (i.style.display = ''))
              : ((t.src = n.buttons[0].openButton), (t.alt = n.buttons[0].alt), (i.style.display = 'none'));
        }),
        'open' in d
          ? d.open.forEach((l) => {
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
                i.appendChild(E),
                a.appendChild(i),
                u.appendChild(a);
            })
          : (a.appendChild(i), u.appendChild(a));
    }
  });
}
(async function () {
  try {
    const p = await (await fetch('/api/footer')).json(),
      u = document.querySelector('.footer-container'),
      e = document.createElement('div');
    e.classList.add('sections-container'),
      p.footer.sections.forEach((a) => {
        const r = document.createElement('section');
        r.classList.add('footer-section');
        const i = document.createElement('h4');
        (i.textContent = a.title), r.append(i);
        const t = document.createElement('ul');
        a.contact
          ? a.contact.forEach((l) => {
              const m = document.createElement('li');
              (m.textContent = `E-post: ${l.mail}`), t.append(m);
              const h = document.createElement('li');
              (h.textContent = `Telefonnummer: ${l.phoneNumber}`), t.append(h);
            })
          : a.links
            ? a.links.forEach((l) => {
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
            : a.adress &&
              a.adress.forEach((l) => {
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
          r.append(t),
          e.append(r);
      }),
      u.append(e);
    const c = document.createElement('span');
    c.classList.add('footer-logo-p'), u.append(c);
    const s = document.createElement('img');
    (s.src = p.footer.logo), (s.alt = 'Kino Bio Logo'), s.classList.add('footer-logo'), c.append(s);
    const d = document.createElement('p');
    (d.textContent = p.footer.text), d.classList.add('footer-logotext'), c.append(d);
  } catch (n) {
    console.error('error', n);
  }
})();
async function j() {
  const n = await (await fetch('/data/about.json')).json();
  return { mainHeadline: n.aboutUs, headline: n.headline, aboutPage: n.aboutPage };
}
async function I() {
  const { mainHeadline: o, headline: n, aboutPage: p } = await j();
  o && n && p && O(p, n, o);
}
function O(o, n, p) {
  if (!document.querySelector('.about-page')) return;
  const u = document.querySelector('.about-main-header'),
    e = document.createElement('h1');
  (e.textContent = p), u.appendChild(e);
  const c = document.querySelector('.about-header'),
    s = document.createElement('h2');
  (s.textContent = n), c.appendChild(s);
  const d = document.querySelector('.section-1'),
    a = document.createElement('h3');
  a.textContent = o[0].section;
  const r = document.createElement('p');
  (r.textContent = o[0].content), d.appendChild(a), d.appendChild(r);
  const i = document.querySelector('.section-2'),
    t = document.createElement('h3');
  t.textContent = o[1].section;
  const l = document.createElement('p');
  (l.textContent = o[1].content), i.appendChild(t), i.appendChild(l);
  const m = document.querySelector('.section-3'),
    h = document.createElement('h3');
  h.textContent = o[2].section;
  const f = document.createElement('p');
  (f.textContent = o[2].content), m.appendChild(h), m.appendChild(f);
  const E = document.querySelector('.section-4'),
    C = document.createElement('h3');
  C.textContent = o[3].section;
  const y = document.createElement('p');
  (y.textContent = o[3].content), E.appendChild(C), E.appendChild(y);
}
I();
S();
const $ = document.querySelector('.article-kids');
$ && H();
const U = document.querySelector('.movie-container');
U && M();
(document.querySelector('.info') || document.querySelector('.info-modal')) && P();
