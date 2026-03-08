import api from './api';

export interface Device {
  id: string;
  deviceId: string;
  deviceName: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: string;
  verifiedAt?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const getPendingDevices = async (): Promise<Device[]> => {
  const response = await api.get('/devices/pending');
  return response.data.devices;
};

export const getAllDevices = async (): Promise<Device[]> => {
  const response = await api.get('/devices');
  return response.data.devices;
};

export const verifyDevice = async (deviceId: string) => {
  const response = await api.put(`/devices/${deviceId}/verify`);
  return response.data;
};

export const rejectDevice = async (deviceId: string) => {
  const response = await api.put(`/devices/${deviceId}/reject`);
  return response.data;
};