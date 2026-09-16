export const themeInitScript = `
(function () {
  try {
    var raw = localStorage.getItem('theme');
    var theme = 'dark';
    if (raw) {
      try {
        theme = JSON.parse(raw);
      } catch (e) {
        theme = raw;
      }
    }
    if (theme !== 'light' && theme !== 'dark' && theme !== 'system') {
      theme = 'dark';
    }
    var resolved = theme;
    if (theme === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();
