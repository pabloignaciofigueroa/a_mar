/* A MAR — interacción y movimiento.
   GSAP + ScrollTrigger + Lenis (vendor/). Swiper y Leaflet se cargan al acercarse.
   Sin `pin`: los tramos fijos usan position: sticky (ver brand/art-direction.md). */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  const reduced = html.classList.contains('reduced');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduced;
  const EASE = 'expo.out';

  const pre = $('#pre'), nav = $('#nav'), main = $('#main'), pie = $('.pie');
  let lenis = null;

  /* ---------- precarga: la página queda inerte hasta que se retira ---------- */
  const skip = $('.skip');
  const setInert = (on) => [main, pie, nav, skip].forEach(el => { if (el) el.inert = on; });
  if (pre && !reduced) setInert(true);
  const fontsReady = () => {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const faces = ['400 1em Italiana', '400 1em Gelasio', 'italic 400 1em Gelasio'];
    return Promise.allSettled(faces.map(f => document.fonts.load(f)));
  };
  const heroImg = $('.hero__img');
  const imgReady = () => heroImg && !heroImg.complete
    ? new Promise(r => { heroImg.addEventListener('load', r, { once: true }); heroImg.addEventListener('error', r, { once: true }); })
    : Promise.resolve();
  const timeout = (ms) => new Promise(r => setTimeout(r, ms));
  const minShow = timeout(reduced ? 0 : 1100);
  const ready = Promise.race([Promise.all([fontsReady(), imgReady(), minShow]), timeout(3200)]);

  /* ---------- idioma (español por defecto; inglés solo si el visitante lo elige) ---------- */
  let lang = 'es';
  const metaDesc = $('meta[name="description"]');
  const titleEl = $('title');
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } } };
  const swapAttr = (sel, data, attr) => $$(sel).forEach(el => {
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
    swapAttr('[data-alt-en]', 'data-alt-en', 'alt');
    swapAttr('[data-aria-en]', 'data-aria-en', 'aria-label');
    if (titleEl) { if (!titleEl.dataset.es) titleEl.dataset.es = titleEl.textContent; document.title = l === 'en' ? titleEl.dataset.titleEn : titleEl.dataset.es; }
    if (metaDesc) { if (!metaDesc.dataset.es) metaDesc.dataset.es = metaDesc.content; metaDesc.content = l === 'en' ? metaDesc.dataset.metaEn : metaDesc.dataset.es; }
    store.set('amar-lang', l);
    estado();
    if (swiper) buildSwiper();
    if (hasGsap) ScrollTrigger.refresh();
  }
  $('#lang')?.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es'));

  /* ---------- estado en vivo (horario de su lámina, hora de Chile) ---------- */
  const HOURS = { 0: [[780, 1020]], 1: [], 2: [[780, 990], [1110, 1320]], 3: [[780, 990], [1110, 1320]], 4: [[780, 990], [1110, 1320]], 5: [[780, 990], [1110, 1320]], 6: [[780, 990], [1110, 1320]] };
  const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function estado() {
    const el = $('#estado');
    if (!el) return;
    let d, m;
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      const get = t => parts.find(p => p.type === t).value;
      d = DAYS[get('weekday')]; m = (+get('hour')) * 60 + (+get('minute'));
    } catch (e) { el.textContent = ''; return; }
    const open = HOURS[d].some(([a, b]) => m >= a && m < b);
    el.classList.toggle('is-open', open);
    const txt = open ? (lang === 'en' ? 'Open now' : 'Abierto ahora') : (lang === 'en' ? 'Closed now' : 'Cerrado ahora');
    if (el.textContent !== txt) el.textContent = txt;
    $$('.lamina__dl [data-days]').forEach(row => row.classList.toggle('is-today', row.dataset.days.split(',').includes(String(d))));
  }
  estado();
  setInterval(estado, 60000);

  /* ---------- Lenis ---------- */
  if (motion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToEl = (el) => {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4, easing: t => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  /* salto al contenido: mueve el foco */
  $('.skip')?.addEventListener('click', (e) => { e.preventDefault(); scrollToEl(main); main.focus({ preventScroll: true }); });

  /* ---------- menú: dialog con foco atrapado y página inert ---------- */
  const menu = $('#menu'), menuBtn = $('#menuBtn'), menuClose = $('#menuClose'), menuImg = $('.menu__img');
  let menuOpen = false;
  const focusables = () => $$('a[href],button:not([disabled])', menu);
  function openMenu() {
    if (menuOpen) return;
    menuOpen = true;
    menu.hidden = false;
    setInert(true);
    menuBtn.setAttribute('aria-expanded', 'true');
    lenis?.stop();
    if (motion) {
      const links = $$('.menu__nav a', menu);
      gsap.killTweensOf([menu, links, menuImg]);
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(links, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.05, delay: 0.35 });
      gsap.fromTo(menuImg, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: EASE, delay: 0.2 });
    }
    menuClose.focus();
  }
  function closeMenu(after) {
    if (!menuOpen) return;
    menuOpen = false;
    menuBtn.setAttribute('aria-expanded', 'false');
    const done = () => {
      menu.hidden = true;
      setInert(false);
      lenis?.start();
      if (after) after(); else menuBtn.focus();
    };
    if (motion) {
      gsap.killTweensOf([menu, ...$$('.menu__nav a', menu), menuImg]);
      gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut', onComplete: done });
    } else done();
  }
  menuBtn?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', () => closeMenu());
  menu?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $$('.menu__nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = $(a.getAttribute('href'));
      closeMenu(() => {
        scrollToEl(target);
        const h = target && $('h2', target);
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      });
    });
    const swap = () => {
      if (!menuImg || menuImg.getAttribute('src') === a.dataset.img) return;
      if (motion) {
        gsap.killTweensOf(menuImg);
        gsap.to(menuImg, { opacity: 0, duration: 0.25, ease: 'power2.out', onComplete: () => { menuImg.src = a.dataset.img; gsap.fromTo(menuImg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.9, ease: EASE }); } });
      } else menuImg.src = a.dataset.img;
    };
    a.addEventListener('mouseenter', swap);
    a.addEventListener('focus', swap);
  });
  /* precarga de las imágenes del menú (pequeñas) */
  setTimeout(() => $$('.menu__nav a').forEach(a => { const i = new Image(); i.src = a.dataset.img; }), 4000);

  /* ---------- botones magnéticos ---------- */
  if (motion && fine.matches) {
    $$('.magnet').forEach(el => {
      const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
      const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.25); qy((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
  }

  /* ---------- reseñas: Swiper diferido ---------- */
  let swiper = null, swiperLoading = null;
  const loadSwiper = () => swiperLoading || (swiperLoading = new Promise((res, rej) => {
    if (window.Swiper) return res();
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'vendor/swiper/swiper-bundle.min.css'; document.head.appendChild(css);
    const s = document.createElement('script'); s.src = 'vendor/swiper/swiper-bundle.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  }));
  const pad = n => String(n).padStart(2, '0');
  /* si el botón con foco queda deshabilitado, el foco pasa al contrario (no se pierde en <body>) */
  let ctrlTs = 0;
  $('.resenas__ctrl')?.addEventListener('focusin', () => { ctrlTs = Date.now(); });
  $('.resenas__ctrl')?.addEventListener('click', () => { ctrlTs = Date.now(); });
  const keepFocus = (from, to) => requestAnimationFrame(() => {
    const a = $(from), b = $(to), act = document.activeElement;
    if (!a || !b || Date.now() - ctrlTs > 2000) return;
    if ((act === a || act === document.body) && (a.disabled || a.getAttribute('aria-disabled') === 'true')) b.focus({ preventScroll: true });
  });
  function buildSwiper() {
    const el = $('#resenasSlider');
    if (!el || !window.Swiper) return;
    let at = 0;
    if (swiper) { at = swiper.realIndex; swiper.destroy(true, true); }
    const en = lang === 'en';
    swiper = new Swiper(el, {
      slidesPerView: 'auto', speed: reduced ? 0 : 900, grabCursor: false, initialSlide: at,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: { prevEl: '.resenas__prev', nextEl: '.resenas__next' },
      a11y: {
        enabled: true,
        prevSlideMessage: en ? 'Previous review' : 'Reseña anterior',
        nextSlideMessage: en ? 'Next review' : 'Reseña siguiente',
        firstSlideMessage: en ? 'This is the first review' : 'Esta es la primera reseña',
        lastSlideMessage: en ? 'This is the last review' : 'Esta es la última reseña',
        paginationBulletMessage: en ? 'Go to review {{index}}' : 'Ir a la reseña {{index}}',
        slideLabelMessage: en ? '{{index}} of {{slidesLength}}' : '{{index}} de {{slidesLength}}',
        containerRoleDescriptionMessage: en ? 'carousel' : 'carrusel',
        itemRoleDescriptionMessage: en ? 'review' : 'reseña'
      },
      on: {
        slideChange(s) { $('#rsNow').textContent = pad(s.isEnd ? s.slides.length : s.realIndex + 1); },
        reachEnd(s) { $('#rsNow').textContent = pad(s.slides.length); keepFocus('.resenas__next', '.resenas__prev'); },
        reachBeginning() { keepFocus('.resenas__prev', '.resenas__next'); }
      }
    });
    $('#rsAll').textContent = pad(swiper.slides.length);
    $('#rsNow').textContent = pad(swiper.realIndex + 1);
  }
  const slider = $('#resenasSlider');
  if (slider) {
    const io = new IntersectionObserver((ents) => {
      if (!ents.some(e => e.isIntersecting)) return;
      io.disconnect();
      loadSwiper().then(buildSwiper).catch(() => slider.classList.add('no-swiper'));
    }, { rootMargin: '600px 0px' });
    io.observe(slider);
  }
  /* etiqueta "Arrastrar" (el cursor nativo sigue visible) */
  const drag = $('.drag');
  if (drag && slider && fine.matches && !reduced && hasGsap) {
    const dx = gsap.quickTo(drag, 'x', { duration: 0.5, ease: 'power3.out' });
    const dy = gsap.quickTo(drag, 'y', { duration: 0.5, ease: 'power3.out' });
    const wrap = $('.swiper-wrapper', slider);
    wrap.addEventListener('pointerenter', (e) => { gsap.set(drag, { x: e.clientX, y: e.clientY }); drag.classList.add('is-on'); });
    wrap.addEventListener('pointermove', (e) => { dx(e.clientX); dy(e.clientY); });
    wrap.addEventListener('pointerleave', () => drag.classList.remove('is-on'));
    wrap.addEventListener('pointerdown', () => gsap.to(drag, { scale: 0.86, duration: 0.3, ease: 'power3.out' }));
    window.addEventListener('pointerup', () => gsap.to(drag, { scale: 1, duration: 0.5, ease: EASE }));
  }

  /* ---------- mapa: Leaflet diferido, con plano dibujado de respaldo ---------- */
  const mapa = $('#mapa');
  if (mapa) {
    const io = new IntersectionObserver((ents) => {
      if (!ents.some(e => e.isIntersecting)) return;
      io.disconnect();
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'vendor/leaflet/leaflet.css'; document.head.appendChild(css);
      const s = document.createElement('script'); s.src = 'vendor/leaflet/leaflet.js';
      s.onload = () => {
        const box = document.createElement('div'); box.className = 'mapa__live'; box.style.cssText = 'position:absolute;inset:0;opacity:0;transition:opacity .8s';
        box.inert = true;
        mapa.appendChild(box);
        const P = [-42.4805899, -73.7720604];
        const map = L.map(box, { scrollWheelZoom: false, zoomControl: false, attributionControl: true, keyboard: false }).setView(P, 16);
        let loaded = 0;
        map.attributionControl.setPrefix(false);
        setTimeout(() => { if (!loaded) { map.remove(); box.remove(); } }, 5000);
        const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© OpenStreetMap · © CARTO' });
        tiles.on('tileload', () => { if (++loaded === 1) { box.style.opacity = '1'; box.inert = false; } });
        tiles.addTo(map);
        const isoSvg = $('.lamina__iso');
        const icon = L.divIcon({ className: '', iconSize: [46, 46], iconAnchor: [23, 23], html: '<span class="pin">' + (isoSvg ? isoSvg.outerHTML.replace('lamina__iso', '') : '') + '</span>' });
        L.marker(P, { icon, keyboard: false, interactive: false }).addTo(map);
        map.getContainer().setAttribute('aria-hidden', 'true');
      };
      document.head.appendChild(s);
    }, { rootMargin: '500px 0px' });
    io.observe(mapa);
  }

  /* ---------- cinta: velocidad base + empuje del scroll ---------- */
  const cinta = $('.cinta__track');
  if (cinta) {
    const kids = [...cinta.children];
    for (let i = 0; i < 2; i++) kids.forEach(k => cinta.appendChild(k.cloneNode(true)));
  }

  /* respaldo común (sin GSAP o sin movimiento): conservar la sección al cruzar 900 px */
  const secsAll = $$('main > section, main > div, .pie');
  const anchorNow = () => { const top = window.scrollY; const cur = secsAll.find(x => x.offsetTop + x.offsetHeight > top) || secsAll[0]; return { el: cur, f: (top - cur.offsetTop) / Math.max(1, cur.offsetHeight) }; };
  const plainKeep = () => {
    let last = anchorNow(), t = 0;
    window.addEventListener('scroll', () => { if (!t) t = requestAnimationFrame(() => { t = 0; last = anchorNow(); }); }, { passive: true });
    window.matchMedia('(min-width: 900px)').addEventListener('change', () => requestAnimationFrame(() => window.scrollTo(0, last.el.offsetTop + last.f * last.el.offsetHeight)));
  };
  if (!hasGsap) {
    html.classList.add('reduced'); pre?.remove(); setInert(false); plainKeep();
    if (store.get('amar-lang') === 'en') setLang('en');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* sin movimiento: todo visible, nada se anima */
  if (!motion) {
    pre?.remove(); setInert(false); plainKeep();
    const saved = store.get('amar-lang'); if (saved === 'en') setLang('en');
    return;
  }

  /* ---------- estados iniciales (antes de mostrar nada) ---------- */
  const lineSpans = (root) => $$('.line > span', root);
  gsap.set(lineSpans(document).filter(s => !s.closest('.hero__claim')), { yPercent: 115 });
  gsap.set(lineSpans($('.hero__claim')), { yPercent: 115 });
  gsap.set('.hero__claim', { visibility: 'visible' });
  gsap.set(['.hero__a', '.hero__mar'], { yPercent: 60, opacity: 0 });
  gsap.set('.hero__iso', { scale: 0.4, rotate: -12, opacity: 0, transformOrigin: '50% 50%' });
  gsap.set(['.hero__kicker', '.hero__tag', '.hero__foot', '.hero__cue'], { opacity: 0, y: 18 });

  /* ---------- portada: entrada ---------- */
  function intro() {
    const tl = gsap.timeline({ defaults: { ease: EASE }, onInterrupt: () => { introDone = true; } });
    if (pre) tl.to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut', onComplete: () => { pre.remove(); setInert(false); } });
    else setInert(false);
    tl.to('.hero__iso', { scale: 1, rotate: 0, opacity: 1, duration: 1.4 }, pre ? '-=0.55' : 0)
      .to('.hero__a', { yPercent: 0, opacity: 1, duration: 1.3 }, '<0.1')
      .to('.hero__mar', { yPercent: 0, opacity: 1, duration: 1.3 }, '<0.08')
      .to('.hero__kicker', { opacity: 0.85, y: 0, duration: 1 }, '<0.3')
      .to('.hero__tag', { opacity: 1, y: 0, duration: 1.1 }, '<0.08')
      .to(['.hero__foot', '.hero__cue'], { opacity: (i) => i ? 0.7 : 0.82, y: 0, duration: 1, stagger: 0.08 }, '<0.15');
    return tl;
  }

  /* ---------- momento memorable: la ola se vuelve ventana ---------- */
  const hero = $('.hero'), sticky = $('.hero__sticky'), photo = $('.hero__photo'), iso = $('.hero__iso');
  const vb = iso.viewBox.baseVal, RATIO = vb.height / vb.width;
  /* copia sin máscara que se funde al final: la ventana termina de abrirse sin saltos */
  const full = photo.cloneNode(true);
  full.classList.add('hero__full');
  $('img', full).removeAttribute('fetchpriority');
  photo.after(full);
  const heroImgs = [heroImg, $('img', full)];
  const OX = 0.70, OY = 0.585; // punto dentro de la ola del medio
  let geo = null;
  function measure() {
    const r = iso.parentElement.getBoundingClientRect(), s = sticky.getBoundingClientRect();
    const w = r.width, h = w * RATIO;
    geo = { x: r.left - s.left, y: r.top - s.top, w, h, vw: s.width, vh: s.height };
    const ox = geo.x + OX * w, oy = geo.y + OY * h;
    // la franja del medio mide ≈ 0,16 h de alto y se extiende 0,3 w a la derecha del punto
    const kY = (Math.max(oy, geo.vh - oy) * 2.4) / (0.16 * h);
    const kX = (Math.max(geo.vw - ox, ox) * 1.25) / (0.3 * w);
    geo.K = Math.max(kY, kX, 8) * 1.6;
  }
  const claimTl = gsap.timeline({ paused: true }).to(lineSpans($('.hero__claim')), { yPercent: 0, duration: 1.2, ease: EASE, stagger: 0.1 });
  let claimOn = false;
  const clamp01 = v => Math.min(1, Math.max(0, v));
  const map = (p, a, b) => clamp01((p - a) / (b - a));
  let introTl = null, introDone = false;
  const nA = $('.hero__a'), nM = $('.hero__mar'), nTop = $$('.hero__kicker, .hero__tag'), nFoot = $$('.hero__foot, .hero__cue');
  function apply(p) {
    if (!geo) measure();
    const { x, y, w, h, vw, K } = geo;
    const a = map(p, 0.02, 0.16);
    const g = gsap.parseEase('power3.in')(map(p, 0.04, 0.8));
    const s = 1 + (K - 1) * g;
    const W = w * s, H = h * s;
    const px = x + OX * w - OX * W, py = y + OY * h - OY * H;
    photo.style.opacity = a;
    photo.style.webkitMaskSize = photo.style.maskSize = `${W}px ${H}px`;
    photo.style.webkitMaskPosition = photo.style.maskPosition = `${px}px ${py}px`;
    full.style.opacity = map(p, 0.6, 0.82);
    photo.style.setProperty('--shade', map(p, 0.72, 0.95));
    full.style.setProperty('--shade', map(p, 0.72, 0.95));
    const sc = `scale(${1.32 - 0.32 * map(p, 0.04, 1)})`;
    heroImgs.forEach(im => { im.style.transform = sc; });
    iso.style.opacity = 1 - a;
    const o = map(p, 0.03, 0.4);
    const ex = gsap.parseEase('power2.in')(o);
    if (!introDone && p >= 0.01 && introTl) { introTl.progress(1); introDone = true; }
    if (!introDone && p < 0.01) { /* la entrada manda */ }
    else {
      gsap.set(nA, { x: -vw * 0.32 * ex, opacity: 1 - map(p, 0.12, 0.42), yPercent: 0 });
      gsap.set(nM, { x: vw * 0.32 * ex, opacity: 1 - map(p, 0.12, 0.42), yPercent: 0 });
      const f = 1 - map(p, 0.01, 0.12);
      gsap.set(nTop, { opacity: f, y: -30 * (1 - f) });
      gsap.set(nFoot, { opacity: f * 0.8, y: 0 });
    }
    const want = p > 0.8;
    if (want !== claimOn) { claimOn = want; want ? claimTl.play() : claimTl.reverse(); }
  }
  let heroST = null;

  /* ---------- reconstrucción al cruzar el quiebre (rotar un iPad): se conserva la sección ---------- */
  let wide = window.innerWidth >= 900, anchor = null, lastAnchor = null, rec = 0;
  const secs = $$('main > section, main > div, .pie');
  const recordAnchor = () => {
    rec = 0;
    const top = window.scrollY;
    const cur = secs.find(s => s.offsetTop + s.offsetHeight > top) || secs[0];
    lastAnchor = { el: cur, f: (top - cur.offsetTop) / Math.max(1, cur.offsetHeight) };
  };
  window.addEventListener('scroll', () => { if (!rec) rec = requestAnimationFrame(recordAnchor); }, { passive: true });
  ScrollTrigger.addEventListener('refreshInit', () => {
    const nowWide = window.innerWidth >= 900;
    if (nowWide !== wide) { anchor = lastAnchor; wide = nowWide; }
    frescosSize();
  });
  ScrollTrigger.addEventListener('refresh', () => {
    geo = null;
    if (heroST) apply(heroST.progress);
    if (anchor) {
      const y = anchor.el.offsetTop + anchor.f * anchor.el.offsetHeight; anchor = null;
      if (lenis) { lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); } else window.scrollTo(0, y);
    }
  });

  /* ---------- siempre frescos: galería horizontal con sticky (sin pin) ---------- */
  const fr = $('.frescos'), frRow = $('.frescos__row'), frSticky = $('.frescos__sticky');
  let frDist = 0;
  function frescosSize() {
    if (!fr) return;
    frDist = Math.max(0, frRow.scrollWidth - frSticky.clientWidth);
    fr.style.height = (frDist + frSticky.offsetHeight) + 'px';
  }
  frescosSize();

  /* ---------- arranque ---------- */
  ready.then(() => {
    const saved = store.get('amar-lang'); if (saved === 'en') setLang('en');
    introTl = intro();
    introTl.eventCallback('onComplete', () => { introDone = true; });
    if (introTl.progress() === 1) introDone = true;

    heroST = ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => apply(s.progress), onRefresh: s => { geo = null; apply(s.progress); } });

    gsap.to(frRow, { x: () => -frDist, ease: 'none', scrollTrigger: { trigger: fr, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true, onUpdate: s => gsap.set('.frescos__bar i', { scaleX: s.progress }) } });
    frRow.addEventListener('focusin', (e) => {
      const d = e.target.closest('.dish'); if (!d) return;
      const y = fr.offsetTop + Math.min(frDist, Math.max(0, d.offsetLeft - 40));
      lenis ? lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
    });
    gsap.to($$('.dish__img'), { scale: 1, duration: 1.6, ease: EASE, stagger: 0.08, scrollTrigger: { trigger: fr, start: 'top 60%', once: true } });

    /* titulares por líneas */
    $$('h2').forEach(h => {
      const spans = lineSpans(h);
      if (!spans.length || h.closest('.hero')) return;
      gsap.to(spans, { yPercent: 0, duration: 1.25, ease: EASE, stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
    });

    /* fotos con cortina */
    $$('.reveal-img').forEach(el => {
      const im = $('img', el);
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
      tl.to(el, { clipPath: 'inset(0% 0% 0% 0% round 2px)', duration: 1.4, ease: 'expo.inOut' });
      if (im) tl.from(im, { scale: 1.18, duration: 1.8, ease: EASE }, 0);
    });

    /* masas a distinta velocidad */
    $$('[data-speed]').forEach(el => {
      const sp = parseFloat(el.dataset.speed) || 1;
      gsap.fromTo(el, { y: () => (sp - 1) * 220 }, { y: () => (1 - sp) * 220, ease: 'none', scrollTrigger: { trigger: '.casa', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    });
    gsap.fromTo('.casa__img', { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.casa__big', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from(['.casa__list', '.casa__facts'], { opacity: 0, y: 30, duration: 1.2, ease: EASE, stagger: 0.12, scrollTrigger: { trigger: '.casa__list', start: 'top 90%', once: true } });

    /* fotos a sangre: parallax del medio (inset negativo) */
    $$('.bleed').forEach(b => gsap.fromTo($('.bleed__media', b), { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } }));
    gsap.from(['.reservar__k', '.reservar__cta'], { opacity: 0, y: 24, duration: 1.2, ease: EASE, stagger: 0.2, scrollTrigger: { trigger: '.reservar__in', start: 'top 80%', once: true } });

    /* la apertura: la ola se dibuja con el scroll */
    gsap.fromTo('.apertura__wave path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.apertura__body', start: 'top 70%', end: 'bottom 70%', scrub: true } });
    $$('.hito').forEach(h => {
      const fig = $('.hito__fig', h);
      const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top 80%', once: true } });
      tl.from([$('time', h), $('.hito__p', h)], { opacity: 0, y: 26, duration: 1.1, ease: EASE, stagger: 0.1 });
      if (fig) {
        tl.fromTo(fig, { clipPath: 'inset(14% 10% 14% 10% round 2px)' }, { clipPath: 'inset(0% 0% 0% 0% round 2px)', duration: 1.4, ease: 'expo.inOut' }, 0)
          .from($('img', fig), { scale: 1.2, duration: 1.8, ease: EASE }, 0);
      }
    });

    /* reseñas y horario */
    gsap.from('.notas li', { opacity: 0, y: 24, duration: 1.1, ease: EASE, stagger: 0.12, scrollTrigger: { trigger: '.notas', start: 'top 90%', once: true } });
    gsap.from('.rs', { opacity: 0, x: 60, duration: 1.3, ease: EASE, stagger: 0.08, scrollTrigger: { trigger: '.resenas__slider', start: 'top 85%', once: true } });
    gsap.from('.prensa', { opacity: 0, y: 30, duration: 1.2, ease: EASE, scrollTrigger: { trigger: '.prensa', start: 'top 90%', once: true } });
    gsap.from($$('.lamina > *, .lamina__dl > *'), { opacity: 0, y: 22, duration: 1.1, ease: EASE, stagger: 0.06, scrollTrigger: { trigger: '.lamina', start: 'top 80%', once: true } });
    gsap.from(['.visita__addr', '.visita__links'], { opacity: 0, y: 24, duration: 1.1, ease: EASE, stagger: 0.12, scrollTrigger: { trigger: '.visita', start: 'top 70%', once: true } });
    gsap.fromTo('.mapa', { clipPath: 'inset(10% 8% 10% 8% round 2px)' }, { clipPath: 'inset(0% 0% 0% 0% round 2px)', duration: 1.5, ease: 'expo.inOut', scrollTrigger: { trigger: '.mapa', start: 'top 85%', once: true } });
    gsap.from(['.pie__logo', '.pie__tag', '.pie__cols'], { opacity: 0, y: 30, duration: 1.2, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.pie', start: 'top 85%', once: true } });

    /* cinta */
    if (cinta) {
      let x = 0, dir = 1, half = cinta.scrollWidth / 3, visible = false;
      ScrollTrigger.addEventListener('refresh', () => { half = cinta.scrollWidth / 3; });
      new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(cinta.parentElement);
      gsap.ticker.add((t, dt) => {
        if (!visible || !half) return;
        const v = lenis ? lenis.velocity : 0;
        if (v > 0.2) dir = 1; else if (v < -0.2) dir = -1;
        x -= (0.05 + Math.min(Math.abs(v) * 0.04, 0.9)) * dir * Math.min(dt, 100);
        x = -((((-x) % half) + half) % half);
        cinta.style.transform = `translate3d(${x}px,0,0)`;
      });
    }

    /* barra: tono según la sección y se esconde al bajar */
    $$('[data-theme]').forEach(sec => ScrollTrigger.create({ trigger: sec, start: 'top 38px', end: 'bottom 38px', onToggle: st => { if (st.isActive) nav.classList.toggle('on-light', sec.dataset.theme === 'light'); } }));
    let lastY = 0;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => {
      const y = s.scroll();
      const down = y > lastY + 4, up = y < lastY - 4;
      if (down && y > window.innerHeight * 0.9 && !menuOpen) nav.classList.add('is-hidden');
      else if (up || y < 80) nav.classList.remove('is-hidden');
      lastY = y;
    } });
    nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

    ScrollTrigger.refresh();
  });
})();
