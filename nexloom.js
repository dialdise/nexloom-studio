/* ============================================================
   NEXLOOM STUDIO — Shared JavaScript
   Auth gate · Lang toggle · Cursor · Scroll animations
   ============================================================ */

const NX = (() => {

  // ── AUTH ────────────────────────────────────────────────────
  const AUTH_KEY  = 'nx_auth';
  const AUTH_PASS = 'nexloom2025';       // change before going live
  const PRIVATE   = ['dashboard.html', 'dashboard'];

  function isPrivatePage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    return PRIVATE.some(p => path.includes(p));
  }
  function isAuthed() {
    return sessionStorage.getItem(AUTH_KEY) === '1';
  }
  function login(pass) {
    if (pass === AUTH_PASS) {
      sessionStorage.setItem(AUTH_KEY, '1');
      return true;
    }
    return false;
  }
  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    location.href = 'login.html';
  }
  function guardPage() {
    if (isPrivatePage() && !isAuthed()) {
      location.href = 'login.html';
    }
  }

  // ── LANGUAGE ─────────────────────────────────────────────────
  let lang = localStorage.getItem('nx_lang') || 'en';

  function setLang(l) {
    lang = l;
    localStorage.setItem('nx_lang', l);
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + l);
      if (!val) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    });
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === l);
    });
    document.documentElement.lang = l;
  }
  function initLang() {
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    setLang(lang);
  }

  // ── CURSOR ───────────────────────────────────────────────────
  function initCursor() {
    const cur = document.getElementById('nx-cursor');
    if (!cur) return;
    document.addEventListener('mousemove', e => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .card, .kpi-card, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hovered'));
    });
  }

  // ── SCROLL ANIMATIONS ────────────────────────────────────────
  function initScrollAnim() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
  }

  // ── SMOOTH SCROLL ────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  // ── TOPBAR DATE ──────────────────────────────────────────────
  function setDate() {
    const el = document.getElementById('nx-date');
    if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // ── ACTIVE NAV ───────────────────────────────────────────────
  function setActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-page]').forEach(el => {
      el.classList.toggle('active', path.includes(el.dataset.page));
    });
  }

  // ── COUNT UP ─────────────────────────────────────────────────
  function countUp(el, target, prefix = '', suffix = '', duration = 1200) {
    if (!el) return;
    let start = 0, step = target / 60;
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
      if (start >= target) clearInterval(timer);
    }, duration / 60);
  }

  // ── SIDEBAR TOGGLE (mobile) ───────────────────────────────────
  function initMobileSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('nx-sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
  }

  // ── FORM CHIPS ───────────────────────────────────────────────
  function initChips() {
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.dataset.group;
        const multi = chip.dataset.multi === 'true';
        if (!multi) {
          document.querySelectorAll(`.chip[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
        }
        chip.classList.toggle('selected');
      });
    });
  }

  // ── INIT ─────────────────────────────────────────────────────
  function init() {
    guardPage();
    initLang();
    initCursor();
    initScrollAnim();
    initSmoothScroll();
    initMobileSidebar();
    initChips();
    setDate();
    setActiveNav();
  }

  return { init, login, logout, setLang, countUp, isAuthed };
})();

document.addEventListener('DOMContentLoaded', NX.init);
