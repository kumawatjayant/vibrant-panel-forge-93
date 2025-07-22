import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Bell, Settings, User, LogOut, Moon, Sun, Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
interface TopNavbarProps {
  onThemeToggle: () => void;
  theme: string;
  onShowSettings: () => void;
  onShowProfile: () => void;
  onLogout: () => void;
  showSettings: boolean;
  showProfile: boolean;
  onBackToHome: () => void;
}
const notifications = [{
  id: 1,
  title: 'New student registration',
  description: 'Student John Doe signed up for Software Engineering',
  time: '2 min ago',
  unread: true
}, {
  id: 2,
  title: 'Course completion alert',
  description: 'Sarah Wilson completed Data Structures course',
  time: '5 min ago',
  unread: true
}, {
  id: 3,
  title: 'Fee payment received',
  description: 'Payment of ₹299 received from Mike Johnson',
  time: '10 min ago',
  unread: false
}];
export function TopNavbar({
  onThemeToggle,
  theme,
  onShowSettings,
  onShowProfile,
  onLogout,
  showSettings,
  showProfile,
  onBackToHome
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    toggleSidebar
  } = useSidebar();
  const {
    toast
  } = useToast();
  const unreadCount = notifications.filter(n => n.unread).length;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for: "${searchQuery}"`
      });
    }
  };
  const handleNotificationClick = (notificationId: number) => {
    toast({
      title: "Notification",
      description: `Opening notification #${notificationId}`
    });
  };
  const handleMarkAllRead = () => {
    toast({
      title: "Notifications",
      description: "All notifications marked as read"
    });
  };
  return <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <form onSubmit={handleSearch} className="relative hidden sm:block">
          
          
        </form>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={onThemeToggle}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 glass border-0" align="end">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                Mark all read
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(notification => <div key={notification.id} className={`p-4 border-b border-border/50 hover:bg-muted/20 cursor-pointer ${notification.unread ? 'bg-muted/10' : ''}`} onClick={() => handleNotificationClick(notification.id)}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {notification.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                </div>)}
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Admin" />
                <AvatarFallback>EV</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass border-0" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@eduveritas.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onShowProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShowSettings}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
}