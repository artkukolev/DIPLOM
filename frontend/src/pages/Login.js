import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/client';

export const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError('Ошибка входа. Проверьте учётные данные.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center gradient-text">
            Личные дела
          </h1>
          <p className="text-center text-gray-600 mt-2 text-lg">учащихся школы</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border-2 border-red-300 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Роль</label>
            <div className="flex gap-3">
              <label className="inline-flex items-center">
                <input type="radio" name="role" value="student" checked={role==='student'} onChange={()=>{setRole('student'); setUsername('student'); setPassword('student123');}} className="mr-2" /> Ученик
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="role" value="teacher" checked={role==='teacher'} onChange={()=>{setRole('teacher'); setUsername('teacher'); setPassword('teacher123');}} className="mr-2" /> Преподаватель
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="role" value="admin" checked={role==='admin'} onChange={()=>{setRole('admin'); setUsername('admin'); setPassword('admin123');}} className="mr-2" /> Сисадмин
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Имя пользователя
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔐 Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Вход...' : '✅ Войти'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200 text-sm text-gray-700">
          <p className="font-semibold mb-2">📋 Демо-данные:</p>
          <p>👤 Пользователь: <code className="font-mono bg-white px-2 py-1 rounded">admin</code></p>
          <p>🔑 Пароль: <code className="font-mono bg-white px-2 py-1 rounded">admin123</code></p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 text-xs text-blue-700">
          <p>💡 <strong>Подсказка:</strong> Используйте тестовый аккаунт для входа в систему</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
