// Shared app.js - handles auth state display in navbar across all pages

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
      usernameEl.textContent = `Hello, ${user}`;
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
})();
