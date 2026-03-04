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
    <div className="hawk-flex hawk-items-center hawk-justify-center hawk-min-h-screen hawk-p-4" style={{ background: 'var(--hawk-background-primary)' }}>
      <div className="hawk-card hawk-w-full hawk-max-w-md hawk-p-8 hawk-animate-fade-in-up">
        <div className="hawk-text-center hawk-mb-8">
          <div className="hawk-logo hawk-mx-auto hawk-mb-4"></div>
          <h1 className="hawk-font-bold hawk-mb-2" style={{ fontSize: 'var(--hawk-font-size-3xl)', color: 'var(--hawk-text-primary)', fontFamily: 'Inter, sans-serif' }}>
            EduManager
          </h1>
          <p className="hawk-text-secondary">Профессиональная система управления</p>
        </div>

        {error && (
          <div className="hawk-mb-6 hawk-p-4 hawk-bg-red-50 dark:hawk-bg-red-900/20 hawk-text-red-600 dark:hawk-text-red-400 hawk-rounded-xl hawk-border hawk-border-red-200 dark:hawk-border-red-800 hawk-animate-slide-in-right">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="hawk-space-y-6">
          <div>
            <label className="hawk-block hawk-font-medium hawk-mb-2" style={{ color: 'var(--hawk-text-primary)' }}>Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="hawk-input hawk-w-full"
              placeholder="Введите логин"
              required
            />
          </div>

          <div>
            <label className="hawk-block hawk-font-medium hawk-mb-2" style={{ color: 'var(--hawk-text-primary)' }}>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="hawk-input hawk-w-full"
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="hawk-btn hawk-btn-primary hawk-w-full hawk-flex hawk-items-center hawk-justify-center hawk-space-x-2 hawk-py-3 disabled:hawk-opacity-50 disabled:hawk-cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="hawk-spinner hawk-w-5 hawk-h-5"></div>
                <span>Вход...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Войти в систему</span>
              </>
            )}
          </button>
        </form>

        <div className="hawk-mt-8">
          <div className="hawk-card hawk-p-4 hawk-rounded-xl">
            <h3 className="hawk-font-semibold hawk-mb-3" style={{ color: 'var(--hawk-text-primary)', fontFamily: 'Inter, sans-serif' }}>Демо-аккаунты</h3>
            <div className="hawk-space-y-2 hawk-text-sm hawk-text-secondary">
              <div className="hawk-flex hawk-justify-between">
                <span>👑 Admin:</span>
                <code className="hawk-bg-gray-100 dark:hawk-bg-gray-800 hawk-px-2 hawk-py-1 hawk-rounded">admin / admin123</code>
              </div>
              <div className="hawk-flex hawk-justify-between">
                <span>👨‍🏫 Teacher:</span>
                <code className="hawk-bg-gray-100 dark:hawk-bg-gray-800 hawk-px-2 hawk-py-1 hawk-rounded">teacher / teacher123</code>
              </div>
              <div className="hawk-flex hawk-justify-between">
                <span>👨‍🎓 Student:</span>
                <code className="hawk-bg-gray-100 dark:hawk-bg-gray-800 hawk-px-2 hawk-py-1 hawk-rounded">student / student123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
