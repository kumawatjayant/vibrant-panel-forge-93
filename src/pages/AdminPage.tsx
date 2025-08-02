
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { TopNavbar } from '@/components/admin/TopNavbar';
import { DashboardView } from '@/components/admin/DashboardView';
import { UsersView } from '@/components/admin/UsersView';
import { CoursesView } from '@/components/admin/CoursesView';
import { EnquiryView } from '@/components/admin/EnquiryView';
import { FeeManagementView } from '@/components/admin/FeeManagementView';
import { AttendanceView } from '@/components/admin/AttendanceView';
import { ReportsView } from '@/components/admin/ReportsView';
import { SettingsView } from '@/components/admin/SettingsView';
import { ProfileView } from '@/components/admin/ProfileView';
import { LoginForm } from '@/components/auth/LoginForm';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { StudentAddPage } from '@/components/admin/StudentAddPage';
import { StudentEditPage } from '@/components/admin/StudentEditPage';
import { StudentViewPage } from '@/components/admin/StudentViewPage';
import { CourseAddPage } from '@/components/admin/CourseAddPage';
import { CourseViewPage } from '@/components/admin/CourseViewPage';
import { UserAddPage } from '@/components/admin/UserAddPage';
import { UserEditPage } from '@/components/admin/UserEditPage';
import { UserViewPage } from '@/components/admin/UserViewPage';
import { AddEnquiryForm } from '@/components/admin/AddEnquiryForm';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const { signOut } = useAuth();

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/*" element={
        <ProtectedRoute requireAdmin>
          <div className="flex min-h-screen bg-background">
            <AdminSidebar 
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            <div className="flex-1 flex flex-col">
              <TopNavbar />
              <main className="flex-1 overflow-auto p-6">
                <Routes>
                  <Route path="/" element={<DashboardView />} />
                  <Route path="/users" element={<UsersView />} />
                  <Route path="/courses" element={<CoursesView />} />
                  <Route path="/enquiries" element={<EnquiryView />} />
                  <Route path="/fees" element={<FeeManagementView />} />
                  <Route path="/attendance" element={<AttendanceView />} />
                  <Route path="/reports" element={<ReportsView />} />
                  <Route path="/settings" element={
                    <SettingsView 
                      theme={theme}
                      onThemeToggle={toggleTheme}
                      onBack={() => setCurrentView('dashboard')}
                    />
                  } />
                  <Route path="/profile" element={
                    <ProfileView 
                      onBack={() => setCurrentView('dashboard')}
                    />
                  } />
                  <Route path="/student/add" element={<StudentAddPage />} />
                  <Route path="/student/edit/:id" element={<StudentEditPage />} />
                  <Route path="/student/view/:id" element={<StudentViewPage />} />
                  <Route path="/course/add" element={<CourseAddPage />} />
                  <Route path="/course/view/:id" element={<CourseViewPage />} />
                  <Route path="/user/add" element={<UserAddPage />} />
                  <Route path="/user/edit/:id" element={<UserEditPage />} />
                  <Route path="/user/view/:id" element={<UserViewPage />} />
                  <Route path="/enquiry/add" element={<AddEnquiryForm />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
