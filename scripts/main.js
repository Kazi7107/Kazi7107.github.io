// ── NAV keyboard: arrow keys move between nav items ──
(function () {
  const navItems = Array.from(document.querySelectorAll('.nav-list a'));

  navItems.forEach(function (item, index) {
    item.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = navItems[(index + 1) % navItems.length];
        next.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = navItems[(index - 1 + navItems.length) % navItems.length];
        prev.focus();
      }
    });
  });
})();

// ── READING LIST keyboard: arrow keys move between links ──
(function () {
  const readingLinks = Array.from(
    document.querySelectorAll('.reading-list a')
  );
  if (readingLinks.length === 0) return;

  var currentIndex = -1;

  function setFocus(index) {
    if (currentIndex >= 0 && readingLinks[currentIndex]) {
      readingLinks[currentIndex].classList.remove('kb-focus');
      readingLinks[currentIndex].removeAttribute('tabindex');
    }
    currentIndex = index;
    readingLinks[currentIndex].classList.add('kb-focus');
    readingLinks[currentIndex].focus();
  }

  document.addEventListener('keydown', function (e) {
    // Only act when no interactive element (except body) is focused,
    // or when already focused within the reading list.
    const active = document.activeElement;
    const inNav = active && active.closest('.nav-list');
    if (inNav) return;

    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      const next = currentIndex < readingLinks.length - 1 ? currentIndex + 1 : 0;
      setFocus(next);
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      const prev = currentIndex > 0 ? currentIndex - 1 : readingLinks.length - 1;
      setFocus(prev);
    }
  });

  // Keep currentIndex in sync when user tabs normally
  readingLinks.forEach(function (link, index) {
    link.addEventListener('focus', function () {
      currentIndex = index;
    });
    link.addEventListener('blur', function () {
      link.classList.remove('kb-focus');
    });
  });
})();
