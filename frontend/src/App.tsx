import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import ClassManagement from './components/ClassManagement';
import GradeManagement from './components/GradeManagement';
import AttendanceManagement from './components/AttendanceManagement';
import RefundManagement from './components/RefundManagement';
import DeviceManagement from './components/DeviceManagement';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './services/authService';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />
            } 
          />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<StudentManagement />} />
                    <Route path="/teachers" element={<TeacherManagement />} />
                    <Route path="/classes" element={<ClassManagement />} />
                    <Route path="/grades" element={<GradeManagement />} />
                    <Route path="/attendance" element={<AttendanceManagement />} />
                    <Route path="/refunds" element={<RefundManagement />} />
                    <Route path="/devices" element={<DeviceManagement />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
