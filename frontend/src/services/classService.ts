import api from './api';

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  academicYear: string;
  teacherId?: string;
  teacher?: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
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

export interface UpdateClassData {
  teacherId?: string;
}

export const getAllClasses = async (): Promise<Class[]> => {
  const response = await api.get('/classes');
  return response.data.classes;
};

export const createClass = async (data: CreateClassData) => {
  const response = await api.post('/classes', data);
  return response.data;
};

export const updateClass = async (id: string, data: UpdateClassData) => {
  const response = await api.put(`/classes/${id}`, data);
  return response.data;
};

export const assignTeacher = async (classId: string, teacherId: string) => {
  const response = await api.put(`/classes/${classId}/assign-teacher`, { teacherId });
  return response.data;
};

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/classes/${id}`);
  return response.data;
};