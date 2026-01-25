import { sampleDataEnsured } from './model/students';
import { sampleGradesEnsured } from './model/grades';
import { $theme } from './model/ui';

// Инициализация рантайма приложения:
// - темная тема (применение к body делается реакцией в ui.ts)
// - тестовые данные при пустом хранилище
export function initAppRuntime(): void {
  // touch store to apply theme effect
  void $theme.getState();
  sampleDataEnsured();
  sampleGradesEnsured();
}

