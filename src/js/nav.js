export function initNav() {
  // Link ativo conforme a secção visível
  const links = document.querySelectorAll('#nav-menu .nav-link');
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href')));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => s && observer.observe(s));
}
