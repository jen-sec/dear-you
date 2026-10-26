(function () {
  'use strict';
  const slides = [...document.querySelectorAll('.drink-slide')];
  const counter = document.querySelector('.drink-counter');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  function stopAnimations() {
    slides.forEach(img => img.getAnimations().forEach(animation => animation.cancel()));
    const panel = document.getElementById('drink-panel');
    if (panel) panel.getAnimations().forEach(animation => animation.cancel());
  }
  window.updateDrinkMedia = function (index) {
    if (!Number.isInteger(index) || index < 0 || index >= slides.length || index === active) return;
    const old = active;
    const direction = index > old ? 1 : -1;
    stopAnimations();
    active = index;
    slides.forEach((img, i) => {
      img.classList.toggle('is-current', i === index);
      img.setAttribute('aria-hidden', String(i !== index));
    });
    counter.textContent = String(index + 1).padStart(2, '0') + ' / 03';
    if (motion.matches || typeof slides[index].animate !== 'function') return;
    const options = {duration: 440, easing: 'cubic-bezier(.22,.61,.36,1)'};
    slides[old].animate([
      {transform: 'translateX(0)', opacity: 1},
      {transform: `translateX(${-direction * 12}%)`, opacity: 0}
    ], options);
    slides[index].animate([
      {transform: `translateX(${direction * 16}%)`, opacity: 0},
      {transform: 'translateX(0)', opacity: 1}
    ], options);
    const panel = document.getElementById('drink-panel');
    if (panel) panel.animate([
      {transform: 'translateY(9px)', opacity: .55},
      {transform: 'translateY(0)', opacity: 1}
    ], {duration: 320, easing: 'ease-out'});
  };
  motion.addEventListener('change', () => { if (motion.matches) stopAnimations(); });
})();
