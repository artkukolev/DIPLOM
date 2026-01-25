import { createEvent, createStore, sample } from 'effector';
import { readJson, writeJson } from '../../shared/storage';
import type { Grade, SubjectKey } from '../../shared/types';
import { DEFAULT_USER } from './currentUser';

const GRADES_KEY = 'gradesData';
const NEXT_GRADE_ID_KEY = 'nextGradeId';

const sampleGrades: Grade[] = [
  {
    id: 1,
    studentId: 1,
    subject: 'math',
    value: 5,
    date: '2023-09-10',
    comment: 'Контрольная работа по алгебре',
    teacherId: 1,
    createdAt: '2023-09-10T10:00:00Z',
  },
  {
    id: 2,
    studentId: 1,
    subject: 'physics',
    value: 4,
    date: '2023-09-12',
    comment: 'Лабораторная работа',
    teacherId: 1,
    createdAt: '2023-09-12T14:30:00Z',
  },
  {
    id: 3,
    studentId: 2,
    subject: 'math',
    value: 5,
    date: '2023-09-10',
    comment: 'Контрольная работа по алгебре',
    teacherId: 1,
    createdAt: '2023-09-10T10:00:00Z',
  },
  {
    id: 4,
    studentId: 2,
    subject: 'informatics',
    value: 5,
    date: '2023-09-15',
    comment: 'Практическая работа',
    teacherId: 1,
    createdAt: '2023-09-15T11:20:00Z',
  },
  {
    id: 5,
    studentId: 3,
    subject: 'math',
    value: 3,
    date: '2023-09-10',
    comment: 'Контрольная работа по алгебре',
    teacherId: 1,
    createdAt: '2023-09-10T10:00:00Z',
  },
];

const initialGrades = readJson<Grade[]>(GRADES_KEY, []);
const initialNextId = readJson<number>(NEXT_GRADE_ID_KEY, 1);

export const gradeAdded = createEvent<{ studentId: number; subject: SubjectKey; value: 2 | 3 | 4 | 5; date: string; comment?: string }>();
export const gradesDeletedByStudent = createEvent<number>();
export const sampleGradesEnsured = createEvent();

export const $grades = createStore<Grade[]>(initialGrades)
  .on(gradeAdded, (list, payload) => {
    const nextId = readJson<number>(NEXT_GRADE_ID_KEY, initialNextId);
    const grade: Grade = {
      id: nextId,
      studentId: payload.studentId,
      subject: payload.subject,
      value: payload.value,
      date: payload.date,
      comment: payload.comment,
      teacherId: DEFAULT_USER.id,
      createdAt: new Date().toISOString(),
    };
    writeJson(NEXT_GRADE_ID_KEY, nextId + 1);
    return [...list, grade];
  })
  .on(gradesDeletedByStudent, (list, studentId) => list.filter((g) => g.studentId !== studentId))
  .on(sampleGradesEnsured, (list) => {
    if (list.length > 0) return list;
    writeJson(NEXT_GRADE_ID_KEY, 6);
    return sampleGrades;
  });

sample({
  clock: [$grades],
  fn: ([grades]) => writeJson(GRADES_KEY, grades),
});

