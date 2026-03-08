import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  DollarSign, 
  Settings,
  LogOut,
  BarChart3,
  UserCheck
} from 'lucide-react';
import { logout, getCurrentUser } from '../services/authService';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/teachers', icon: UserCheck, label: 'Teachers' },
    { path: '/classes', icon: GraduationCap, label: 'Classes' },
    { path: '/grades', icon: BookOpen, label: 'Grades' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/refunds', icon: DollarSign, label: 'Refunds' },
    { path: '/devices', icon: Settings, label: 'Devices' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              School Admin
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  isActive(item.path) 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;