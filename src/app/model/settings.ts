import { createEvent, createStore, sample } from 'effector';
import { readJson, writeJson } from '../../shared/storage';

export type Settings = {
  schoolName: string;
  academicYear: string;
  gradeSystem: '5' | '10' | '100';
  language: 'ru' | 'en';
};

const SETTINGS_KEY = 'appSettings';

export const settingsChanged = createEvent<Partial<Settings>>();

export const $settings = createStore<Settings>(
  readJson<Settings>(SETTINGS_KEY, {
    schoolName: 'Школа №1',
    academicYear: '2023-2024',
    gradeSystem: '5',
    language: 'ru',
  }),
).on(settingsChanged, (s, patch) => ({ ...s, ...patch }));

sample({
  clock: $settings,
  fn: (s) => writeJson(SETTINGS_KEY, s),
});

