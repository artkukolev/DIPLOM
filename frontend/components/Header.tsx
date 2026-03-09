"use client";
import Link from 'next/link';
import { useAuth } from '../store/useAuth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          EduManager
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
            Дашборд
          </Link>
          {user && (
            <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 transition-colors">
              Выйти
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
