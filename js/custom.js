/* Navigation for the preserved Bootstrap 2 appearance. No runtime dependencies. */
'use strict';
(() => {
  const dropdowns = [...document.querySelectorAll('.dropdown')];
  const closeDropdowns = (except) => dropdowns.forEach(item => {
    if (item !== except) {
      item.classList.remove('open');
      item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });
  dropdowns.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    if (!toggle) return;
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-expanded', 'false');
    const change = () => {
      const open = !item.classList.contains('open');
      closeDropdowns();
      item.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', event => { event.preventDefault(); change(); });
    toggle.addEventListener('keydown', event => {
      if (event.key === ' ') { event.preventDefault(); change(); }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        closeDropdowns(item);
        item.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        item.querySelector('.dropdown-menu a')?.focus();
      }
    });
    item.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeDropdowns(); toggle.focus(); }
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) closeDropdowns();
  });
  document.addEventListener('focusin', event => {
    closeDropdowns(event.target.closest('.dropdown'));
  });
  document.querySelectorAll('[data-toggle="collapse"]').forEach((button, index) => {
    const target = document.querySelector(button.dataset.target);
    if (!target) return;
    if (!target.id) target.id = 'collapse-panel-' + index;
    button.setAttribute('aria-controls', target.id);
    button.setAttribute('aria-expanded', String(target.classList.contains('in')));
    button.addEventListener('click', () => {
      const open = target.classList.toggle('in');
      button.setAttribute('aria-expanded', String(open));
      if (!open) closeDropdowns();
    });
  });
  const share = document.getElementById('tweet_anchor');
  if (share) share.href = 'https://twitter.com/intent/tweet?' + new URLSearchParams({
    url: location.href.split('#')[0], text: document.title, via: 'totoadad'
  });
})();
