// Todos os textos traduzíveis do site. Edite aqui o seu conteúdo.
const translations = {
  pt: {
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',

    'about.status': 'Em busca de estágio ou primeiro emprego',
    'about.greeting': 'Olá, eu sou o',
    'about.roles': ['Desenvolvedor Full Stack', 'Estudante de Sistemas de Informação', 'Game dev nas horas vagas', 'Curioso por hardware'],
    'about.p1':
      'Estudante de Sistemas de Informação na UNIFESSPA, em Marabá (PA), com experiência prática em desenvolvimento full stack.',
    'about.p2':
      'Gosto de construir de tudo: de sites e APIs a apps em Swift e jogos na Godot. Aprendo rápido e trabalho bem em equipe.',
    'about.cta_projects': 'Ver projetos',
    'about.cv': 'Baixar currículo',
    'about.cv_href': 'cv.pdf',
    'about.cv_name': 'Curriculo_Luis_Otavio_Pimentel.pdf',
    'about.stack': 'Tecnologias',
    'about.photo_alt': 'Foto de Luís Otávio',

    'projects.title': 'Projetos',
    'projects.subtitle': 'Uma seleção de coisas que construí.',
    'projects.all': 'Todos',

    'experience.title': 'Experiência',
    'experience.subtitle': 'O caminho que me trouxe até aqui.',
    'experience.now': 'Atual',
    'experience.next_title': 'Próximo capítulo',
    'experience.next_desc': 'Em busca de estágio ou primeiro emprego em desenvolvimento de software. Bora conversar?',

    'footer.top': 'Voltar ao topo ↑',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',

    'about.status': 'Open to internships & first job',
    'about.greeting': "Hi, I'm",
    'about.roles': ['Full Stack Developer', 'Information Systems Student', 'Indie game dev', 'Hardware tinkerer'],
    'about.p1':
      "I'm an Information Systems student at UNIFESSPA in Marabá, Brazil, with hands-on full stack development experience.",
    'about.p2':
      'I love building all kinds of things: from websites and APIs to Swift apps and Godot games. I learn fast and work well in teams.',
    'about.cta_projects': 'View projects',
    'about.cv': 'Download résumé',
    'about.cv_href': 'cv-en.pdf',
    'about.cv_name': 'Resume_Luis_Otavio_Pimentel.pdf',
    'about.stack': 'Tech stack',
    'about.photo_alt': 'Photo of Luís Otávio',

    'projects.title': 'Projects',
    'projects.subtitle': "A selection of things I've built.",
    'projects.all': 'All',

    'experience.title': 'Experience',
    'experience.subtitle': 'The road that brought me here.',
    'experience.now': 'Current',
    'experience.next_title': 'Next chapter',
    'experience.next_desc': "Looking for an internship or first job in software development. Let's talk?",

    'footer.top': 'Back to top ↑',
  },
};

const STORAGE_KEY = 'lang';
const listeners = new Set();

function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

let current =
  readStoredLang() ?? (navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en');

export const getLang = () => current;

export const t = (key) => translations[current][key] ?? translations.pt[key] ?? key;

export function onLangChange(fn) {
  listeners.add(fn);
}

export function setLang(lang) {
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* modo privado: ignora */
  }
  applyTranslations();
  listeners.forEach((fn) => fn(lang));
}

function applyTranslations() {
  document.documentElement.lang = current === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-cv-link]').forEach((el) => {
    el.href = t('about.cv_href');
    el.download = t('about.cv_name');
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  const label = document.querySelector('[data-lang-label]');
  if (label) label.textContent = current === 'pt' ? 'EN' : 'PT';
}

export function initI18n() {
  applyTranslations();
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    setLang(current === 'pt' ? 'en' : 'pt');
  });
}
