import api from './api';

export interface Teacher {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subject?: string;
  phone?: string;
  createdAt: string;
}

export interface CreateTeacherData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  subject?: string;
  phone?: string;
}

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get('/teachers');
  return response.data.teachers;
};

export const createTeacher = async (data: CreateTeacherData) => {
  const response = await api.post('/teachers', data);
  return response.data;
};

export const deleteTeacher = async (id: string) => {
  const response = await api.delete(`/teachers/${id}`);
  return response.data;
};