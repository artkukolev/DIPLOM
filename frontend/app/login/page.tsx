"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, Role } from '../../store/useAuth';

export default function LoginPage() {
  const login = useAuth((s) => s.login);
  const user = useAuth((s) => s.user);
  const router = useRouter();

  // if already authenticated, send to dashboard
  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const [role, setRole] = useState<Role>('director');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock authentication
    login({ role, name: `${role[0].toUpperCase()} User` });
    router.replace('/dashboard');
  };

  const handleDemo = (r: Role) => {
    login({ role: r, name: `${r[0].toUpperCase()} Demo` });
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-display font-bold mb-6 text-center">Вход в платформу</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Роль</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="director">Директор</option>
              <option value="admin">Сис.Админ</option>
              <option value="student">Ученик</option>
              <option value="parent">Родитель</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email / логин</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Войти
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <button
            onClick={() => handleDemo('director')}
            className="text-indigo-600 hover:underline mr-2"
          >
            Директор
          </button>
          <button
            onClick={() => handleDemo('admin')}
            className="text-indigo-600 hover:underline mr-2"
          >
            Сис.Админ
          </button>
          <button
            onClick={() => handleDemo('student')}
            className="text-indigo-600 hover:underline mr-2"
          >
            Ученик
          </button>
          <button
            onClick={() => handleDemo('parent')}
            className="text-indigo-600 hover:underline"
          >
            Родитель
          </button>
        </div>
        <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          Забыли пароль? <a href="#" className="underline">Восстановить</a>
        </p>
      </div>
    </div>
  );
}
