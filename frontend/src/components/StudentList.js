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
    <div className="apple-list">
      {students.length === 0 ? (
        <div className="apple-empty-state">
          <p>😔 Учащихся не найдено</p>
        </div>
      ) : (
        students.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelect(student)}
            className={`apple-list-item ${
              selectedStudent?.id === student.id
                ? 'apple-list-item-selected'
                : 'apple-list-item-hover'
            }`}
          >
            <div className="apple-list-item-content">
              <div className="apple-list-item-main">
                <p className="apple-list-item-title">
                  {student.lastName} {student.firstName}
                </p>
                <p className="apple-list-item-subtitle">
                  {student.class} • {student.grade} класс
                </p>
              </div>
              <button
                onClick={(e) => handleDelete(e, student.id)}
                className="apple-button-icon apple-button-destructive"
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
