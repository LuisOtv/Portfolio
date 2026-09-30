let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
  }
  return observer;
}

export function observeReveal(el) {
  getObserver().observe(el);
}

export function initReveal() {
  document.querySelectorAll('.reveal').forEach(observeReveal);
}
