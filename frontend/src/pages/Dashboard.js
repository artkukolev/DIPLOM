import React, { useState, useEffect } from 'react';
import { studentsAPI, recordsAPI, gradesAPI, attendanceAPI } from '../api/client';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import RecordsView from '../components/RecordsView';

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRecords: 0,
    totalGrades: 0,
    totalAttendance: 0
  });

  useEffect(() => {
    loadStudents();
    loadStats();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await studentsAPI.getAll(search);
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [studentsRes, recordsRes, gradesRes, attendanceRes] = await Promise.all([
        studentsAPI.getAll(),
        recordsAPI.getAll(),
        gradesAPI.getAll(),
        attendanceAPI.getAll()
      ]);

      setStats({
        totalStudents: studentsRes.data.length,
        totalRecords: recordsRes.data.length,
        totalGrades: gradesRes.data.length,
        totalAttendance: attendanceRes.data.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleStudentSelect = async (student) => {
    setSelectedStudent(student);
    try {
      const response = await recordsAPI.getByStudent(student.id);
      setRecords(response.data);
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const handleStudentAdded = () => {
    setShowForm(false);
    loadStudents();
    loadStats();
  };

  const handleStudentUpdated = () => {
    loadStudents();
  };

  const handleStudentDeleted = () => {
    setSelectedStudent(null);
    loadStudents();
    loadStats();
  };

  const handleRecordAdded = () => {
    if (selectedStudent) {
      handleStudentSelect(selectedStudent);
    }
    loadStats();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="hawk-card hawk-p-6 hawk-mb-6 hawk-animate-fade-in-up">
        <div className="hawk-flex hawk-items-center hawk-justify-between">
          <div>
            <h1 className="hawk-font-bold hawk-mb-2" style={{ fontSize: 'var(--hawk-font-size-4xl)', color: 'var(--hawk-text-primary)', fontFamily: 'Inter, sans-serif' }}>
              Добро пожаловать в EduManager
            </h1>
            <p className="hawk-text-secondary">Профессиональная система управления личными делами учащихся</p>
          </div>
          <div className="hawk-text-6xl hawk-animate-pulse">📚</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="hawk-grid hawk-grid-cols-1 md:hawk-grid-cols-2 lg:hawk-grid-cols-4 hawk-gap-6 hawk-mb-6">
        <div className="hawk-stat-card hawk-animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="hawk-flex hawk-items-center hawk-justify-between">
            <div>
              <p className="apple-stats-label">Всего учеников</p>
              <p className="apple-stats-value">{stats.totalStudents}</p>
            </div>
            <div className="apple-text-4xl">👨‍🎓</div>
          </div>
        </div>

        <div className="apple-stats-card apple-animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <div className="apple-flex apple-items-center apple-justify-between">
            <div>
              <p className="apple-stats-label">Личных дел</p>
              <p className="apple-stats-value">{stats.totalRecords}</p>
            </div>
            <div className="apple-text-4xl">📄</div>
          </div>
        </div>

        <div className="apple-stats-card apple-animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <div className="apple-flex apple-items-center apple-justify-between">
            <div>
              <p className="apple-stats-label">Оценок</p>
              <p className="apple-stats-value">{stats.totalGrades}</p>
            </div>
            <div className="apple-text-4xl">📊</div>
          </div>
        </div>

        <div className="apple-stats-card apple-animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
          <div className="apple-flex apple-items-center apple-justify-between">
            <div>
              <p className="apple-stats-label">Посещений</p>
              <p className="apple-stats-value">{stats.totalAttendance}</p>
            </div>
            <div className="apple-text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="apple-card apple-p-6 apple-mb-6 apple-animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="apple-font-bold apple-mb-4" style={{ fontSize: 'var(--elle-font-size-title-2)', color: 'var(--elle-text-primary)', fontFamily: 'Playfair Display, serif' }}>
          Быстрые действия
        </h2>
        <div className="apple-grid apple-grid-cols-1 md:apple-grid-cols-3 apple-gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="apple-button apple-button-primary apple-flex apple-items-center apple-justify-center apple-space-x-2 apple-py-3"
          >
            <span>➕</span>
            <span>Добавить ученика</span>
          </button>
          <button
            onClick={() => window.location.href = '/journal'}
            className="apple-button apple-button-secondary apple-flex apple-items-center apple-justify-center apple-space-x-2 apple-py-3"
          >
            <span>📚</span>
            <span>Журнал оценок</span>
          </button>
          <button
            onClick={() => window.location.href = '/calendar'}
            className="apple-button apple-button-secondary apple-flex apple-items-center apple-justify-center apple-space-x-2 apple-py-3"
          >
            <span>📅</span>
            <span>Календарь событий</span>
          </button>
        </div>
      </div>

      {/* Students Section */}
      <div className="apple-grid apple-grid-cols-1 lg:apple-grid-cols-2 apple-gap-6">
        <div className="apple-card apple-p-6 apple-animate-slide-in-left">
          <div className="apple-flex apple-items-center apple-justify-between apple-mb-4">
            <h2 className="apple-font-bold" style={{ fontSize: 'var(--elle-font-size-title-2)', color: 'var(--elle-text-primary)', fontFamily: 'Playfair Display, serif' }}>
              Ученики
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="apple-button apple-button-ghost apple-text-sm apple-px-3 apple-py-1"
            >
              ➕ Добавить
            </button>
          </div>

          <div className="apple-mb-4">
            <input
              type="text"
              placeholder="Поиск учеников..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="apple-input apple-w-full"
            />
          </div>

          {loading ? (
            <div className="apple-text-center apple-py-8">
              <div className="apple-spinner apple-mx-auto apple-mb-2"></div>
              <p className="apple-text-secondary">Загрузка...</p>
            </div>
          ) : (
            <StudentList
              students={students}
              onSelect={handleStudentSelect}
              selectedStudent={selectedStudent}
              onUpdate={handleStudentUpdated}
              onDelete={handleStudentDeleted}
            />
          )}
        </div>

        {/* Records Section */}
        <div className="apple-card apple-p-6 apple-animate-slide-in-right">
          <h2 className="apple-font-bold apple-mb-4" style={{ fontSize: 'var(--elle-font-size-title-2)', color: 'var(--elle-text-primary)', fontFamily: 'Playfair Display, serif' }}>
            {selectedStudent ? `Личное дело: ${selectedStudent.fullName}` : 'Выберите ученика'}
          </h2>

          {selectedStudent ? (
            <RecordsView
              student={selectedStudent}
              records={records}
              onRecordAdded={handleRecordAdded}
            />
          ) : (
            <div className="apple-text-center apple-py-12 apple-text-secondary">
              <div className="apple-text-6xl apple-mb-4">📋</div>
              <p>Выберите ученика из списка слева, чтобы просмотреть его личное дело</p>
            </div>
          )}
        </div>
      </div>

      {/* Student Form Modal */}
      {showForm && (
        <div className="apple-modal-overlay apple-animate-fade-in">
          <div className="apple-modal apple-max-w-2xl apple-w-full apple-max-h-90vh apple-overflow-y-auto apple-animate-scale-in">
            <div className="apple-modal-header">
              <h3 className="apple-font-bold" style={{ fontSize: 'var(--elle-font-size-title-2)', color: 'var(--elle-text-primary)', fontFamily: 'Playfair Display, serif' }}>
                Добавить ученика
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="apple-text-secondary hover:apple-text-label apple-text-2xl apple-transition-colors"
              >
                ×
              </button>
            </div>
            <div className="apple-modal-body">
              <StudentForm onSuccess={handleStudentAdded} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
