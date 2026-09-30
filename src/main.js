import './style.css';
import { initI18n, onLangChange, t } from './js/i18n.js';
import { initNav } from './js/nav.js';
import { initReveal } from './js/reveal.js';
import { initProjects } from './js/projects.js';
import { initExperience } from './js/experience.js';

// Efeito de escrita rotativo no hero
function initTyping() {
  const el = document.getElementById('typed');
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = t('about.roles')[0];
    onLangChange(() => (el.textContent = t('about.roles')[0]));
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer;

  const tick = () => {
    const roles = t('about.roles');
    const word = roles[roleIndex % roles.length];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 40 : 90;
    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex++;
      delay = 300;
    }
    timer = setTimeout(tick, delay);
  };

  onLangChange(() => {
    clearTimeout(timer);
    charIndex = 0;
    deleting = false;
    tick();
  });
  tick();
}

initI18n();
initNav();
initReveal();
initProjects();
initExperience();
initTyping();

document.getElementById('year').textContent = new Date().getFullYear();
