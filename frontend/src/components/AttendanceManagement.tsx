import React, { useState, useEffect } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { getAttendanceByStudent, markAttendance, Attendance, CreateAttendanceData } from '../services/attendanceService';
import { getAllStudents, Student } from '../services/studentService';

const AttendanceManagement: React.FC = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateAttendanceData>({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'PRESENT',
    remarks: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async (studentId: string) => {
    try {
      const data = await getAttendanceByStudent(studentId);
      setAttendance(data);
    } catch (error) {
      console.error('Failed to load attendance:', error);
    }
  };

  const handleStudentChange = (studentId: string) => {
    setSelectedStudent(studentId);
    if (studentId) {
      loadAttendance(studentId);
    } else {
      setAttendance([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await markAttendance(formData);
      setShowCreateForm(false);
      resetForm();
      if (selectedStudent) {
        loadAttendance(selectedStudent);
      }
    } catch (error) {
      console.error('Failed to mark attendance:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: selectedStudent,
      date: new Date().toISOString().split('T')[0],
      status: 'PRESENT',
      remarks: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800';
      case 'ABSENT': return 'bg-red-100 text-red-800';
      case 'LATE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        {selectedStudent && (
          <button
            onClick={() => {
              setFormData({...formData, studentId: selectedStudent});
              setShowCreateForm(true);
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Mark Attendance
          </button>
        )}
      </div>

      {/* Student Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Student</h3>
        <select
          value={selectedStudent}
          onChange={(e) => handleStudentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Select a student...</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName} - {student.class.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Mark Attendance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'PRESENT' | 'ABSENT' | 'LATE'})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LATE">Late</option>
              </select>
              <textarea
                placeholder="Remarks (optional)"
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                rows={3}
              />
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Mark Attendance
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendance Display */}
      {selectedStudent && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Attendance for {students.find(s => s.id === selectedStudent)?.firstName} {students.find(s => s.id === selectedStudent)?.lastName}
            </h3>
          </div>
          {attendance.length === 0 ? (
            <div className="p-6 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attendance Records</h3>
              <p className="text-gray-600">Start marking attendance to see records here.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.remarks || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;