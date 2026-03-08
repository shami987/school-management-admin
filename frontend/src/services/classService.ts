import api from './api';

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  academicYear: string;
  createdAt: string;
  _count?: {
    students: number;
  };
}

export interface CreateClassData {
  name: string;
  grade: string;
  section: string;
  academicYear: string;
}

export const getAllClasses = async (): Promise<Class[]> => {
  const response = await api.get('/classes');
  return response.data.classes;
};

export const createClass = async (data: CreateClassData) => {
  const response = await api.post('/classes', data);
  return response.data;
};

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/classes/${id}`);
  return response.data;
};