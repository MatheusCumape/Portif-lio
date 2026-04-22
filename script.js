const themeToggleButton = document.querySelector('[data-theme-toggle]');
const mediaCard = document.querySelector('[data-media-card]');
const mediaVideo = mediaCard?.querySelector('.hero-photo-box-video');
const THEME_STORAGE_KEY = 'portfolio-theme';

const updateThemeButtonLabel = (theme) => {
  if (!themeToggleButton) return;
  const label = themeToggleButton.querySelector('.theme-toggle-label');
  const text = theme === 'dark' ? 'Light' : 'Dark';
  if (label) {
    label.textContent = text;
  } else {
    themeToggleButton.textContent = text;
  }
};

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButtonLabel(theme);
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

applyTheme(getInitialTheme());

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

const activateMediaCard = async () => {
  if (!mediaCard || !mediaVideo) return;

  mediaCard.classList.add('is-active');

  try {
    mediaVideo.currentTime = 0;
    await mediaVideo.play();
  } catch {
    mediaCard.classList.remove('is-active');
  }
};

const deactivateMediaCard = () => {
  if (!mediaCard || !mediaVideo) return;

  mediaCard.classList.remove('is-active');
  mediaVideo.pause();
  mediaVideo.currentTime = 0;
};

if (mediaCard && mediaVideo) {
  mediaCard.addEventListener('mouseenter', () => {
    activateMediaCard();
  });

  mediaCard.addEventListener('mouseleave', () => {
    deactivateMediaCard();
  });

  mediaCard.addEventListener('click', (event) => {
    if (window.matchMedia('(hover: hover)').matches) return;

    event.preventDefault();

    if (mediaCard.classList.contains('is-active')) {
      deactivateMediaCard();
      return;
    }

    activateMediaCard();
  });

  document.addEventListener('click', (event) => {
    if (!mediaCard.classList.contains('is-active')) return;
    if (mediaCard.contains(event.target)) return;
    deactivateMediaCard();
  });
}
