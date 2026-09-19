(function () {
  var root = document.documentElement;
  var storageKey = 'site-theme';
  var savedTheme = null;

  try { savedTheme = localStorage.getItem(storageKey); } catch (e) {}

  /* Keep the first visit light; a dark choice is restored only when explicitly saved. */
  var initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

  root.dataset.theme = initialTheme;

  function setupToggle() {
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    function syncToggle() {
      var isDark = root.dataset.theme === 'dark';
      var label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    }

    syncToggle();

    toggle.addEventListener('click', function () {
      var nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      try { localStorage.setItem(storageKey, nextTheme); } catch (e) {}
      syncToggle();
    });
  }

  document.addEventListener('DOMContentLoaded', setupToggle);
})();
