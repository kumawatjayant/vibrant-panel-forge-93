
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { TopNavbar } from '@/components/admin/TopNavbar';
import { DashboardView } from '@/components/admin/DashboardView';
import { UsersView } from '@/components/admin/UsersView';
import { CoursesView } from '@/components/admin/CoursesView';
import { AttendanceView } from '@/components/admin/AttendanceView';
import { FeeManagementView } from '@/components/admin/FeeManagementView';
import { CommunicationView } from '@/components/admin/CommunicationView';
import { UserManagementView } from '@/components/admin/UserManagementView';
import { EnquiryView } from '@/components/admin/EnquiryView';
import { SettingsView } from '@/components/admin/SettingsView';
import { ProfileView } from '@/components/admin/ProfileView';
import { LoginView } from '@/components/admin/LoginView';

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentView, setCurrentView] = useState('dashboard');
  const [previousView, setPreviousView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for authentication state
    const authState = localStorage.getItem('eduveritas_auth');
    return authState === 'true';
  });
  const [theme, setTheme] = useState('dark');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Handle URL parameters for view selection
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && isAuthenticated) {
      console.log('Setting view from URL parameter:', viewParam);
      setCurrentView(viewParam);
      // Clear the URL parameter after setting the view
      setSearchParams({});
    }
  }, [searchParams, setSearchParams, isAuthenticated]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('eduveritas_auth', 'true');
  };

  // Handle view change with history
  const handleViewChange = (newView: string) => {
    console.log('View changing from', currentView, 'to', newView);
    setPreviousView(currentView);
    setCurrentView(newView);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eduveritas_auth');
    setCurrentView('dashboard');
    setPreviousView('dashboard');
    setShowSettings(false);
    setShowProfile(false);
  };

  // Handle back to homepage
  const handleBackToHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderView = () => {
    if (showProfile) {
      return <ProfileView onBack={() => {
        console.log('Profile back clicked, previousView:', previousView);
        setShowProfile(false);
        setCurrentView(previousView);
      }} />;
    }
    
    if (showSettings) {
      return <SettingsView theme={theme} onThemeToggle={toggleTheme} onBack={() => {
        console.log('Settings back clicked, previousView:', previousView);
        setShowSettings(false);
        setCurrentView(previousView);
      }} />;
    }
    
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'user-management':
        return <UserManagementView />;
      case 'users':
        return <UsersView />;
      case 'courses':
        return <CoursesView />;
      case 'attendance':
        return <AttendanceView />;
      case 'fees':
        return <FeeManagementView />;
      case 'communication':
        return <CommunicationView />;
      case 'enquiry':
        return <EnquiryView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar 
            currentView={currentView} 
            onViewChange={handleViewChange} 
          />
          <div className="flex-1 flex flex-col">
            <TopNavbar 
              onThemeToggle={toggleTheme}
              theme={theme}
              onShowSettings={() => {
                console.log('Opening settings, saving previousView as:', currentView);
                setPreviousView(currentView);
                setShowSettings(true);
              }}
              onShowProfile={() => {
                console.log('Opening profile, saving previousView as:', currentView);
                setPreviousView(currentView);
                setShowProfile(true);
              }}
              onLogout={handleLogout}
              showSettings={showSettings}
              showProfile={showProfile}
              onBackToHome={handleBackToHome}
            />
            <main className="flex-1 p-6 bg-gradient-to-br from-background via-background to-muted/20">
              <div className="animate-fade-in">
                {renderView()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminPage;
