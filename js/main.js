/* A MAR v2 — movimiento. GSAP + ScrollTrigger + Lenis (vendor/).
   Un solo momento memorable: el logo entra sobre negro y la ola (borde del isotipo) abre la página
   descubriendo el pulpo; el logo queda en su lugar. Sin `pin`: los platos se apilan con position: sticky. */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  html.classList.add('ready');
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) html.classList.add('reduced');
  const reduced = html.classList.contains('reduced');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get(k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };
  const nav = $('#nav'), main = $('#main'), mbar = $('#mbar'), hero = $('.hero');
  let lenis = null;

  /* ---------- al cruzar un quiebre (rotar un iPad) se conserva la sección ---------- */
  const bucket = () => (window.innerWidth <= 700 ? 0 : window.innerWidth <= 1023 ? 1 : 2) + (window.innerWidth > window.innerHeight ? 'h' : 'v');
  const secs = $$('main > section, main > div, .pie');
  let curB = bucket(), anchor = null, recT = 0, frozen = false;
  const takeAnchor = () => {
    recT = 0;
    if (frozen) return;
    const top = window.scrollY;
    const cur = secs.find(s => s.offsetTop + s.offsetHeight > top) || secs[0];
    anchor = { el: cur, f: (top - cur.offsetTop) / Math.max(1, cur.offsetHeight) };
  };
  window.addEventListener('scroll', () => { if (!recT) recT = requestAnimationFrame(takeAnchor); }, { passive: true });
  takeAnchor();
  const restore = () => {
    if (!anchor) return;
    const y = anchor.el.offsetTop + anchor.f * anchor.el.offsetHeight;
    if (lenis) { lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); } else window.scrollTo(0, y);
  };
  let unfreeze = 0;
  window.addEventListener('resize', () => {
    const b = bucket();
    if (b === curB) return;
    curB = b; frozen = true;
    const done = () => { restore(); clearTimeout(unfreeze); unfreeze = setTimeout(() => { frozen = false; takeAnchor(); }, 450); };
    if (window.ScrollTrigger && !html.classList.contains('reduced')) {
      const once = () => { ScrollTrigger.removeEventListener('refresh', once); done(); };
      ScrollTrigger.addEventListener('refresh', once);
    } else requestAnimationFrame(() => requestAnimationFrame(done));
  });

  /* ---------- idioma (español por defecto; inglés solo si el visitante lo elige) ---------- */
  let lang = 'es';
  const titleEl = $('title'), metaDesc = $('meta[name="description"]');
  const swapAttr = (data, attr) => $$('[' + data + ']').forEach(el => {
    const keep = 'es' + attr.replace(/(^|-)(\w)/g, (m, a, b) => b.toUpperCase());
    if (el.dataset[keep] === undefined) el.dataset[keep] = el.getAttribute(attr) || '';
    el.setAttribute(attr, lang === 'en' ? el.getAttribute(data) : el.dataset[keep]);
  });
  function setLang(l) {
    lang = l;
    html.lang = l;
    $$('[data-l]').forEach(el => {
      if (el.dataset.es === undefined) el.dataset.es = el.textContent;
      el.textContent = l === 'en' ? el.dataset.l : el.dataset.es;
    });
    swapAttr('data-alt-en', 'alt');
    swapAttr('data-aria-en', 'aria-label');
    if (titleEl) { if (!titleEl.dataset.es) titleEl.dataset.es = titleEl.textContent; document.title = l === 'en' ? titleEl.dataset.titleEn : titleEl.dataset.es; }
    if (metaDesc) { if (!metaDesc.dataset.es) metaDesc.dataset.es = metaDesc.content; metaDesc.content = l === 'en' ? metaDesc.dataset.metaEn : metaDesc.dataset.es; }
    store.set('amar-lang', l);
    if (hasGsap) ScrollTrigger.refresh();
  }
  $('#lang')?.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));
  if (store.get('amar-lang') === 'en') setLang('en');

  /* salto al contenido: mueve el foco */
  $('.skip')?.addEventListener('click', (e) => { e.preventDefault(); main.scrollIntoView(); main.focus({ preventScroll: true }); });

  /* ---------- la carta: la foto cambia con el cursor, el foco o el toque ---------- */
  const cartaImgs = $$('.carta__img');
  $$('.carta__item').forEach(btn => {
    const show = () => {
      $$('.carta__item').forEach(b => { b.classList.toggle('is-on', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
      cartaImgs.forEach(im => im.classList.toggle('is-on', im.dataset.k === btn.dataset.img));
    };
    btn.addEventListener('mouseenter', show);
    btn.addEventListener('focus', show);
    btn.addEventListener('click', show);
  });

  /* ---------- barra: tono, logo y barra móvil ---------- */
  const light = $$('.carta, .resenas, .visita');
  function navState() {
    const y = window.scrollY, h = hero.offsetHeight;
    nav.classList.toggle('at-top', y < h * 0.6);
    mbar?.classList.toggle('is-on', y > h * 0.6);
    const probe = (nav.offsetHeight || 70) / 2;
    nav.classList.toggle('on-light', light.some(s => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; }));
  }
  let lastY = 0, ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      navState();
      const y = window.scrollY;
      if (introTl && introTl.isActive && y > window.innerHeight * 0.5 && introTl.progress() < 1) introTl.progress(1);
      if (!reduced) {
        if (y > lastY + 6 && y > window.innerHeight) nav.classList.add('is-hidden');
        else if (y < lastY - 6) nav.classList.remove('is-hidden');
      }
      lastY = y;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  navState();

  if (reduced) return;

  /* ====================== con movimiento ====================== */
  gsap.registerPlugin(ScrollTrigger);
  const EO = 'expo.out';
  if (fine && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', (e) => {
      const t = $(a.getAttribute('href'));
      if (!t || a.classList.contains('skip')) return;
      e.preventDefault();
      lenis.scrollTo(t, { duration: 1.4 });
      const h = $('h1, h2', t);
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }));
  }

  /* ---------- portada: logo → ola → pulpo ---------- */
  const tideFill = $('.hero__tide-fill'), tideEdge = $('.hero__tide-edge');
  const heroImg = $('.hero__img'), iso = $('.hero__iso'), isoPath = $('path', iso);
  const brandBits = ['.hero__tag', '.hero__place', '.hero__rating', '.hero__cap'];
  const wave = (level, phase) => {
    // borde ondulado: 1,5 periodos, amplitud 3 (como la ola del medio del isotipo)
    let d = '', pts = [];
    for (let i = 0; i <= 40; i++) {
      const x = 100 - i * 2.5;
      const y = level + 3 * Math.sin((x / 100) * Math.PI * 3 + phase);
      pts.push(x.toFixed(2) + ' ' + y.toFixed(2));
    }
    d = 'M' + pts.join(' L');
    return d;
  };
  const tide = { level: 112, phase: 0 };
  const drawTide = () => {
    const edge = wave(tide.level, tide.phase);
    tideFill.setAttribute('d', 'M0 -2 H100 V' + (tide.level + 3).toFixed(2) + ' ' + edge.replace('M', 'L') + ' L0 -2 Z');
    tideEdge.setAttribute('d', edge);
  };
  drawTide();

  isoPath.setAttribute('pathLength', '1');
  gsap.set(iso, { fill: 'transparent', stroke: '#42c0ef', strokeWidth: 0.8, strokeDasharray: 1, strokeDashoffset: 1 });
  gsap.set(['.hero__a', '.hero__mar'], { yPercent: 40, opacity: 0 });
  gsap.set(brandBits, { opacity: 0, y: 16 });
  gsap.set(heroImg, { scale: 1.14 });
  gsap.set(nav, { opacity: 0 });

  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.race([Promise.allSettled(['400 1em Italiana', 'italic 300 1em Newsreader', '500 1em Jost'].map(f => document.fonts.load(f))), new Promise(r => setTimeout(r, 1200))])
    : Promise.resolve();
  const imgReady = heroImg.complete ? Promise.resolve() : Promise.race([new Promise(r => { heroImg.addEventListener('load', r, { once: true }); heroImg.addEventListener('error', r, { once: true }); }), new Promise(r => setTimeout(r, 3500))]);
  const seen = store.get('amar-intro', true) === '1';

  function intro() {
    store.set('amar-intro', '1', true);
    const k = seen ? 0.45 : 1;
    const tl = gsap.timeline({ defaults: { ease: EO } });
    tl.to(iso, { strokeDashoffset: 0, duration: 1.0 * k, ease: 'power2.inOut' })
      .to(iso, { fill: '#42c0ef', strokeWidth: 0, duration: 0.5 * k }, '-=0.25')
      .to('.hero__a', { yPercent: 0, opacity: 1, duration: 1.1 * k }, 0.25 * k)
      .to('.hero__mar', { yPercent: 0, opacity: 1, duration: 1.1 * k }, 0.33 * k)
      // la ola sube y descubre el plato; el logo no se mueve (espera la foto si aún no llega)
      .addLabel('tide', 1.35 * k)
      .addPause('tide', () => { imgReady.then(() => tl.resume()); })
      .to(tide, { level: -10, phase: Math.PI * 1.2, duration: 1.5 * k, ease: 'power3.inOut', onUpdate: drawTide }, 'tide')
      .fromTo(tideEdge, { opacity: 0 }, { opacity: 1, duration: 0.3 * k, ease: 'none' }, 'tide')
      .to(tideEdge, { opacity: 0, duration: 0.4 * k, ease: 'none' }, `tide+=${1.1 * k}`)
      .to(heroImg, { scale: 1.06, duration: 1.6 * k, ease: 'power3.out' }, 'tide')
      .to(brandBits, { opacity: 1, y: 0, duration: 1 * k, stagger: 0.08 }, `tide+=${0.95 * k}`)
      .to(nav, { opacity: 1, duration: 0.8 * k }, `tide+=${1.1 * k}`)
      .add(() => { $('.hero__tide').style.display = 'none'; gsap.to(heroImg, { scale: 1, duration: 14, ease: 'none' }); });
    return tl;
  }

  /* ---------- estados iniciales del resto ---------- */
  const lineSpans = (root) => $$('.line > span', root);
  $$('h2, .quote__big').forEach(h => { if (!h.closest('.hero')) gsap.set(lineSpans(h), { yPercent: 108 }); });

  let introTl = null;
  fontsReady.then(() => {
    introTl = intro();

    /* titulares y citas grandes por líneas */
    $$('h2, .quote__big').forEach(h => {
      const s = lineSpans(h); if (!s.length) return;
      gsap.to(s, { yPercent: 0, duration: 1.05, ease: EO, stagger: 0.07, scrollTrigger: { trigger: h, start: 'top 86%', toggleActions: 'play none none none' } });
    });
    gsap.from('.quote--open figcaption, .quote--open .notas', { opacity: 0, y: 18, duration: 1, ease: EO, stagger: 0.12, scrollTrigger: { trigger: '.quote--open', start: 'top 60%', toggleActions: 'play none none none' } });

    /* platos: entrada de cada pantalla y apilado (la anterior se hunde) */
    const platos = $$('.plato');
    platos.forEach((p, i) => {
      const fig = $('.plato__fig', p), img = $('img', p);
      const tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 62%', toggleActions: 'play none none none' } });
      if (fig) {
        tl.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' }, 0)
          .fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.6, ease: EO }, 0);
      }
      tl.from($$('.label, .plato__line, .plato__quote, figcaption', p).filter(el => !el.closest('.plato__fig')), { opacity: 0, y: 14, duration: 0.9, ease: EO, stagger: 0.08 }, 0.35);
      const next = platos[i + 1];
      if (next) {
        const shade = document.createElement('div'); shade.className = 'plato__shade'; p.appendChild(shade);
        gsap.timeline({ scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true } })
          .to($('.plato__in', p), { scale: 0.93, yPercent: -3, ease: 'none' }, 0)
          .to(shade, { opacity: 0.7, ease: 'none' }, 0);
      }
    });

    /* murta sour */
    gsap.fromTo('.bleed__media', { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.bleed', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.bleed__txt .label, .bleed__quote', { opacity: 0, y: 16, duration: 1, ease: EO, stagger: 0.1, scrollTrigger: { trigger: '.bleed__txt', start: 'top 85%', toggleActions: 'play none none none' } });

    /* la carta */
    gsap.fromTo('.carta__item', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, ease: EO, stagger: 0.06, clearProps: 'opacity,transform', scrollTrigger: { trigger: '.carta__list', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.fromTo('.carta__fig', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: '.carta__body', start: 'top 75%', toggleActions: 'play none none none' } });

    /* reseñas: la nota sube como un tambor, las estrellas en oro */
    const sn = $('.score__n');
    const fmt = (v) => (lang === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','));
    const sc = { v: 0 };
    let scored = false;
    ScrollTrigger.create({ trigger: '.resenas__head', start: 'top 78%', onEnter: () => {
      if (scored) return; scored = true;
      gsap.to(sc, { v: 5, duration: 1.4, ease: 'power3.out', onUpdate: () => { sn.textContent = fmt(sc.v); }, onComplete: () => { sn.textContent = lang === 'en' ? sn.dataset.l : sn.dataset.es; } });
      gsap.from('.stars--big i', { opacity: 0, scale: 0.4, duration: 0.6, ease: 'back.out(2)', stagger: 0.06, delay: 0.3 });
      gsap.from('.score__meta .label', { opacity: 0, y: 12, duration: 0.9, ease: EO, stagger: 0.1, delay: 0.5 });
    } });
    $$('.rs').forEach(r => gsap.from(r, { opacity: 0, y: 34, duration: 1.1, ease: EO, scrollTrigger: { trigger: r, start: 'top 90%', toggleActions: 'play none none none' } }));
    gsap.from('.prensa', { opacity: 0, y: 24, duration: 1, ease: EO, scrollTrigger: { trigger: '.prensa', start: 'top 92%', toggleActions: 'play none none none' } });

    /* fotos con cortina */
    $$('.reveal').forEach(f => {
      const im = $('img', f);
      gsap.timeline({ scrollTrigger: { trigger: f, start: 'top 84%', toggleActions: 'play none none none' } })
        .to(f, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 0)
        .fromTo(im, { scale: 1.06 }, { scale: 1, duration: 1.7, ease: EO }, 0);
    });
    gsap.from('.casa__quote', { opacity: 0, y: 18, duration: 1, ease: EO, scrollTrigger: { trigger: '.casa__side', start: 'top 85%', toggleActions: 'play none none none' } });
    gsap.from('.reservar__txt > .label, .reservar__cta, .reservar__note', { opacity: 0, y: 18, duration: 1, ease: EO, stagger: 0.1, scrollTrigger: { trigger: '.reservar__txt', start: 'top 80%', toggleActions: 'play none none none' } });
    gsap.from('.visita__cols > div', { opacity: 0, y: 20, duration: 1, ease: EO, stagger: 0.08, scrollTrigger: { trigger: '.visita__cols', start: 'top 88%', toggleActions: 'play none none none' } });

    ScrollTrigger.refresh();
  });
})();
