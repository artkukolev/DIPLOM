import { createEvent, createStore, sample } from 'effector';
import { removeSession, readSession, writeSession, writeJson } from '../../shared/storage';
import { DEFAULT_USER } from './currentUser';

const AUTH_KEY = 'isAuthenticated';
const CURRENT_USER_KEY = 'currentUser';

export const loginSubmitted = createEvent<{ login: string; password: string }>();
export const logoutClicked = createEvent();

export const $isAuthenticated = createStore<boolean>(readSession(AUTH_KEY) === 'true')
  .on(loginSubmitted, (_, { login, password }) => login === '1' && password === '1')
  .reset(logoutClicked);

sample({
  clock: $isAuthenticated,
  fn: (isAuthed) => {
    writeSession(AUTH_KEY, isAuthed ? 'true' : 'false');
    if (isAuthed) {
      writeJson(CURRENT_USER_KEY, DEFAULT_USER);
    } else {
      removeSession(AUTH_KEY);
      try {
        localStorage.removeItem(CURRENT_USER_KEY);
      } catch {
        // ignore
      }
    }
  },
});

