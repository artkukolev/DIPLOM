import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsAPI, recordsAPI } from '../api/client';
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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadStudents();
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
  };

  const handleStudentUpdated = () => {
    loadStudents();
  };

  const handleStudentDeleted = () => {
    setSelectedStudent(null);
    loadStudents();
  };

  const handleRecordAdded = () => {
    if (selectedStudent) {
      handleStudentSelect(selectedStudent);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header с брендингом */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="ithub-brand-block">
                <div className="ithub-logo">IT</div>
                <div>
                  <span className="text-2xl font-extrabold gradient-text">IThub School</span>
                  <div className="ithub-slogan">Современное образование для будущего</div>
                </div>
              </div>
              <h1 className="text-3xl font-bold mt-2">📚 Система учёта личных дел</h1>
              <p className="text-purple-100 mt-1">учащихся школьной организации</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-100">Пользователь:</p>
              <p className="font-semibold">{user?.fullName}</p>
              <p className="text-xs text-purple-100 capitalize">
                {user?.role === 'admin' ? 'Администратор' : 'Учитель'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto p-6 mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <button
          onClick={() => navigate('/journal')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          📖 Журнал
        </button>
        <button
          onClick={() => navigate('/messages')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          💬 Сообщения
        </button>
        <button
          onClick={() => navigate('/calendar')}
          className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          📅 Календарь
        </button>
        <button
          onClick={() => navigate('/newspaper')}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          📰 Газета
        </button>
        <button
          onClick={() => navigate('/for-parents')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          👨‍👩‍👧‍👦 Для родителей
        </button>
        <button
          onClick={() => navigate('/chat')}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          💬 Чат
        </button>
        <button
          onClick={() => navigate('/support')}
          className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          🛠️ Техподдержка
        </button>
        <button
          onClick={() => navigate('/schedule')}
          className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition flex items-center gap-2"
        >
          🗓️ Расписание (управление)
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Students List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
                <h2 className="text-xl font-bold text-purple-900">👥 Учащиеся</h2>
              </div>

              <div className="p-4 border-b-2 border-purple-100">
                <input
                  type="text"
                  placeholder="Поиск по имени..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="p-4 border-b-2 border-purple-100">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
                >
                  + Добавить учащегося
                </button>
              </div>

              <div className="overflow-y-auto max-h-96">
                <StudentList
                  students={students}
                  selectedStudent={selectedStudent}
                  onSelect={handleStudentSelect}
                  onUpdated={handleStudentUpdated}
                  onDeleted={handleStudentDeleted}
                />
              </div>
            </div>
          </div>

          {/* Right Content - Details and Records */}
          <div className="lg:col-span-2">
            {showForm ? (
              <StudentForm
                onSubmit={handleStudentAdded}
                onCancel={() => setShowForm(false)}
              />
            ) : selectedStudent ? (
              <RecordsView
                student={selectedStudent}
                records={records}
                onRecordAdded={handleRecordAdded}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center h-96 flex items-center justify-center">
                <div>
                  <p className="text-4xl mb-4">👤</p>
                  <p className="text-gray-600 text-lg">
                    Выберите учащегося из списка<br/>
                    или добавьте нового
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
