import React from 'react';
import { studentsAPI } from '../api/client';

const StudentList = ({ students, selectedStudent, onSelect, onUpdated, onDeleted }) => {
  const handleDelete = async (e, studentId) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить этого учащегося и все его личные дела?')) {
      try {
        await studentsAPI.delete(studentId);
        onDeleted();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Ошибка при удалении');
      }
    }
  };

  return (
    <div className="divide-y divide-purple-100">
      {students.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <p>😔 Учащихся не найдено</p>
        </div>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelect(student)}
            className={`p-3 cursor-pointer transition ${
              selectedStudent?.id === student.id
                ? 'bg-gradient-to-r from-purple-200 to-pink-100 border-l-4 border-purple-500'
                : 'hover:bg-purple-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {student.lastName} {student.firstName}
                </p>
                <p className="text-sm text-gray-600">
                  {student.class} • {student.grade} класс
                </p>
              </div>
              <button
                onClick={(e) => handleDelete(e, student.id)}
                className="text-red-500 hover:text-red-700 text-sm font-bold ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentList;
