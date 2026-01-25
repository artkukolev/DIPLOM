import { createEvent, createStore, sample } from 'effector';
import { readJson, writeJson } from '../../shared/storage';
import type { Student } from '../../shared/types';
import { DEFAULT_USER } from './currentUser';

const STUDENTS_KEY = 'studentsData';
const NEXT_STUDENT_ID_KEY = 'nextStudentId';

const sampleStudents: Student[] = [
  {
    id: 1,
    lastName: 'Петров',
    firstName: 'Алексей',
    middleName: 'Сергеевич',
    birthDate: '2007-03-15',
    gender: 'М',
    class: '10А',
    admissionYear: 2023,
    address: 'г. Москва, ул. Ленина, д. 15, кв. 42',
    parentName: 'Петрова Мария Ивановна',
    parentPhone: '+7 (123) 456-78-90',
    parentWork: "ООО 'Технологии'",
    medicalInfo: 'Группа здоровья I, аллергия на арахис',
    additionalInfo: 'Увлекается программированием, математикой',
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    id: 2,
    lastName: 'Сидорова',
    firstName: 'Мария',
    middleName: 'Александровна',
    birthDate: '2007-08-22',
    gender: 'Ж',
    class: '10А',
    admissionYear: 2023,
    address: 'г. Москва, пр. Мира, д. 25, кв. 17',
    parentName: 'Сидоров Александр Васильевич',
    parentPhone: '+7 (123) 456-78-91',
    parentWork: 'ГБОУ Школа №123',
    medicalInfo: 'Группа здоровья II, носит очки',
    additionalInfo: 'Занимается музыкой, отличница',
    createdAt: '2023-09-01T10:15:00Z',
  },
  {
    id: 3,
    lastName: 'Козлов',
    firstName: 'Иван',
    middleName: 'Дмитриевич',
    birthDate: '2007-05-10',
    gender: 'М',
    class: '10А',
    admissionYear: 2023,
    address: 'г. Москва, ул. Центральная, д. 8, кв. 24',
    parentName: 'Козлова Ольга Петровна',
    parentPhone: '+7 (123) 456-78-92',
    parentWork: 'Больница №5',
    medicalInfo: 'Группа здоровья I',
    additionalInfo: 'Занимается футболом',
    createdAt: '2023-09-01T10:30:00Z',
  },
];

const initialStudents = readJson<Student[]>(STUDENTS_KEY, []);
const initialNextId = readJson<number>(NEXT_STUDENT_ID_KEY, 1);

export const studentAdded = createEvent<Omit<Student, 'id' | 'createdAt'>>();
export const studentUpdated = createEvent<Student>();
export const studentDeleted = createEvent<number>();
export const sampleDataEnsured = createEvent();

export const $students = createStore<Student[]>(initialStudents)
  .on(studentAdded, (list, payload) => {
    const nextId = readJson<number>(NEXT_STUDENT_ID_KEY, initialNextId);
    const student: Student = {
      id: nextId,
      createdAt: new Date().toISOString(),
      ...payload,
      class: payload.class || DEFAULT_USER.class,
      admissionYear: payload.admissionYear || 2023,
    };
    writeJson(NEXT_STUDENT_ID_KEY, nextId + 1);
    return [...list, student];
  })
  .on(studentUpdated, (list, st) => list.map((s) => (s.id === st.id ? st : s)))
  .on(studentDeleted, (list, id) => list.filter((s) => s.id !== id))
  .on(sampleDataEnsured, (list) => {
    if (list.length > 0) return list;
    writeJson(NEXT_STUDENT_ID_KEY, 4);
    return sampleStudents;
  });

export const $classStudents = $students.map((list) => list.filter((s) => s.class === DEFAULT_USER.class));

sample({
  clock: [$students],
  fn: ([students]) => writeJson(STUDENTS_KEY, students),
});

