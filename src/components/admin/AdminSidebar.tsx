
import { LayoutDashboard, Users, BookOpen, UserCheck, Calendar, CreditCard, MessageSquare, FileText } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/ui/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [{
  title: 'Dashboard',
  url: '/admin',
  icon: LayoutDashboard,
  badge: null
}, {
  title: 'Users',
  url: '/admin/users',
  icon: Users,
  badge: null
}, {
  title: 'Students',
  url: '/admin/students',
  icon: UserCheck,
  badge: null
}, {
  title: 'Courses',
  url: '/admin/courses',
  icon: BookOpen,
  badge: null
}, {
  title: 'Attendance',
  url: '/admin/attendance',
  icon: Calendar,
  badge: null
}, {
  title: 'Fee Management',
  url: '/admin/fees',
  icon: CreditCard,
  badge: null
}, {
  title: 'Enquiry',
  url: '/admin/enquiries',
  icon: FileText,
  badge: null
}];

export function AdminSidebar({
  currentView,
  onViewChange
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string, view: string) => {
    navigate(url);
    onViewChange(view);
  };

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar-background/95 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img 
              src="/lovable-uploads/27dc2b04-e229-49b5-aaa4-00858f77cc79.png" 
              alt="EduVeritas Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">EduVeritas</h2>
            <p className="text-xs text-muted-foreground">Elevating Education</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
            CRM MODULES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.url, item.title.toLowerCase())} 
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                      ${location.pathname === item.url ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-primary/20' : 'hover:bg-muted/30 text-muted-foreground hover:text-foreground'}
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="ml-auto bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
