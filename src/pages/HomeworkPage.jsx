import React, { useState } from 'react';
import { FaFilter, FaClipboard, FaTrash, FaCheck, FaClock, FaExclamationCircle, FaPlus } from 'react-icons/fa';
import './HomeworkPage.css';

export default function HomeworkPage() {
  const [assignments, setAssignments] = useState([
    { 
      id: 1, 
      subject: 'Математика', 
      title: 'Решить задачи 123-145', 
      description: 'Выполнить все задачи из раздела "Квадратные уравнения"',
      deadline: '2024-01-20',
      status: 'pending',
      teacher: 'С.А. Иванов'
    },
    { 
      id: 2, 
      subject: 'Русский язык', 
      title: 'Написать сочинение', 
      description: 'Написать сочинение на тему "Моё путешествие" объёмом не менее 300 слов',
      deadline: '2024-01-21',
      status: 'pending',
      teacher: 'И.В. Петров'
    },
    { 
      id: 3, 
      subject: 'Английский язык', 
      title: 'Выучить слова', 
      description: 'Выучить 50 новых слов из словаря (Unit 5)',
      deadline: '2024-01-19',
      status: 'overdue',
      teacher: 'Е.А. Козлова'
    },
    { 
      id: 4, 
      subject: 'История', 
      title: 'Подготовить доклад', 
      description: 'Подготовить доклад на тему "Российская империя в XIX веке" (10-15 минут)',
      deadline: '2024-01-22',
      status: 'pending',
      teacher: 'О.С. Сидоров'
    },
    { 
      id: 5, 
      subject: 'Физика', 
      title: 'Лабораторная работа', 
      description: 'Провести эксперимент и написать отчёт "Изучение закона Ома"',
      deadline: '2024-01-20',
      status: 'completed',
      teacher: 'М.Е. Федоров'
    },
    { 
      id: 6, 
      subject: 'Химия', 
      title: 'Уравнения реакций', 
      description: 'Записать и сбалансировать 20 химических уравнений',
      deadline: '2024-01-23',
      status: 'pending',
      teacher: 'А.В. Волков'
    },
    { 
      id: 7, 
      subject: 'Литература', 
      title: 'Чтение книги', 
      description: 'Прочитать роман "Война и мир" (глава 5-7) и подготовить краткое резюме',
      deadline: '2024-01-25',
      status: 'pending',
      teacher: 'И.В. Петров'
    },
    { 
      id: 8, 
      subject: 'География', 
      title: 'Карта мира', 
      description: 'Подготовить подробную контурную карту "Страны Европы"',
      deadline: '2024-01-24',
      status: 'pending',
      teacher: 'Н.М. Соколова'
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const subjects = [...new Set(assignments.map(a => a.subject))];

  let filtered = assignments.filter(a => {
    const matchStatus = !filterStatus || a.status === filterStatus;
    const matchSubject = !filterSubject || a.subject === filterSubject;
    return matchStatus && matchSubject;
  });

  filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date() && deadline;
  };

  const getDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const markComplete = (id) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, status: 'completed' } : a
    ));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <FaCheck />;
    if (status === 'overdue') return <FaExclamationCircle />;
    return <FaClock />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'В ожидании',
      overdue: 'Просрочено',
      completed: 'Выполнено'
    };
    return labels[status] || status;
  };

  return (
    <div className="homework-page">
      {/* Header */}
      <section className="homework-header">
        <div>
          <h1>Домашние задания</h1>
          <p>Управление вашими домашними заданиями и сроками</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="label">К выполнению</span>
            <span className="value">{assignments.filter(a => a.status === 'pending').length}</span>
          </div>
          <div className="stat-item">
            <span className="label">Выполнено</span>
            <span className="value">{assignments.filter(a => a.status === 'completed').length}</span>
          </div>
          <div className="stat-item overdue">
            <span className="label">Просрочено</span>
            <span className="value">{assignments.filter(a => a.status === 'overdue').length}</span>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="homework-controls">
        <div className="filter-group">
          <label>Статус</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Все задания</option>
            <option value="pending">В ожидании</option>
            <option value="completed">Выполнено</option>
            <option value="overdue">Просрочено</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Предмет</label>
          <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            <option value="">Все предметы</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Assignments List */}
      <section className="assignments-section">
        {filtered.length > 0 ? (
          <div className="assignments-list">
            {filtered.map(assignment => (
              <div key={assignment.id} className={`assignment-card status-${assignment.status}`}>
                <div className="assignment-header">
                  <div className="assignment-title-section">
                    <h3>{assignment.title}</h3>
                    <span className="subject-badge">{assignment.subject}</span>
                  </div>
                  <div className="assignment-status">
                    <span className={`status-badge ${assignment.status}`}>
                      {getStatusIcon(assignment.status)}
                      <span>{getStatusLabel(assignment.status)}</span>
                    </span>
                  </div>
                </div>

                <p className="assignment-description">{assignment.description}</p>

                <div className="assignment-meta">
                  <div className="meta-item">
                    <span className="label">Учитель:</span>
                    <span className="value">{assignment.teacher}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Срок:</span>
                    <span className={`value deadline ${assignment.status === 'overdue' ? 'overdue' : ''}`}>
                      {new Date(assignment.deadline).toLocaleDateString('ru-RU')}
                      {assignment.status !== 'completed' && assignment.status !== 'overdue' && (
                        <span className="days-left">
                          ({getDaysLeft(assignment.deadline)} дн.)
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {assignment.status === 'overdue' && (
                  <div className="warning-banner">
                    ⚠️ Задание просрочено! Срок истёк {new Date(assignment.deadline).toLocaleDateString('ru-RU')}
                  </div>
                )}

                <div className="assignment-actions">
                  {assignment.status !== 'completed' && (
                    <button 
                      className="btn btn-success btn-small"
                      onClick={() => markComplete(assignment.id)}
                    >
                      <FaCheck /> Отметить выполненным
                    </button>
                  )}
                  <button 
                    className="btn btn-danger btn-small"
                    onClick={() => deleteAssignment(assignment.id)}
                  >
                    <FaTrash /> Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <FaClipboard />
            <p>Нет заданий по выбранным фильтрам</p>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="homework-stats">
        <h2>Статистика</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{assignments.length}</div>
            <div className="stat-label">Всего заданий</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#10B981' }}>
              {assignments.filter(a => a.status === 'completed').length}
            </div>
            <div className="stat-label">Выполнено</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#F59E0B' }}>
              {assignments.filter(a => a.status === 'pending').length}
            </div>
            <div className="stat-label">В процессе</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#EF4444' }}>
              {assignments.filter(a => a.status === 'overdue').length}
            </div>
            <div className="stat-label">Просрочено</div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="homework-tips">
        <div className="tip-card">
          <h3>💡 Совет</h3>
          <p>Не забывайте отмечать выполненные задания, чтобы отслеживать свой прогресс.</p>
        </div>
        <div className="tip-card">
          <h3>⏰ Напоминание</h3>
          <p>Выполняйте задания заранее, не оставляйте на последний момент!</p>
        </div>
      </section>
    </div>
  );
}
