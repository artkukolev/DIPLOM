import React, { useMemo, useState } from 'react';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { $isAuthenticated, loginSubmitted } from '../model/auth';
import { showNotification } from '../model/notifications';

export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useUnit($isAuthenticated);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => login.trim().length > 0 && password.trim().length > 0, [login, password]);

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon"> </div>
            <div>
              <h1>Цифровая платфформа</h1>
              <p>ITHub Школа • Классный руководитель</p>
            </div>
          </div>

          <form
            id="loginForm"
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              loginSubmitted({ login: login.trim(), password: password.trim() });
              const ok = login.trim() === '1' && password.trim() === '1';
              if (ok) {
                setError('');
                showNotification({ message: 'Вход выполнен', type: 'success' });
                navigate('/dashboard', { replace: true });
              } else {
                setError('Неверный логин или пароль');
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="loginInput">Логин</label>
              <input
                type="text"
                id="loginInput"
                className="form-control"
                placeholder="Введите логин"
                required
                autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Пароль</label>
              <input
                type="password"
                id="passwordInput"
                className="form-control"
                placeholder="Введите пароль"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary login-submit" disabled={!canSubmit}>
              Войти
            </button>
            <p className="login-hint">Тестовые данные: логин 1, пароль 1</p>
            <p className="login-error" id="loginError">
              {error}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

