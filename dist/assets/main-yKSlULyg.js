(function () {
  const n = document.createElement('link').relList;
  if (n && n.supports && n.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
  new MutationObserver((e) => {
    for (const s of e)
      if (s.type === 'childList')
        for (const i of s.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && u(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function p(e) {
    const s = {};
    return (
      e.integrity && (s.integrity = e.integrity),
      e.referrerPolicy && (s.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (s.credentials = 'omit')
          : (s.credentials = 'same-origin'),
      s
    );
  }
  function u(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = p(e);
    fetch(e.href, s);
  }
})();
async function k() {
  return await (await fetch('/api/header')).json();
}
function T(o) {
  const n = document.querySelector('#navigation-menu'),
    p = document.createElement('nav');
  p.className = 'main-nav';
  const u = document.createElement('div');
  u.className = 'nav-left';
  const e = document.createElement('a');
  e.href = '/index.html';
  const s = document.createElement('img');
  (s.src = o.header.mainHeader.logo), (s.alt = o.header.mainHeader.alt), (s.className = 'nav-logo'), e.appendChild(s);
  const i = document.createElement('a');
  i.href = '/index.html';
  const d = document.createElement('span');
  (d.className = 'brand-name'),
    (d.textContent = o.header.mainHeader.brandName),
    i.appendChild(d),
    u.appendChild(e),
    u.appendChild(i);
  const a = document.createElement('div');
  a.className = 'nav-right';
  const l = document.createElement('button');
  (l.className = 'hamburger-btn'), (l.innerHTML = '<i class="fas fa-bars"></i>');
  const c = document.createElement('div');
  (c.className = 'menu-overlay'), (c.style.display = 'none');
  const t = document.createElement('div');
  t.className = 'overlay-blur';
  const r = document.createElement('div');
  r.className = 'overlay-logo';
  const m = document.createElement('button');
  (m.className = 'close-btn'), (m.innerHTML = '<i class="fas fa-times"></i>'), c.appendChild(m);
  const h = document.createElement('img');
  (h.src = o.header.hamburgerMenu.menuLogo),
    (h.alt = o.header.mainHeader.alt),
    (h.className = 'overlay-logo'),
    r.appendChild(h),
    c.appendChild(r);
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
    c.appendChild(f),
    l.addEventListener('click', () => {
      (c.style.display = 'block'), t.classList.add('active');
    }),
    m.addEventListener('click', () => {
      (c.style.display = 'none'), t.classList.remove('active');
    }),
    t.addEventListener('click', () => {
      (c.style.display = 'none'), t.classList.remove('active');
    }),
    a.appendChild(f.cloneNode(!0)),
    a.appendChild(l),
    p.appendChild(u),
    p.appendChild(a),
    n.appendChild(p),
    n.appendChild(c),
    n.appendChild(t);
}
async function S() {
  const o = await k();
  T(o);
}
const b = screen.width;
async function w() {
  try {
    const o = await fetch('./data/barnkalasEvent.json');
    if (!o.ok) throw new Error('Could not fetch data');
    const n = await o.json(),
      p = document.querySelector('.article-party');
    n.kalas.forEach((u) => {
      const e = document.createElement('div');
      e.classList.add('party-div'), p.append(e);
      const s = document.createElement('img');
      s.classList.add('party-img'), (s.src = u.image), (s.alt = u.imageAlt), e.append(s);
      const i = document.createElement('div');
      i.classList.add('party-styling'), e.append(i);
      const d = document.createElement('h2');
      d.classList.add('party-header'), (d.innerText = u.titel), i.append(d);
      const a = document.createElement('p');
      a.classList.add('party-text'), (a.innerText = u.description), i.append(a);
      const l = document.createElement('ol');
      l.classList.add('party-list'),
        i.append(l),
        u.content.forEach((r) => {
          const m = document.createElement('li');
          m.classList.add('party-listItem'), (m.innerText = r), l.append(m);
        });
      const t = document.createElement('button');
      t.classList.add('party-button'), (t.innerText = u.book), i.append(t);
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
      const s = document.createElement('img');
      s.classList.add('kids-hero'),
        b < 1280 ? (s.src = e.imgHero) : (s.src = e.imgHeroDesktop),
        (s.alt = e.imgAltHero),
        p.append(s);
      const i = document.createElement('img');
      i.classList.add('kids-img'),
        b < 1280 ? (i.src = e.imgTextMobile) : (i.src = e.imgTextDesktop),
        (i.alt = e.imgAltMobile),
        p.append(i);
      const d = document.createElement('div');
      d.classList.add('kids-div'), u.append(d);
      const a = document.createElement('h2');
      a.classList.add('kids-header'),
        b < 1280 ? (a.innerText = e.titelMobile) : (a.innerText = e.titelDesktop),
        d.append(a);
      const l = document.createElement('button');
      l.classList.add('kids-button'), (l.innerText = e.book), (l.type = 'button'), d.append(l);
      const c = document.createElement('h1');
      c.classList.add('kids-mainHeader'),
        b < 1280 ? (c.innerText = e.mainTitelMobile) : (c.style.display = 'none'),
        d.append(c);
      const t = document.createElement('p');
      t.classList.add('kids-text'),
        b < 1280 ? (t.innerText = e.descriptionMobile) : (t.innerText = e.descriptionDesktop),
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
    u = document.querySelector('.movie-container'),
    e = document.createElement('div');
  e.classList.add('modal'),
    (e.innerHTML = `
    <div class="modal-content">
      <i class="close-button fas fa-times"></i>
      <div class="modal-body"></div>
    </div>
  `),
    document.body.appendChild(e),
    document.querySelector('.modal-body'),
    document.querySelector('.close-button').addEventListener('click', () => {
      e.style.display = 'none';
    }),
    window.addEventListener('click', (i) => {
      i.target === e && (e.style.display = 'none');
    }),
    p.forEach((i) => {
      const d = i.attributes,
        a = document.createElement('div');
      a.classList.add('movie-card'), u.appendChild(a);
      const l = document.createElement('img');
      (l.src = d.image.url), (l.alt = `Bild för ${d.title}`), a.appendChild(l);
      const c = document.createElement('h2');
      (c.textContent = d.title), a.appendChild(c);
      const t = document.createElement('p');
      (t.textContent = d.intro),
        a.appendChild(t),
        c.addEventListener('click', (r) => {
          r.stopPropagation(), (window.location.href = `/movies/${i.id}`);
        });
    });
}
async function A() {
  const o = await fetch('data/moviesHeadline.json');
  if (!o.ok) throw new Error(`HTTP-error! Status: ${o.status}`);
  const n = await o.json(),
    p = document.querySelector('.movie-headline');
  p.textContent = n.HeadlineText;
}
async function M() {
  A(), N();
}
async function B() {
  return await (await fetch('./data/infoModal.json')).json();
}
async function j() {
  if (!(document.querySelector('.info') || document.querySelector('.information'))) return;
  const n = await B(),
    p = document.querySelector('.info-modal'),
    u = document.querySelector('.info-modal-list'),
    e = document.querySelector('.info');
  if (e) {
    const d = n.sections[0],
      a = document.querySelector('.cinema-title'),
      l = document.querySelector('.cinema-open'),
      c = document.createElement('button');
    (c.innerText = n.buttons[2].text), (a.innerText = d.title), (l.innerText = d.text);
    const t = document.querySelector('.kino-img'),
      r = document.querySelector('.info-2'),
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
        const v = document.createElement('div'),
          g = document.createElement('p'),
          x = document.createElement('p'),
          L = document.createElement('p');
        v.setAttribute('class', 'open-times'),
          g.setAttribute('class', 'open-times-day'),
          x.setAttribute('class', 'open-times-date'),
          L.setAttribute('class', 'open-times-time'),
          (g.innerText = y.dag),
          (x.innerText = y.datum),
          (L.innerText = y.tid),
          v.appendChild(g),
          v.appendChild(x),
          v.appendChild(L),
          C.appendChild(v);
      }),
      r.prepend(C),
      e.appendChild(r);
  }
  const s = n.sections[1].modal;
  let i = 0;
  s.forEach((d) => {
    if (d.text == null) {
      const a = document.createElement('p');
      a.setAttribute('class', 'modal-title'), (a.innerText = d.title), p.prepend(a);
    } else {
      const a = document.createElement('li'),
        l = document.createElement('p'),
        c = document.createElement('p'),
        t = document.createElement('img');
      a.setAttribute('class', 'modal-item-' + i),
        i++,
        l.setAttribute('class', 'modal-question'),
        c.setAttribute('class', 'modal-answer'),
        t.setAttribute('class', 'modal-open'),
        (l.innerText = d.title),
        (c.innerText = d.text),
        (c.style.display = 'none'),
        (t.src = n.buttons[0].openButton),
        (t.alt = n.buttons[0].alt),
        a.appendChild(t),
        a.appendChild(l),
        t.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = n.buttons[1].closeButton), (t.alt = n.buttons[1].alt), (c.style.display = ''))
              : ((t.src = n.buttons[0].openButton), (t.alt = n.buttons[0].alt), (c.style.display = 'none'));
        }),
        l.addEventListener('click', () => {
          t.classList.toggle('open-button-clicked'),
            t.className === 'modal-open open-button-clicked'
              ? ((t.src = n.buttons[1].closeButton), (t.alt = n.buttons[1].alt), (c.style.display = ''))
              : ((t.src = n.buttons[0].openButton), (t.alt = n.buttons[0].alt), (c.style.display = 'none'));
        }),
        'open' in d
          ? d.open.forEach((r) => {
              const m = document.createElement('p'),
                h = document.createElement('p'),
                f = document.createElement('p'),
                E = document.createElement('div');
              E.setAttribute('class', 'open-times'),
                m.setAttribute('class', 'open-times-day'),
                h.setAttribute('class', 'open-times-date'),
                f.setAttribute('class', 'open-times-time'),
                (m.innerText = r.dag),
                (h.innerText = r.datum),
                (f.innerText = r.tid),
                E.appendChild(m),
                E.appendChild(h),
                E.appendChild(f),
                c.appendChild(E),
                a.appendChild(c),
                u.appendChild(a);
            })
          : (a.appendChild(c), u.appendChild(a));
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
        const l = document.createElement('section');
        l.classList.add('footer-section');
        const c = document.createElement('h4');
        (c.textContent = a.title), l.append(c);
        const t = document.createElement('ul');
        a.contact
          ? a.contact.forEach((r) => {
              const m = document.createElement('li');
              (m.textContent = `E-post: ${r.mail}`), t.append(m);
              const h = document.createElement('li');
              (h.textContent = `Telefonnummer: ${r.phoneNumber}`), t.append(h);
            })
          : a.links
            ? a.links.forEach((r) => {
                const m = document.createElement('li');
                if (r.icon) {
                  const f = document.createElement('img');
                  (f.src = r.icon), (f.alt = `${r.text || r.name} icon`), f.classList.add('footer-icon'), m.append(f);
                }
                const h = document.createElement('a');
                (h.href = r.url),
                  (h.textContent = r.text || r.name),
                  h.classList.add('footer-a'),
                  m.append(h),
                  t.append(m);
              })
            : a.adress &&
              a.adress.forEach((r) => {
                const m = document.createElement('li');
                (m.textContent = r.street), t.appendChild(m);
                const h = document.createElement('li');
                (h.textContent = r.town), t.appendChild(h);
                const f = document.createElement('li'),
                  E = document.createElement('a');
                (E.href = r.url),
                  (E.textContent = r.findUs),
                  E.classList.add('footer-afind'),
                  f.appendChild(E),
                  t.appendChild(f);
              }),
          l.append(t),
          e.append(l);
      }),
      u.append(e);
    const s = document.createElement('span');
    s.classList.add('footer-logo-p'), u.append(s);
    const i = document.createElement('img');
    (i.src = p.footer.logo), (i.alt = 'Kino Bio Logo'), i.classList.add('footer-logo'), s.append(i);
    const d = document.createElement('p');
    (d.textContent = p.footer.text), d.classList.add('footer-logotext'), s.append(d);
  } catch (n) {
    console.error('error', n);
  }
})();
async function P() {
  const n = await (await fetch('./data/about.json')).json();
  return { mainHeadline: n.aboutUs, headline: n.headline, aboutPage: n.aboutPage };
}
async function I() {
  const { mainHeadline: o, headline: n, aboutPage: p } = await P();
  o && n && p && O(p, n, o);
}
function O(o, n, p) {
  if (!document.querySelector('.about-page')) return;
  const u = document.querySelector('.about-main-header'),
    e = document.createElement('h1');
  (e.textContent = p), u.appendChild(e);
  const s = document.querySelector('.about-header'),
    i = document.createElement('h2');
  (i.textContent = n), s.appendChild(i);
  const d = document.querySelector('.section-1'),
    a = document.createElement('h3');
  a.textContent = o[0].section;
  const l = document.createElement('p');
  (l.textContent = o[0].content), d.appendChild(a), d.appendChild(l);
  const c = document.querySelector('.section-2'),
    t = document.createElement('h3');
  t.textContent = o[1].section;
  const r = document.createElement('p');
  (r.textContent = o[1].content), c.appendChild(t), c.appendChild(r);
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
(document.querySelector('.info') || document.querySelector('.info-modal')) && j();
