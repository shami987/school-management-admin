import api from './api';

export interface Refund {
  id: string;
  amount: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
  processedDate?: string;
  processedBy?: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    class: {
      name: string;
    };
  };
}

export interface CreateRefundData {
  studentId: string;
  amount: number;
  reason: string;
}

export const getAllRefunds = async (status?: string): Promise<Refund[]> => {
  const params = status ? `?status=${status}` : '';
  const response = await api.get(`/refunds${params}`);
  return response.data.refunds;
};

export const approveRefund = async (id: string, adminNotes?: string) => {
  const response = await api.put(`/refunds/${id}/approve`, { adminNotes });
  return response.data;
};

export const rejectRefund = async (id: string, adminNotes?: string) => {
  const response = await api.put(`/refunds/${id}/reject`, { adminNotes });
  return response.data;
};