(function () {
  'use strict';

  function init() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    function closeMenu() {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-label', 'Open menu');
      }
    }
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('is-open');
        toggle.setAttribute('aria-label', nav.classList.contains('is-open') ? 'Close menu' : 'Open menu');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a[href^="#"]') && nav.classList.contains('is-open')) {
          requestAnimationFrame(function () { closeMenu(); });
        }
      });
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
