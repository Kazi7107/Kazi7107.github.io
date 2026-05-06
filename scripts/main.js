// ── MODAL ──
(function () {
  var btn = document.getElementById('help-btn');
  var modal = document.getElementById('help-modal');
  var closeBtn = document.getElementById('modal-close');
  if (!btn || !modal) return;

  function openModal() {
    modal.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  // trap focus inside modal while open
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.from(modal.querySelectorAll('button, a, [tabindex="0"]'));
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
})();

// ── NAV arrow-key navigation ──
(function () {
  var navItems = Array.from(document.querySelectorAll('.nav-list a'));

  navItems.forEach(function (item, index) {
    item.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navItems[(index + 1) % navItems.length].focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navItems[(index - 1 + navItems.length) % navItems.length].focus();
      }
    });
  });
})();

// ── READING LIST arrow-key navigation ──
(function () {
  var links = Array.from(document.querySelectorAll('.reading-grid a'));
  if (links.length === 0) return;

  var currentIndex = -1;

  function setFocus(index) {
    if (currentIndex >= 0) links[currentIndex].classList.remove('kb-focus');
    currentIndex = index;
    links[currentIndex].classList.add('kb-focus');
    links[currentIndex].focus();
  }

  document.addEventListener('keydown', function (e) {
    var modal = document.getElementById('help-modal');
    if (modal && !modal.hasAttribute('hidden')) return;
    if (document.activeElement && document.activeElement.closest('.nav-list')) return;

    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      setFocus(currentIndex < links.length - 1 ? currentIndex + 1 : 0);
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      setFocus(currentIndex > 0 ? currentIndex - 1 : links.length - 1);
    }
  });

  links.forEach(function (link, index) {
    link.addEventListener('focus', function () { currentIndex = index; });
    link.addEventListener('blur', function () { link.classList.remove('kb-focus'); });
  });
})();
