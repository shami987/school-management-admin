import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, GraduationCap, Users, Wallet } from 'lucide-react';
import { getDashboardStats, DashboardStats } from '../services/dashboardService';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the School Management System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalStudents || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Parents</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalParents || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-emerald-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalTeachers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.totalClasses || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Devices</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.pendingDevices || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Refunds</p>
              <p className="text-2xl font-semibold text-gray-900">{stats?.pendingRefunds || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Fee Collection</p>
              <p className="text-2xl font-semibold text-gray-900">
                {(stats?.totalFeeCollection || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-cyan-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance Rate (30 days)</p>
              <p className="text-2xl font-semibold text-gray-900">{(stats?.attendanceRate || 0).toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
