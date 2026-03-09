import { User } from '../../store/useAuth';

interface Props { user: User }

export default function AdminDashboard({ user }: Props) {
  return (
    <div className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center">Дашборд системного администратора</h1>
      <p className="mt-4 text-center">Привет, {user.name}.</p>
      {/* TODO: управление пользователями, логи, настройки */}
    </div>
  );
}
