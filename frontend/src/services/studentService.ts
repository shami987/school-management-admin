import api from './api';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
  class: {
    id: string;
    name: string;
    grade: string;
    section: string;
  };
  parent: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get('/students');
  return response.data.students;
};

export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data.student;
};