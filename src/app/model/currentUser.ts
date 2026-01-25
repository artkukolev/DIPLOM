import type { User } from '../../shared/types';

// В исходном проекте пользователь был захардкожен в main.js.
export const DEFAULT_USER: User = {
  id: 1,
  name: 'Иван Иванов',
  role: 'teacher',
  class: '10А',
};

