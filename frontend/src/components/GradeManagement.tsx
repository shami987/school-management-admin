import React, { useState, useEffect } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { getGradesByStudent, createGrade, Grade, CreateGradeData } from '../services/gradeService';
import { getAllStudents, Student } from '../services/studentService';

const GradeManagement: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateGradeData>({
    studentId: '',
    subject: '',
    score: 0,
    maxScore: 100,
    term: 'Term 1',
    academicYear: '2024',
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

  const loadGrades = async (studentId: string) => {
    try {
      const data = await getGradesByStudent(studentId);
      setGrades(data);
    } catch (error) {
      console.error('Failed to load grades:', error);
    }
  };

  const handleStudentChange = (studentId: string) => {
    setSelectedStudent(studentId);
    if (studentId) {
      loadGrades(studentId);
    } else {
      setGrades([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createGrade(formData);
      setShowCreateForm(false);
      resetForm();
      if (selectedStudent) {
        loadGrades(selectedStudent);
      }
    } catch (error) {
      console.error('Failed to save grade:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: selectedStudent,
      subject: '',
      score: 0,
      maxScore: 100,
      term: 'Term 1',
      academicYear: '2024',
      remarks: '',
    });
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
        <h1 className="text-2xl font-bold text-gray-900">Grade Management</h1>
        {selectedStudent && (
          <button
            onClick={() => {
              setFormData({...formData, studentId: selectedStudent});
              setShowCreateForm(true);
            }}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Grade
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
            <h3 className="text-lg font-semibold mb-4">Add New Grade</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Score"
                  value={formData.score}
                  onChange={(e) => setFormData({...formData, score: Number(e.target.value)})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  placeholder="Max Score"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({...formData, maxScore: Number(e.target.value)})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={formData.term}
                  onChange={(e) => setFormData({...formData, term: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
                <input
                  type="text"
                  placeholder="Academic Year"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
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
                  Create Grade
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

      {/* Grades Display */}
      {selectedStudent && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Grades for {students.find(s => s.id === selectedStudent)?.firstName} {students.find(s => s.id === selectedStudent)?.lastName}
            </h3>
          </div>
          {grades.length === 0 ? (
            <div className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Grades Found</h3>
              <p className="text-gray-600">Add the first grade for this student.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grades.map((grade) => (
                  <tr key={grade.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {grade.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{grade.score}/{grade.maxScore}</div>
                      <div className="text-sm text-gray-500">{((grade.score/grade.maxScore)*100).toFixed(1)}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{grade.term}</div>
                      <div className="text-sm text-gray-500">{grade.academicYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.remarks || '-'}
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

export default GradeManagement;