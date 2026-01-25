import React, { useState } from 'react';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaChalkboardUser } from 'react-icons/fa';
import './SchedulePage.css';

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(0);

  const schedule = {
    Monday: [
      { id: 1, time: '09:00', subject: 'Русский язык', room: '204', teacher: 'И.В. Петров', duration: '45 мин' },
      { id: 2, time: '09:50', subject: 'Математика', room: '301', teacher: 'С.А. Иванов', duration: '45 мин' },
      { id: 3, time: '10:40', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 4, time: '10:50', subject: 'История', room: '205', teacher: 'О.С. Сидоров', duration: '45 мин' },
      { id: 5, time: '11:40', subject: 'Перемена', type: 'break', duration: '15 мин' },
      { id: 6, time: '11:55', subject: 'Физика', room: '302', teacher: 'М.Е. Федоров', duration: '45 мин' },
      { id: 7, time: '12:45', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 8, time: '12:55', subject: 'Английский язык', room: '103', teacher: 'Е.А. Козлова', duration: '45 мин' },
    ],
    Tuesday: [
      { id: 1, time: '09:00', subject: 'Математика', room: '301', teacher: 'С.А. Иванов', duration: '45 мин' },
      { id: 2, time: '09:50', subject: 'Английский язык', room: '103', teacher: 'Е.А. Козлова', duration: '45 мин' },
      { id: 3, time: '10:40', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 4, time: '10:50', subject: 'Химия', room: '402', teacher: 'А.В. Волков', duration: '45 мин' },
      { id: 5, time: '11:40', subject: 'Перемена', type: 'break', duration: '15 мин' },
      { id: 6, time: '11:55', subject: 'Литература', room: '204', teacher: 'И.В. Петров', duration: '45 мин' },
      { id: 7, time: '12:45', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 8, time: '12:55', subject: 'Физкультура', room: 'Спортзал', teacher: 'В.П. Орлов', duration: '45 мин' },
    ],
    Wednesday: [
      { id: 1, time: '09:00', subject: 'История', room: '205', teacher: 'О.С. Сидоров', duration: '45 мин' },
      { id: 2, time: '09:50', subject: 'География', room: '206', teacher: 'Н.М. Соколова', duration: '45 мин' },
      { id: 3, time: '10:40', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 4, time: '10:50', subject: 'Информатика', room: '501', teacher: 'П.О. Новиков', duration: '45 мин' },
      { id: 5, time: '11:40', subject: 'Перемена', type: 'break', duration: '15 мин' },
      { id: 6, time: '11:55', subject: 'Русский язык', room: '204', teacher: 'И.В. Петров', duration: '45 мин' },
      { id: 7, time: '12:45', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 8, time: '12:55', subject: 'Обществознание', room: '207', teacher: 'Л.Н. Сергеев', duration: '45 мин' },
    ],
    Thursday: [
      { id: 1, time: '09:00', subject: 'Физика', room: '302', teacher: 'М.Е. Федоров', duration: '45 мин' },
      { id: 2, time: '09:50', subject: 'Биология', room: '403', teacher: 'Т.И. Морозова', duration: '45 мин' },
      { id: 3, time: '10:40', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 4, time: '10:50', subject: 'Химия', room: '402', teacher: 'А.В. Волков', duration: '45 мин' },
      { id: 5, time: '11:40', subject: 'Перемена', type: 'break', duration: '15 мин' },
      { id: 6, time: '11:55', subject: 'Английский язык', room: '103', teacher: 'Е.А. Козлова', duration: '45 мин' },
      { id: 7, time: '12:45', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 8, time: '12:55', subject: 'Музыка', room: '108', teacher: 'Р.М. Волков', duration: '45 мин' },
    ],
    Friday: [
      { id: 1, time: '09:00', subject: 'Математика', room: '301', teacher: 'С.А. Иванов', duration: '45 мин' },
      { id: 2, time: '09:50', subject: 'Русский язык', room: '204', teacher: 'И.В. Петров', duration: '45 мин' },
      { id: 3, time: '10:40', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 4, time: '10:50', subject: 'Литература', room: '204', teacher: 'И.В. Петров', duration: '45 мин' },
      { id: 5, time: '11:40', subject: 'Перемена', type: 'break', duration: '15 мин' },
      { id: 6, time: '11:55', subject: 'История', room: '205', teacher: 'О.С. Сидоров', duration: '45 мин' },
      { id: 7, time: '12:45', subject: 'Перемена', type: 'break', duration: '10 мин' },
      { id: 8, time: '12:55', subject: 'Изобразительное искусство', room: '104', teacher: 'Н.В. Голубева', duration: '45 мин' },
    ]
  };

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const dayKeys = Object.keys(schedule);
  const currentDaySchedule = schedule[dayKeys[selectedDay]];

  const isBreak = (lesson) => lesson.type === 'break';

  const getSubjectColor = (subject) => {
    const colors = {
      'Русский язык': 'subject-lang',
      'Математика': 'subject-math',
      'История': 'subject-history',
      'Физика': 'subject-physics',
      'Химия': 'subject-chemistry',
      'Английский язык': 'subject-english',
      'Литература': 'subject-literature',
      'География': 'subject-geo',
      'Информатика': 'subject-it',
      'Обществознание': 'subject-social',
      'Биология': 'subject-bio',
      'Физкультура': 'subject-pe',
      'Музыка': 'subject-music',
      'Изобразительное искусство': 'subject-art'
    };
    return colors[subject] || 'subject-default';
  };

  return (
    <div className="schedule-page">
      {/* Header */}
      <section className="schedule-header">
        <div>
          <h1>Расписание</h1>
          <p>Расписание занятий на неделю</p>
        </div>
        <div className="header-icon">
          <FaCalendar />
        </div>
      </section>

      {/* Day Selector */}
      <section className="day-selector">
        {days.map((day, index) => (
          <button
            key={index}
            className={`day-btn ${selectedDay === index ? 'active' : ''}`}
            onClick={() => setSelectedDay(index)}
          >
            <span className="day-name">{day}</span>
            <span className="day-number">{index + 1}</span>
          </button>
        ))}
      </section>

      {/* Schedule Timeline */}
      <section className="schedule-timeline">
        <h2>{days[selectedDay]}</h2>
        
        <div className="lessons-container">
          {currentDaySchedule.map((lesson, idx) => (
            <div key={lesson.id} className={`lesson-item ${isBreak(lesson) ? 'break' : ''}`}>
              {!isBreak(lesson) && (
                <>
                  <div className="timeline-marker">
                    <div className="timeline-dot"></div>
                  </div>
                  <div className={`lesson-card ${getSubjectColor(lesson.subject)}`}>
                    <div className="lesson-header">
                      <h3>{lesson.subject}</h3>
                      <span className="duration">{lesson.duration}</span>
                    </div>
                    <div className="lesson-details">
                      <div className="detail-item">
                        <FaClock />
                        <span>{lesson.time}</span>
                      </div>
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{lesson.room}</span>
                      </div>
                      <div className="detail-item">
                        <FaChalkboardUser />
                        <span>{lesson.teacher}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {isBreak(lesson) && (
                <>
                  <div className="timeline-marker">
                    <div className="timeline-dot break-dot"></div>
                  </div>
                  <div className="break-card">
                    <span className="break-text">☕ {lesson.subject} ({lesson.duration})</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Info */}
      <section className="schedule-info">
        <div className="info-card">
          <h3>📅 Расписание звонков</h3>
          <div className="bells-table">
            <div className="bell-row">
              <span>1-й урок:</span>
              <span>09:00 - 09:45</span>
            </div>
            <div className="bell-row">
              <span>2-й урок:</span>
              <span>09:50 - 10:35</span>
            </div>
            <div className="bell-row">
              <span>3-й урок:</span>
              <span>10:50 - 11:35</span>
            </div>
            <div className="bell-row">
              <span>4-й урок:</span>
              <span>11:55 - 12:40</span>
            </div>
            <div className="bell-row">
              <span>5-й урок:</span>
              <span>12:55 - 13:40</span>
            </div>
          </div>
        </div>
        <div className="info-card">
          <h3>⚙️ Примечание</h3>
          <p>Расписание может быть изменено администрацией школы. Следите за объявлениями!</p>
          <p>Все уроки проходят в соответствии с установленными временными рамками.</p>
        </div>
      </section>

      {/* Subject Legend */}
      <section className="subject-legend">
        <h2>Легенда предметов</h2>
        <div className="legend-grid">
          <div className="legend-item">
            <div className="legend-color subject-lang"></div>
            <span>Русский язык</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-math"></div>
            <span>Математика</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-history"></div>
            <span>История</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-physics"></div>
            <span>Физика</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-chemistry"></div>
            <span>Химия</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-english"></div>
            <span>Английский</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-literature"></div>
            <span>Литература</span>
          </div>
          <div className="legend-item">
            <div className="legend-color subject-geo"></div>
            <span>География</span>
          </div>
        </div>
      </section>
    </div>
  );
}
