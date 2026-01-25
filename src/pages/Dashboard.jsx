import React, { useState } from 'react';
import { FaGraduate, FaBook, FaListCheck, FaCalendar, FaTrophy, FaClipboard } from 'react-icons/fa';
import './Dashboard.css';

export default function Dashboard({ user }) {
  const [stats] = useState({
    averageGrade: 4.2,
    totalGrades: 28,
    completedAssignments: 15,
    totalAssignments: 18,
    attendanceRate: 96,
    ranking: 3
  });

  const [recentActivity] = useState([
    { id: 1, subject: 'Русский язык', action: 'Оценка выставлена', grade: '5', date: '2 часа назад' },
    { id: 2, subject: 'Математика', action: 'Задание добавлено', date: '4 часа назад' },
    { id: 3, subject: 'История', action: 'Оценка выставлена', grade: '4', date: '1 день назад' },
    { id: 4, subject: 'Английский', action: 'Комментарий преподавателя', date: '2 дня назад' }
  ]);

  const [upcomingLessons] = useState([
    { id: 1, subject: 'Математика', time: '09:00', room: '204', teacher: 'И.В. Петров' },
    { id: 2, subject: 'Физика', time: '10:30', room: '302', teacher: 'С.А. Иванов' },
    { id: 3, subject: 'Английский язык', time: '12:00', room: '105', teacher: 'О.С. Сидоров' }
  ]);

  const getRoleLabel = (role) => {
    const labels = {
      student: 'Ученик',
      teacher: 'Преподаватель',
      parent: 'Родитель',
      admin: 'Администратор'
    };
    return labels[role] || role;
  };

  const getStatIcon = (key) => {
    const icons = {
      averageGrade: <FaTrophy />,
      totalGrades: <FaBook />,
      completedAssignments: <FaListCheck />,
      totalAssignments: <FaClipboard />,
      attendanceRate: <FaCalendar />,
      ranking: <FaGraduate />
    };
    return icons[key];
  };

  const getStatLabel = (key) => {
    const labels = {
      averageGrade: 'Средняя оценка',
      totalGrades: 'Всего оценок',
      completedAssignments: 'Выполнено задач',
      totalAssignments: 'Всего задач',
      attendanceRate: 'Посещаемость',
      ranking: 'Место в классе'
    };
    return labels[key];
  };

  const getStatValue = (key, value) => {
    if (key === 'attendanceRate') return `${value}%`;
    if (key === 'ranking') return `${value} место`;
    return value;
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Добро пожаловать, {user.email.split('@')[0]}!</h1>
          <p>Вы авторизованы как <strong>{getRoleLabel(user.role)}</strong></p>
          <div className="welcome-actions">
            <button className="btn btn-primary">Моё расписание</button>
            <button className="btn btn-secondary">Мои оценки</button>
          </div>
        </div>
        <div className="welcome-decoration">
          <FaGraduate />
        </div>
      </section>

      {/* Statistics Grid */}
      <section className="stats-section">
        <h2>Ваша статистика</h2>
        <div className="stats-grid">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="stat-card">
              <div className="stat-icon">{getStatIcon(key)}</div>
              <div className="stat-content">
                <p className="stat-label">{getStatLabel(key)}</p>
                <p className="stat-value">{getStatValue(key, value)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Lessons */}
      {user.role !== 'admin' && (
        <section className="upcoming-section">
          <h2>Сегодняшние уроки</h2>
          <div className="lessons-list">
            {upcomingLessons.map(lesson => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-time">{lesson.time}</div>
                <div className="lesson-info">
                  <h3>{lesson.subject}</h3>
                  <p>Кабинет {lesson.room} • {lesson.teacher}</p>
                </div>
                <div className="lesson-badge">Сегодня</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <section className="activity-section">
        <h2>Недавние события</h2>
        <div className="activity-timeline">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-dot"></div>
              <div className="activity-content">
                <div className="activity-header">
                  <h4>{activity.subject}</h4>
                  <span className="activity-date">{activity.date}</span>
                </div>
                <p className="activity-action">{activity.action}</p>
                {activity.grade && (
                  <div className="activity-grade">
                    <span className="grade-badge">{activity.grade}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats Info */}
      <section className="info-section">
        <div className="info-card">
          <h3>💡 Совет дня</h3>
          <p>Не забудьте проверить новые задания! У вас есть {18 - 15} невыполненных задач со сроком выполнения.</p>
        </div>
        <div className="info-card">
          <h3>📚 Изучите</h3>
          <p>Ознакомьтесь с расписанием на неделю, чтобы быть всегда подготовленными к занятиям.</p>
        </div>
      </section>
    </div>
  );
}
