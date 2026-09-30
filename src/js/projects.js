import { getLang, t, onLangChange } from './i18n.js';
import { observeReveal } from './reveal.js';

// Seus projetos. Imagens em /public/images.
// `links`: lista de { label, href } — deixe vazia se o projeto não tiver link público.
// `logo`: mostra a imagem inteira e centrada sobre a cor `logoBg` (para ícones e logotipos).
const projects = [
  {
    title: 'AtestaVet',
    period: '2026',
    description: {
      pt: 'App multiplataforma (Android, macOS e Linux) que preenche e gera em PDF atestados veterinários de brucelose e tuberculose. Funciona offline, sincroniza com a nuvem e monta sozinho o relatório mensal da ADEPARÁ.',
      en: 'Cross-platform app (Android, macOS and Linux) that fills in and generates veterinary brucellosis and tuberculosis certificates as PDFs. Works offline, syncs to the cloud and builds the monthly ADEPARÁ report automatically.',
    },
    image: '/images/atestavet-icon.png',
    logo: true,
    logoBg: 'bg-pastel-sky',
    tags: ['Flutter', 'Dart', 'Supabase'],
    links: [{ label: 'Site', href: 'https://luisotv.github.io/atestavet-site/' }],
  },
  {
    title: 'PPMAC',
    period: { pt: '2024 — Atual', en: '2024 — Present' },
    description: {
      pt: 'Site do Observatório de Políticas Públicas de Mitigação e Adaptação Climática na Amazônia, com páginas de notícias, formulários de contato e seção sobre o projeto.',
      en: 'Website for the Observatory of Public Policies on Climate Mitigation and Adaptation in the Amazon, with news pages, contact forms and an about section.',
    },
    image: 'https://ppmac.com.br/assets/Logo-DVWhmIZw.svg',
    logo: true,
    logoBg: 'bg-white',
    tags: ['Next.js', 'JavaScript', 'Tailwind'],
    links: [{ label: 'ppmac.com.br', href: 'https://ppmac.com.br' }],
  },
  {
    title: 'Dead Hand',
    period: '2025 — 2026',
    description: {
      pt: 'Jogo de Blackjack retrô com partidas rápidas, decisões estratégicas e duelos de alta tensão. Feito sozinho na Godot e publicado na Steam.',
      en: 'Retro-style Blackjack game with quick matches, strategic decisions and high-tension duels. Built solo in Godot and published on Steam.',
    },
    image:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4209090/8f18a8631634efb0c88a2a1c83368ef20463ed06/capsule_616x353.jpg',
    tags: ['Godot', 'GDScript'],
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/4209090/Dead_Hand/' }],
  },
  {
    title: 'SOSQueimadas Marabá',
    period: '2024',
    description: {
      pt: 'App para combater queimadas em Marabá-PA, com mapa de focos, denúncias, clima em tempo real, guia e sensores. Registrado no INPI e desenvolvido em coautoria com a equipe.',
      en: 'App to fight wildfires in Marabá, Brazil, with a fire map, reports, live weather, a guide and sensors. Registered with INPI (Brazilian IP office) and co-developed with a team.',
    },
    image: '/images/sosqueimadas.webp',
    tags: ['Swift', 'iOS'],
    links: [],
  },
];

const tagColors = [
  'bg-pastel-lavender',
  'bg-pastel-pink',
  'bg-pastel-peach',
  'bg-pastel-mint',
  'bg-pastel-sky',
  'bg-pastel-butter',
];

const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort();
const colorFor = (tag) => tagColors[allTags.indexOf(tag) % tagColors.length];

let activeFilter = 'all';

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function cardHTML(p) {
  const lang = getLang();
  const linkIcon =
    '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5"/></svg>';
  const links = p.links
    .map(
      (l) =>
        `<a href="${escape(l.href)}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink">${linkIcon}${escape(l.label)}</a>`,
    )
    .join('');

  return `
    <article class="reveal glass tilt group flex flex-col overflow-hidden rounded-3xl p-3 hover:bg-white/60">
      ${
        p.logo
          ? `<div class="flex aspect-video items-center justify-center overflow-hidden rounded-2xl p-8 ${p.logoBg ?? 'bg-white'}">
              <img src="${escape(p.image)}" alt="${escape(p.title)}" loading="lazy"
                class="max-h-full max-w-full object-contain drop-shadow-sm transition duration-500 group-hover:scale-105" />
            </div>`
          : `<div class="aspect-video overflow-hidden rounded-2xl">
              <img src="${escape(p.image)}" alt="${escape(p.title)}" loading="lazy"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
            </div>`
      }
      <div class="flex flex-1 flex-col px-3 pb-3 pt-5">
        <p class="font-mono text-xs text-muted">${escape(typeof p.period === 'string' ? p.period : p.period[lang])}</p>
        <h3 class="mt-1 text-xl font-bold">${escape(p.title)}</h3>
        <p class="mt-2 flex-1 text-sm text-muted">${escape(p.description[lang])}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          ${p.tags.map((tag) => `<span class="chip ${colorFor(tag)}">${escape(tag)}</span>`).join('')}
        </div>
        ${links ? `<div class="mt-5 flex gap-5 border-t border-ink/10 pt-4">${links}</div>` : ''}
      </div>
    </article>`;
}

function renderFilters() {
  const container = document.getElementById('project-filters');
  const filters = ['all', ...allTags];
  container.innerHTML = filters
    .map((f) => {
      const active = f === activeFilter;
      const label = f === 'all' ? t('projects.all') : f;
      return `<button type="button" data-filter="${escape(f)}" aria-pressed="${active}"
        class="rounded-full px-4 py-1.5 text-sm font-medium transition ${
          active
            ? 'bg-ink text-cream'
            : 'border border-white/70 bg-white/45 text-muted backdrop-blur-xl hover:bg-white/70 hover:text-ink'
        }">${escape(label)}</button>`;
    })
    .join('');
}

function renderGrid() {
  const grid = document.getElementById('project-grid');
  const visible = activeFilter === 'all' ? projects : projects.filter((p) => p.tags.includes(activeFilter));
  grid.innerHTML = visible.map(cardHTML).join('');
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    observeReveal(el);
  });
  grid.querySelectorAll('.tilt').forEach(attachTilt);
}

function attachTilt(card) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

export function initProjects() {
  renderFilters();
  renderGrid();

  document.getElementById('project-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    renderFilters();
    renderGrid();
  });

  onLangChange(() => {
    renderFilters();
    renderGrid();
  });
}
