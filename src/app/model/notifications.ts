import { createEvent, createStore, sample } from 'effector';
import type { NoticeType } from '../../shared/types';

export type NotificationState = {
  visible: boolean;
  message: string;
  type: NoticeType;
};

export const showNotification = createEvent<{ message: string; type?: NoticeType }>();
export const hideNotification = createEvent();

export const $notification = createStore<NotificationState>({
  visible: false,
  message: '',
  type: 'success',
})
  .on(showNotification, (_, { message, type }) => ({
    visible: true,
    message,
    type: type ?? 'success',
  }))
  .on(hideNotification, (s) => ({ ...s, visible: false }));

// авто-скрытие через setTimeout
sample({
  clock: showNotification,
  fn: () => {
    window.setTimeout(() => hideNotification(), 3000);
  },
});

