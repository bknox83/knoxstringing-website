(function () {
  'use strict';

  function init() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

    function closeMenu() {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (toggle) {
          toggle.setAttribute('aria-label', 'Open menu');
          toggle.focus();
        }
      }
    }

    function getMenuFocusables() {
      var list = [];
      if (toggle) list.push(toggle);
      for (var i = 0; i < navLinks.length; i++) list.push(navLinks[i]);
      return list;
    }

    function handleMenuKeydown(e) {
      if (!nav || !nav.classList.contains('is-open')) return;
      var focusables = getMenuFocusables();
      if (focusables.length === 0) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key !== 'Tab') return;
      var current = document.activeElement;
      var idx = focusables.indexOf(current);
      if (idx === -1) return;

      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        }
      } else {
        if (idx === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var opening = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open');
        toggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'Close menu' : 'Open menu');
        if (opening && navLinks.length > 0) {
          requestAnimationFrame(function () { navLinks[0].focus(); });
        }
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a[href^="#"]') && nav.classList.contains('is-open')) {
          requestAnimationFrame(function () { closeMenu(); });
        }
      });
      document.addEventListener('keydown', handleMenuKeydown);
      window.addEventListener('hashchange', function () {
        closeMenu();
      });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Scroll reveal: fade/slide elements in when they enter the viewport
    var revealSelectors = [
      '.section .section-title',
      '.services-grid .service-card',
      '.content-block',
      '.content-list-full-bleed',
      '.process-inner',
      '.contact-service-area',
      '.contact-block'
    ];
    var revealEls = [];
    revealSelectors.forEach(function (sel) {
      var list = document.querySelectorAll(sel);
      for (var i = 0; i < list.length; i++) revealEls.push(list[i]);
    });
    revealEls.forEach(function (el) {
      if (el) el.classList.add('scroll-reveal');
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });
    revealEls.forEach(function (el) {
      if (el) observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
