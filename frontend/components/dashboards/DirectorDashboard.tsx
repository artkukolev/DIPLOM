import { User } from '../../store/useAuth';

interface Props { user: User }

export default function DirectorDashboard({ user }: Props) {
  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center">Дашборд директора</h1>
      <p className="mt-4 text-center">Добро пожаловать, {user.name}.</p>
      {/* TODO: статистика, графики, списки классов */}
    </div>
  );
}
