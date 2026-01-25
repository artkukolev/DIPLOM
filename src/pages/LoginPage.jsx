import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGraduate, FaChalkboardUser, FaUser, FaShieldAlt } from 'react-icons/fa';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('alexey@ithub.school');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const demoAccounts = [
    { email: 'alexey@ithub.school', role: 'student', name: 'Ученик', icon: FaGraduate },
    { email: 'lyudmila@ithub.school', role: 'teacher', name: 'Учитель', icon: FaChalkboardUser },
    { email: 'parent@ithub.school', role: 'parent', name: 'Родитель', icon: FaUser },
    { email: 'admin@ithub.school', role: 'admin', name: 'Администратор', icon: FaShieldAlt }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email не может быть пустым');
      return;
    }

    if (!role) {
      setError('Пожалуйста выберите роль');
      return;
    }

    setError('');
    onLogin(email, role);
  };

  const handleDemoLogin = (demoEmail, demoRole) => {
    onLogin(demoEmail, demoRole);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card glass-card">
          <div className="login-header">
            <h1>📚 IThub School</h1>
            <p className="login-subtitle">Электронный журнал</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">
                <FaUser /> Роль
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Ученик</option>
                <option value="teacher">Учитель</option>
                <option value="parent">Родитель</option>
                <option value="admin">Администратор</option>
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-large">
              <FaLock /> Войти
            </button>
          </form>

          <div className="demo-accounts">
            <h3>Демо-аккаунты</h3>
            <div className="demo-grid">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <button
                    key={account.email}
                    className="demo-btn glass-card"
                    onClick={() => handleDemoLogin(account.email, account.role)}
                    title={account.email}
                  >
                    <Icon />
                    <span className="demo-name">{account.name}</span>
                    <span className="demo-email">{account.email}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="login-info">
            <h4>ℹ️ Информация</h4>
            <ul>
              <li>Выберите демо-аккаунт или введите свой email</li>
              <li>Пароль не требуется</li>
              <li>Полностью функциональное приложение</li>
              <li>Все данные хранятся в браузере</li>
            </ul>
          </div>
        </div>

        <div className="login-background">
          <div className="gradient-blob blob-1"></div>
          <div className="gradient-blob blob-2"></div>
          <div className="gradient-blob blob-3"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
