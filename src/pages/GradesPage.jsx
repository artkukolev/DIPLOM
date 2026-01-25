import React, { useState } from 'react';
import { FaFilter, FaSort, FaPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import './GradesPage.css';

export default function GradesPage({ user }) {
  const [grades, setGrades] = useState([
    { id: 1, subject: 'Русский язык', grade: 5, date: '2024-01-15', teacher: 'И.В. Петров', type: 'Контрольная' },
    { id: 2, subject: 'Математика', grade: 4, date: '2024-01-14', teacher: 'С.А. Иванов', type: 'Самостоятельная' },
    { id: 3, subject: 'История', grade: 5, date: '2024-01-13', teacher: 'О.С. Сидоров', type: 'Устный ответ' },
    { id: 4, subject: 'Физика', grade: 3, date: '2024-01-12', teacher: 'М.Е. Федоров', type: 'Практическая' },
    { id: 5, subject: 'Химия', grade: 4, date: '2024-01-11', teacher: 'А.В. Волков', type: 'Лабораторная' },
    { id: 6, subject: 'Английский язык', grade: 5, date: '2024-01-10', teacher: 'Е.А. Козлова', type: 'Контрольная' },
    { id: 7, subject: 'Литература', grade: 5, date: '2024-01-09', teacher: 'И.В. Петров', type: 'Сочинение' },
    { id: 8, subject: 'География', grade: 4, date: '2024-01-08', teacher: 'Н.М. Соколова', type: 'Устный ответ' },
    { id: 9, subject: 'Информатика', grade: 5, date: '2024-01-07', teacher: 'П.О. Новиков', type: 'Практическая' },
    { id: 10, subject: 'Обществознание', grade: 4, date: '2024-01-06', teacher: 'Л.Н. Сергеев', type: 'Эссе' },
  ]);

  const [filterSubject, setFilterSubject] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showForm, setShowForm] = useState(false);

  const subjects = [...new Set(grades.map(g => g.subject))];
  const gradeTypes = [...new Set(grades.map(g => g.type))];

  let filtered = grades.filter(g => {
    const matchSubject = !filterSubject || g.subject === filterSubject;
    const matchGrade = !filterGrade || g.grade === parseInt(filterGrade);
    const matchSearch = !searchTerm || 
      g.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSubject && matchGrade && matchSearch;
  });

  if (sortBy === 'date') {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'grade') {
    filtered.sort((a, b) => b.grade - a.grade);
  } else if (sortBy === 'subject') {
    filtered.sort((a, b) => a.subject.localeCompare(b.subject));
  }

  const avgGrade = grades.length > 0 
    ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(2)
    : 0;

  const handleDelete = (id) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const getGradeColor = (grade) => {
    if (grade === 5) return 'grade-5';
    if (grade === 4) return 'grade-4';
    if (grade === 3) return 'grade-3';
    return 'grade-2';
  };

  return (
    <div className="grades-page">
      {/* Header */}
      <section className="grades-header">
        <div>
          <h1>Оценки</h1>
          <p>Управление и просмотр ваших оценок</p>
        </div>
        <div className="header-stats">
          <div className="stat-info">
            <span className="label">Средняя оценка</span>
            <span className="value">{avgGrade}</span>
          </div>
          <div className="stat-info">
            <span className="label">Всего оценок</span>
            <span className="value">{grades.length}</span>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="grades-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Поиск по предмету или учителю..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Предмет</label>
            <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="">Все предметы</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Оценка</label>
            <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)}>
              <option value="">Все оценки</option>
              <option value="5">5 (Отлично)</option>
              <option value="4">4 (Хорошо)</option>
              <option value="3">3 (Удовлетворительно)</option>
              <option value="2">2 (Неудовлетворительно)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Сортировка</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">По дате (новые)</option>
              <option value="grade">По оценке (выше)</option>
              <option value="subject">По предмету (А-Я)</option>
            </select>
          </div>
        </div>

        {user.role === 'teacher' && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <FaPlus /> Добавить оценку
          </button>
        )}
      </section>

      {/* Form for adding grades (for teachers) */}
      {showForm && user.role === 'teacher' && (
        <section className="add-grade-form glass-card">
          <h3>Добавить новую оценку</h3>
          <div className="form-grid">
            <input type="text" placeholder="Предмет" />
            <input type="number" min="2" max="5" placeholder="Оценка" />
            <input type="text" placeholder="Ученик" />
            <input type="date" />
            <input type="text" placeholder="Тип работы" />
            <button className="btn btn-success">Сохранить</button>
          </div>
        </section>
      )}

      {/* Grades Table */}
      <section className="grades-table-section">
        {filtered.length > 0 ? (
          <div className="table-wrapper">
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Предмет</th>
                  <th>Оценка</th>
                  <th>Тип работы</th>
                  <th>Учитель</th>
                  <th>Дата</th>
                  {user.role === 'teacher' && <th>Действия</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map(grade => (
                  <tr key={grade.id} className="grade-row">
                    <td className="subject-cell">{grade.subject}</td>
                    <td>
                      <span className={`grade-badge ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td>{grade.type}</td>
                    <td>{grade.teacher}</td>
                    <td className="date-cell">
                      {new Date(grade.date).toLocaleDateString('ru-RU')}
                    </td>
                    {user.role === 'teacher' && (
                      <td className="actions-cell">
                        <button className="btn-icon btn-edit" title="Редактировать">
                          <FaEdit />
                        </button>
                        <button 
                          className="btn-icon btn-delete" 
                          title="Удалить"
                          onClick={() => handleDelete(grade.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">
            <p>Оценки не найдены</p>
          </div>
        )}
      </section>

      {/* Grade Statistics */}
      <section className="grade-stats">
        <h2>Статистика по предметам</h2>
        <div className="stats-cards">
          {subjects.map(subject => {
            const subjectGrades = grades.filter(g => g.subject === subject);
            const avg = (subjectGrades.reduce((sum, g) => sum + g.grade, 0) / subjectGrades.length).toFixed(2);
            return (
              <div key={subject} className="subject-stat">
                <h4>{subject}</h4>
                <p className="avg-grade">Средняя: {avg}</p>
                <p className="count">Оценок: {subjectGrades.length}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
