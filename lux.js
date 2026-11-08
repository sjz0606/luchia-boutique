/* LUCHIA v2 motion layer: intro, smooth scroll, reveals, pinned lookbook, parallax, cursor. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = () => matchMedia('(min-width: 60.01rem)').matches;
  const hero = $('.hero');
  let ticking = false;

  /* intro curtain, once per session */
  const intro = $('[data-intro]');
  const seen = sessionStorage.getItem('luchia.intro');
  const startHero = () => hero.classList.add('is-in');
  if (!intro || reduce || seen) { intro?.classList.add('is-gone'); requestAnimationFrame(startHero); }
  else {
    sessionStorage.setItem('luchia.intro', '1');
    setTimeout(() => { intro.classList.add('is-out'); setTimeout(startHero, 250); }, 1700);
    intro.addEventListener('transitionend', () => intro.classList.add('is-gone'), { once: true });
  }

  /* smooth scroll */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const id = a.getAttribute('href'); if (id.length < 2) return; const el = $(id); if (!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: id === '#top' ? 0 : -60, duration: 1.6 }); }));
  }

  /* nav: transparent over dark hero, solid after, hides on scroll down */
  const nav = $('[data-nav]'); let lastY = 0;
  const darkZones = () => $$('.hero, .reviews, .visit, .foot, .marquee');
  function onScroll() {
    const y = scrollY; const h = nav.offsetHeight;
    const overDark = darkZones().some((z) => { const r = z.getBoundingClientRect(); return r.top <= h / 2 && r.bottom >= h / 2; });
    nav.classList.toggle('is-solid', !overDark);
    nav.classList.toggle('is-hidden', y > lastY && y > innerHeight * 0.9 && !document.querySelector('dialog[open]'));
    lastY = y;
    frame();
  }

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
  $$('[data-reveal], [data-reveal-img]').forEach((el) => io.observe(el));

  /* manifesto: words light up as you read */
  function split() {
    $$('[data-split]').forEach((el) => {
      const text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.innerHTML = text.split(/\s+/).map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    });
    frame();
  }
  split();
  document.addEventListener('luchia:lang', () => { split(); });

  /* lookbook pin */
  const lb = $('[data-lookbook]'); const track = $('[data-lb-track]'); const count = $('[data-lb-count]');
  function sizeLookbook() {
    if (!desktop() || reduce) { lb.style.height = ''; track.style.transform = ''; return; }
    const dist = track.scrollWidth - innerWidth;
    lb.style.height = `${dist + innerHeight}px`;
  }

  /* one rAF-throttled frame for scroll-linked work */
  function frame() { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; paint(); }); }
  const items = $$('.lb-item', track);
  function paint() {
    const vh = innerHeight;
    // manifesto words
    $$('[data-split]').forEach((el) => {
      const r = el.getBoundingClientRect(); const ws = $$('.w', el);
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = reduce ? ws.length : Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle('on', i < n));
    });
    if (reduce) return;
    // hero arches parallax
    const hy = Math.min(scrollY, vh);
    $$('[data-depth]').forEach((el) => { el.style.transform = `translate3d(0, ${hy * parseFloat(el.dataset.depth)}px, 0)`; });
    // visit bg parallax
    $$('[data-parallax]').forEach((el) => { const r = el.parentElement.getBoundingClientRect(); el.style.transform = `translate3d(0, ${(r.top - vh) * 0.12}px, 0)`; });
    // lookbook
    if (desktop()) {
      const r = lb.getBoundingClientRect(); const dist = track.scrollWidth - innerWidth;
      const p = Math.min(1, Math.max(0, -r.top / (lb.offsetHeight - vh)));
      track.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
      let k = 0; items.forEach((it, i) => { if (it.getBoundingClientRect().left < innerWidth * 0.6) k = i; });
      count.textContent = String(k + 1).padStart(2, '0');
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { sizeLookbook(); frame(); });
  addEventListener('load', () => { sizeLookbook(); frame(); });
  sizeLookbook(); onScroll();

  /* sticky bar steps aside over the footer */
  const bar = $('[data-bar]'); const foot = $('.foot');
  if (bar && foot) new IntersectionObserver(([e]) => bar.classList.toggle('is-off', e.isIntersecting)).observe(foot);

  /* marquee pauses off screen */
  const mq = $('[data-marquee]');
  if (mq) new IntersectionObserver(([e]) => { mq.style.animationPlayState = e.isIntersecting ? 'running' : 'paused'; }).observe(mq);

  /* cursor label over pictures */
  const cur = $('[data-cursor]');
  if (fine && !reduce && cur) {
    let x = -200, y = -200, cx = -200, cy = -200, on = false;
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; const t = e.target.closest('.lb-item, .reel, .look__main, .season__main, .arch--main'); if (!!t !== on) { on = !!t; cur.classList.toggle('is-on', on); } }, { passive: true });
    const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; cur.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${on ? 1 : 0.4})`; requestAnimationFrame(loop); };
    loop();
  }

  /* strip name tooltip */
  const tip = document.createElement('div'); tip.className = 'strip-tip'; tip.setAttribute('aria-hidden', 'true'); document.body.appendChild(tip);
  const strips = $('[data-strips]');
  const showTip = (s) => { if (!s) { tip.classList.remove('is-on'); return; } tip.textContent = s.getAttribute('aria-label'); const r = s.getBoundingClientRect(); tip.style.left = `${r.left + r.width / 2 - tip.offsetWidth / 2}px`; tip.style.top = `${r.top - 40}px`; tip.classList.add('is-on'); };
  strips.addEventListener('pointerover', (e) => showTip(e.target.closest('.strip')));
  strips.addEventListener('pointerleave', () => showTip(null));
  strips.addEventListener('focusin', (e) => showTip(e.target.closest('.strip')));
  strips.addEventListener('focusout', () => showTip(null));
  addEventListener('scroll', () => tip.classList.remove('is-on'), { passive: true });
})();
