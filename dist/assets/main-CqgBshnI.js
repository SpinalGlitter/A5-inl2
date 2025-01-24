(function () {
  const c = document.createElement('link').relList;
  if (c && c.supports && c.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
  new MutationObserver((e) => {
    for (const o of e)
      if (o.type === 'childList')
        for (const r of o.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && t(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const o = {};
    return (
      e.integrity && (o.integrity = e.integrity),
      e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const o = s(e);
    fetch(e.href, o);
  }
})();
document.addEventListener('DOMContentLoaded', () => {
  const n = document.querySelector('.hamburger-btn'),
    c = document.querySelector('.menu-overlay'),
    s = document.querySelector('.overlay-blur'),
    t = document.querySelector('.close-btn');
  n &&
    c &&
    s &&
    t &&
    (n.addEventListener('click', () => {
      (c.style.display = 'block'), s.classList.add('active');
    }),
    t.addEventListener('click', () => {
      (c.style.display = 'none'), s.classList.remove('active');
    }),
    s.addEventListener('click', () => {
      (c.style.display = 'none'), s.classList.remove('active');
    }));
});
async function E() {
  (document.querySelector('.info') || document.querySelector('.information')) && L();
}
function L() {
  const n = document.querySelectorAll('.modal-open'),
    c = document.querySelectorAll('.modal-question');
  n.forEach((s, t) => {
    s.addEventListener('click', () => f(s, t));
  }),
    c.forEach((s, t) => {
      s.addEventListener('click', () => f(n[t], t));
    });
}
function f(n, c) {
  n.classList.toggle('open-button-clicked');
  const s = document.querySelectorAll('.modal-answer')[c],
    t = n.classList.contains('open-button-clicked');
  (n.src = t ? infoData.buttons[1].closeButton : infoData.buttons[0].openButton),
    (n.alt = t ? infoData.buttons[1].alt : infoData.buttons[0].alt),
    (s.style.display = t ? '' : 'none');
}
const m = screen.width;
async function v() {
  try {
    const n = await fetch('./data/barnkalasEvent.json');
    if (!n.ok) throw new Error('Could not fetch data');
    const c = await n.json(),
      s = document.querySelector('.article-party');
    c.kalas.forEach((t) => {
      const e = document.createElement('div');
      e.classList.add('party-div'), s.append(e);
      const o = document.createElement('img');
      o.classList.add('party-img'), (o.src = t.image), (o.alt = t.imageAlt), e.append(o);
      const r = document.createElement('div');
      r.classList.add('party-styling'), e.append(r);
      const a = document.createElement('h2');
      a.classList.add('party-header'), (a.innerText = t.titel), r.append(a);
      const i = document.createElement('p');
      i.classList.add('party-text'), (i.innerText = t.description), r.append(i);
      const d = document.createElement('ol');
      d.classList.add('party-list'),
        r.append(d),
        t.content.forEach((y) => {
          const p = document.createElement('li');
          p.classList.add('party-listItem'), (p.innerText = y), d.append(p);
        });
      const l = document.createElement('button');
      l.classList.add('party-button'), (l.innerText = t.book), r.append(l);
    });
  } catch (n) {
    console.error(n);
  }
}
async function h() {
  try {
    const n = await fetch('./data/barnkalasContent.json');
    if (!n.ok) throw new Error('Could not fetch data');
    const c = await n.json(),
      s = document.querySelector('.div-hero'),
      t = document.querySelector('.article-kids');
    c.barnkalas.forEach((e) => {
      const o = document.createElement('img');
      o.classList.add('kids-hero'),
        m < 1280 ? (o.src = e.imgHero) : (o.src = e.imgHeroDesktop),
        (o.alt = e.imgAltHero),
        s.append(o);
      const r = document.createElement('img');
      r.classList.add('kids-img'),
        m < 1280 ? (r.src = e.imgTextMobile) : (r.src = e.imgTextDesktop),
        (r.alt = e.imgAltMobile),
        s.append(r);
      const a = document.createElement('div');
      a.classList.add('kids-div'), t.append(a);
      const i = document.createElement('h2');
      i.classList.add('kids-header'),
        m < 1280 ? (i.innerText = e.titelMobile) : (i.innerText = e.titelDesktop),
        a.append(i);
      const d = document.createElement('button');
      d.classList.add('kids-button'), (d.innerText = e.book), (d.type = 'button'), a.append(d);
      const u = document.createElement('h1');
      u.classList.add('kids-mainHeader'),
        m < 1280 ? (u.innerText = e.mainTitelMobile) : (u.style.display = 'none'),
        a.append(u);
      const l = document.createElement('p');
      l.classList.add('kids-text'),
        m < 1280 ? (l.innerText = e.descriptionMobile) : (l.innerText = e.descriptionDesktop),
        a.append(l);
    });
  } catch (n) {
    console.error(n);
  }
}
async function g() {
  v(), h();
}
document.addEventListener('DOMContentLoaded', () => {
  E();
});
const b = document.querySelector('.article-kids');
b && g();
