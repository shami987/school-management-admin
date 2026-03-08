import api from './api';

export interface Attendance {
  id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
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

export interface CreateAttendanceData {
  studentId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  remarks?: string;
}

export const getAttendanceByStudent = async (studentId: string, startDate?: string, endDate?: string): Promise<Attendance[]> => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const response = await api.get(`/attendance/student/${studentId}?${params.toString()}`);
  return response.data.attendance;
};

export const markAttendance = async (data: CreateAttendanceData) => {
  const response = await api.post('/attendance', data);
  return response.data;
};