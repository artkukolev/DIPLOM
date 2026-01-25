import { createEvent, createStore, sample } from 'effector';
import { readJson, writeJson } from '../../shared/storage';

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';
const SIDEBAR_KEY = 'sidebarCollapsed';

export const themeToggled = createEvent();
export const sidebarToggled = createEvent();
export const mobileMenuToggled = createEvent();
export const mobileMenuClosed = createEvent();

export const $theme = createStore<Theme>(readJson<Theme>(THEME_KEY, 'light')).on(themeToggled, (t) =>
  t === 'dark' ? 'light' : 'dark',
);

export const $sidebarCollapsed = createStore<boolean>(readJson<boolean>(SIDEBAR_KEY, false)).on(
  sidebarToggled,
  (v) => !v,
);

export const $mobileMenuOpen = createStore<boolean>(false)
  .on(mobileMenuToggled, (v) => !v)
  .reset(mobileMenuClosed);

sample({
  clock: $theme,
  fn: (theme) => {
    writeJson(THEME_KEY, theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  },
});

sample({
  clock: $sidebarCollapsed,
  fn: (collapsed) => writeJson(SIDEBAR_KEY, collapsed),
});

