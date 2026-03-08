import api from './api';

export interface DashboardStats {
  totalStudents: number;
  totalParents: number;
  totalTeachers: number;
  totalClasses: number;
  pendingDevices: number;
  pendingRefunds: number;
  totalFeeCollection: number;
  attendanceRate: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return response.data.stats;
};
