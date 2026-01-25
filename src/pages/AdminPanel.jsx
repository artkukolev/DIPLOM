import React, { useState } from 'react';
import { FaUsers, FaBook, FaChartBar, FaCog, FaTrash, FaEdit, FaPlus, FaSearch } from 'react-icons/fa';
import './AdminPanel.css';

export default function AdminPanel() {
  const [users, setUsers] = useState([
    { id: 1, email: 'alexey@ithub.school', role: 'student', name: 'Алексей', status: 'active' },
    { id: 2, email: 'lyudmila@ithub.school', role: 'teacher', name: 'Людмила', status: 'active' },
    { id: 3, email: 'parent@ithub.school', role: 'parent', name: 'Родитель', status: 'active' },
    { id: 4, email: 'admin@ithub.school', role: 'admin', name: 'Администратор', status: 'active' },
    { id: 5, email: 'student2@ithub.school', role: 'student', name: 'Мария', status: 'active' },
    { id: 6, email: 'teacher2@ithub.school', role: 'teacher', name: 'Виктор', status: 'inactive' },
  ]);

  const [subjects] = useState([
    { id: 1, name: 'Русский язык', teacher: 'И.В. Петров' },
    { id: 2, name: 'Математика', teacher: 'С.А. Иванов' },
    { id: 3, name: 'История', teacher: 'О.С. Сидоров' },
    { id: 4, name: 'Английский язык', teacher: 'Е.А. Козлова' },
  ]);

  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const [stats] = useState({
    totalUsers: 124,
    students: 87,
    teachers: 23,
    parents: 14,
    systemHealth: '98%'
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  const getRoleLabel = (role) => {
    const labels = {
      student: 'Ученик',
      teacher: 'Учитель',
      parent: 'Родитель',
      admin: 'Админ'
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      student: 'role-student',
      teacher: 'role-teacher',
      parent: 'role-parent',
      admin: 'role-admin'
    };
    return colors[role] || '';
  };

  return (
    <div className="admin-panel">
      {/* Header */}
      <section className="admin-header">
        <div>
          <h1>Панель администратора</h1>
          <p>Управление пользователями, предметами и системой</p>
        </div>
        <div className="header-icon">
          <FaCog />
        </div>
      </section>

      {/* Statistics */}
      <section className="admin-stats">
        <div className="stat-card">
          <FaUsers />
          <div className="stat-info">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Всего пользователей</div>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers style={{ color: '#3B82F6' }} />
          <div className="stat-info">
            <div className="stat-value">{stats.students}</div>
            <div className="stat-label">Учеников</div>
          </div>
        </div>
        <div className="stat-card">
          <FaBook style={{ color: '#10B981' }} />
          <div className="stat-info">
            <div className="stat-value">{stats.teachers}</div>
            <div className="stat-label">Учителей</div>
          </div>
        </div>
        <div className="stat-card">
          <FaChartBar style={{ color: '#F59E0B' }} />
          <div className="stat-info">
            <div className="stat-value">{stats.systemHealth}</div>
            <div className="stat-label">Здоровье системы</div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> Пользователи
        </button>
        <button 
          className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
          onClick={() => setActiveTab('subjects')}
        >
          <FaBook /> Предметы
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> Параметры
        </button>
      </section>

      {/* Users Management */}
      {activeTab === 'users' && (
        <section className="admin-content">
          <div className="content-header">
            <h2>Управление пользователями</h2>
            <div className="content-actions">
              <input
                type="text"
                placeholder="Поиск по email или имени..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="btn btn-primary">
                <FaPlus /> Добавить пользователя
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Имя</th>
                  <th>Роль</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>
                      <span className={`role-badge ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status === 'active' ? '🟢 Активен' : '🔴 Неактивен'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button 
                        className="btn-icon btn-toggle" 
                        title="Переключить статус"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Удалить"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Subjects Management */}
      {activeTab === 'subjects' && (
        <section className="admin-content">
          <div className="content-header">
            <h2>Управление предметами</h2>
            <button className="btn btn-primary">
              <FaPlus /> Добавить предмет
            </button>
          </div>

          <div className="subjects-grid">
            {subjects.map(subject => (
              <div key={subject.id} className="subject-card">
                <div className="subject-icon">
                  <FaBook />
                </div>
                <h3>{subject.name}</h3>
                <p className="teacher-info">Учитель: {subject.teacher}</p>
                <div className="subject-actions">
                  <button className="btn-icon btn-toggle">
                    <FaEdit />
                  </button>
                  <button className="btn-icon btn-delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* System Settings */}
      {activeTab === 'settings' && (
        <section className="admin-content">
          <div className="content-header">
            <h2>Параметры системы</h2>
          </div>

          <div className="settings-grid">
            <div className="setting-card">
              <h3>🔐 Безопасность</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Двухфакторная аутентификация
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Требовать смену пароля каждые 90 дней
                </label>
              </div>
            </div>

            <div className="setting-card">
              <h3>📧 Уведомления</h3>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Отправлять уведомления по email
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked /> Оповещение администраторам об ошибках
                </label>
              </div>
            </div>

            <div className="setting-card">
              <h3>⚙️ Система</h3>
              <div className="setting-item">
                <label>Версия системы: v2.0.1</label>
              </div>
              <div className="setting-item">
                <button className="btn btn-primary">Проверить обновления</button>
              </div>
            </div>

            <div className="setting-card">
              <h3>📊 Резервная копия</h3>
              <div className="setting-item">
                <label>Последняя резервная копия: вчера в 02:00</label>
              </div>
              <div className="setting-item">
                <button className="btn btn-success">Создать резервную копию сейчас</button>
              </div>
            </div>
          </div>

          {/* Database Info */}
          <div className="database-info">
            <h3>Информация о базе данных</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Размер БД:</span>
                <span className="value">245 MB</span>
              </div>
              <div className="info-item">
                <span className="label">Записей:</span>
                <span className="value">12,847</span>
              </div>
              <div className="info-item">
                <span className="label">Последний запрос:</span>
                <span className="value">2 мин назад</span>
              </div>
              <div className="info-item">
                <span className="label">Статус:</span>
                <span className="value" style={{ color: '#10B981' }}>Активна</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
