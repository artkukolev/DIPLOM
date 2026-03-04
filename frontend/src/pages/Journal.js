import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimetableView from './TimetableView';
import AttendanceMarking from './AttendanceMarking';
import GradesInput from './GradesInput';

export default function Journal() {
  const [activeTab, setActiveTab] = useState('timetable');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-light to-white">
      {/* Header */}
      <div className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="ithub-brand-block">
                <div className="ithub-logo">IT</div>
                <div>
                  <span className="text-2xl font-extrabold gradient-text">IThub School</span>
                  <div className="ithub-slogan">Электронный журнал — расписание, посещаемость, оценки</div>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-1">Электронный журнал</h1>
              <p className="text-purple-200">Управление расписанием, посещаемостью и оценками</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'timetable'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Расписание
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'attendance'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📝 Посещаемость
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === 'grades'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              ⭐ Оценки
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'timetable' && <TimetableView />}
        {activeTab === 'attendance' && <AttendanceMarking />}
        {activeTab === 'grades' && <GradesInput />}
      </div>
    </div>
  );
}
