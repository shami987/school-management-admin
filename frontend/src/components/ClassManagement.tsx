import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Plus, Trash2, UserCheck } from 'lucide-react';
import {
  Class,
  CreateClassData,
  createClass,
  deleteClass,
  getAllClasses,
  assignTeacher,
} from '../services/classService';
import { getAllTeachers, Teacher } from '../services/teacherService';

const ClassManagement: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [formData, setFormData] = useState<CreateClassData>({
    name: '',
    grade: '',
    section: '',
    academicYear: '2024',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [classData, teacherData] = await Promise.all([
        getAllClasses(),
        getAllTeachers()
      ]);
      setClasses(classData);
      setTeachers(teacherData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClass(formData);
      setShowCreateForm(false);
      setFormData({
        name: '',
        grade: '',
        section: '',
        academicYear: '2024',
      });
      await loadData();
    } catch (error) {
      console.error('Failed to create class:', error);
    }
  };

  const handleAssignTeacher = async (classId: string) => {
    try {
      await assignTeacher(classId, selectedTeacher);
      setShowAssignForm(null);
      setSelectedTeacher('');
      await loadData();
    } catch (error) {
      console.error('Failed to assign teacher:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this class?')) {
      return;
    }

    try {
      await deleteClass(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Class
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="h-5 w-5 mr-2" />
            {classes.length} Classes
          </div>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add New Class</h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <input
                  type="text"
                  placeholder="Class Name (e.g., Grade 5A)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Grade (e.g., 5)"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Section (e.g., A)"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Academic Year"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-3">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Create Class
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAssignForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Assign Teacher</h3>
              <div className="space-y-4">
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.teacherProfile?.id}>
                      {teacher.firstName} {teacher.lastName} - {teacher.teacherProfile?.subject}
                    </option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAssignTeacher(showAssignForm)}
                    disabled={!selectedTeacher}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Assign Teacher
                  </button>
                  <button
                    onClick={() => {
                      setShowAssignForm(null);
                      setSelectedTeacher('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {classes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Found</h3>
            <p className="text-gray-600">Create your first class to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAssignForm(classItem.id)}
                      className="text-green-600 hover:text-green-900"
                      title="Assign Teacher"
                    >
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(classItem.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Class"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Grade:</span> {classItem.grade}
                  </p>
                  <p>
                    <span className="font-medium">Section:</span> {classItem.section}
                  </p>
                  <p>
                    <span className="font-medium">Academic Year:</span> {classItem.academicYear}
                  </p>
                  <p>
                    <span className="font-medium">Teacher:</span>{' '}
                    {classItem.teacher
                      ? `${classItem.teacher.user.firstName} ${classItem.teacher.user.lastName}`
                      : 'Not assigned'}
                  </p>
                  <p>
                    <span className="font-medium">Students:</span> {classItem._count?.students || 0}
                  </p>
                  <p>
                    <span className="font-medium">Created:</span>{' '}
                    {new Date(classItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
