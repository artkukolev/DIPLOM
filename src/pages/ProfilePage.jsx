import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook, FaTrophy, FaCalendar, FaEdit, FaSave } from 'react-icons/fa';
import './ProfilePage.css';

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.email.split('@')[0],
    email: user.email,
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Примерная, д. 42',
    grade: '8А',
    joinDate: '2022-09-01',
    birthDate: '2008-03-15'
  });

  const [stats] = useState({
    totalGrades: 28,
    averageGrade: 4.2,
    completedAssignments: 15,
    totalAssignments: 18,
    attendanceRate: 96,
    awards: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  const getRoleLabel = (role) => {
    const labels = {
      student: 'Ученик',
      teacher: 'Преподаватель',
      parent: 'Родитель',
      admin: 'Администратор'
    };
    return labels[role] || role;
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <section className="profile-header">
        <div className="profile-avatar">
          <FaUser />
        </div>
        <div className="profile-title">
          <h1>{profileData.name}</h1>
          <p className="role-badge">{getRoleLabel(user.role)}</p>
          <p className="role-description">
            {user.role === 'student' && 'Активный ученик школы'}
            {user.role === 'teacher' && 'Опытный преподаватель'}
            {user.role === 'parent' && 'Родитель ученика'}
            {user.role === 'admin' && 'Администратор системы'}
          </p>
        </div>
        <button 
          className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? <><FaSave /> Сохранить</> : <><FaEdit /> Редактировать</>}
        </button>
      </section>

      {/* Personal Information */}
      <section className="profile-section">
        <h2>Личная информация</h2>
        <div className="profile-grid">
          <div className="profile-field">
            <label><FaUser /> Имя</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaEnvelope /> Email</label>
            <p>{profileData.email}</p>
          </div>

          <div className="profile-field">
            <label><FaPhone /> Телефон</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>

          <div className="profile-field">
            <label><FaMapMarkerAlt /> Адрес</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.address}</p>
            )}
          </div>

          {user.role === 'student' && (
            <>
              <div className="profile-field">
                <label><FaBook /> Класс</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="grade"
                    value={profileData.grade}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profileData.grade}</p>
                )}
              </div>

              <div className="profile-field">
                <label><FaCalendar /> Дата рождения</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthDate"
                    value={profileData.birthDate}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{new Date(profileData.birthDate).toLocaleDateString('ru-RU')}</p>
                )}
              </div>
            </>
          )}

          <div className="profile-field">
            <label><FaCalendar /> Дата присоединения</label>
            <p>{new Date(profileData.joinDate).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="profile-section">
        <h2>Статистика</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalGrades}</div>
              <div className="stat-label">Всего оценок</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">{stats.averageGrade}</div>
              <div className="stat-label">Средняя оценка</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{stats.completedAssignments}/{stats.totalAssignments}</div>
              <div className="stat-label">Выполнено заданий</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-info">
              <div className="stat-value">{stats.attendanceRate}%</div>
              <div className="stat-label">Посещаемость</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <div className="stat-value">{stats.awards}</div>
              <div className="stat-label">Награды</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="profile-section">
        <h2>Недавние события</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-date">2 часа назад</span>
            <span className="activity-text">Оценка "5" по Русскому языку</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">4 часа назад</span>
            <span className="activity-text">Добавлено новое задание по Математике</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">1 день назад</span>
            <span className="activity-text">Выполнено задание по Истории</span>
          </div>
          <div className="activity-item">
            <span className="activity-date">3 дня назад</span>
            <span className="activity-text">Посещение школы - 100%</span>
          </div>
        </div>
      </section>

      {/* Education Info */}
      {user.role === 'student' && (
        <section className="profile-section">
          <h2>Образовательная информация</h2>
          <div className="education-grid">
            <div className="education-card">
              <h3>Основной класс</h3>
              <p className="education-value">{profileData.grade}</p>
              <p className="education-meta">Год: 2024</p>
            </div>
            <div className="education-card">
              <h3>Классный руководитель</h3>
              <p className="education-value">И.В. Петров</p>
              <p className="education-meta">Контакт: ivpetrov@ithub.school</p>
            </div>
            <div className="education-card">
              <h3>Школа</h3>
              <p className="education-value">IThub School</p>
              <p className="education-meta">Москва, Россия</p>
            </div>
          </div>
        </section>
      )}

      {/* Contact Support */}
      <section className="profile-section contact-section">
        <h2>Нужна помощь?</h2>
        <div className="contact-info">
          <p>Если у вас есть вопросы или проблемы, обратитесь к администрации школы.</p>
          <button className="btn btn-primary">Написать в поддержку</button>
        </div>
      </section>
    </div>
  );
}
