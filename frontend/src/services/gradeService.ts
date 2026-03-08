import api from './api';

export interface Grade {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  term: string;
  academicYear: string;
  remarks?: string;
  createdAt: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    class: {
      name: string;
    };
  };
}

export interface CreateGradeData {
  studentId: string;
  subject: string;
  score: number;
  maxScore: number;
  term: string;
  academicYear: string;
  remarks?: string;
}

export const getGradesByStudent = async (studentId: string): Promise<Grade[]> => {
  const response = await api.get(`/grades/student/${studentId}`);
  return response.data.grades;
};

export const createGrade = async (data: CreateGradeData) => {
  const response = await api.post('/grades', data);
  return response.data;
};