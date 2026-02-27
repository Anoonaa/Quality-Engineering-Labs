// Shared app.js - handles auth state display in navbar across all pages
// MerchantHub - Inspired by MerchantHub (merchanthub.example)

(function () {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Auth state display in navbar
  function updateNavAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const usernameEl = document.getElementById('nav-username');
    const logoutBtn = document.getElementById('nav-logout');

    if (token && user && usernameEl && logoutBtn) {
      usernameEl.textContent = 'Merchant: ' + user;
      logoutBtn.style.display = 'inline-flex';
    }
  }

  // Logout handler
  const logoutBtn = document.getElementById('nav-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('loginTime');
      sessionStorage.removeItem('sessionId');
      document.cookie = 'rememberMe=; path=/; max-age=0';
      window.location.href = 'login.html';
    });
  }

  updateNavAuth();

  // --- Dark Mode Toggle ---
  function initDarkMode() {
    var saved = localStorage.getItem('mhub_theme');
    var theme;
    if (saved === 'dark' || saved === 'light') {
      theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  }

  initDarkMode();

  window.toggleDarkMode = function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mhub_theme', next);
  };

  // --- Toast Notification System ---
  function getToastContainer() {
    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    var container = getToastContainer();

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    var msg = document.createElement('span');
    msg.textContent = message;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '\u00d7';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', function () {
      removeToast(toast);
    });

    toast.appendChild(msg);
    toast.appendChild(closeBtn);
    container.appendChild(toast);

    var autoRemoveTimer = setTimeout(function () {
      removeToast(toast);
    }, duration);

    function removeToast(el) {
      clearTimeout(autoRemoveTimer);
      el.classList.add('toast-exit');
      setTimeout(function () {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 300);
    }
  };

  // --- Mobile Hamburger Menu ---
  function initHamburgerMenu() {
    var navbar = document.querySelector('.navbar');
    var navLinks = document.querySelector('.nav-links');
    if (!navbar || !navLinks) return;

    var hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navLinks.parentNode.insertBefore(hamburger, navLinks);

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  initHamburgerMenu();

  // --- Scroll Detection for Navbar ---
  function initScrollDetection() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    });
  }

  initScrollDetection();
})();
