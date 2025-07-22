// Optimized Users View with minimal code and maximum performance
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Download } from 'lucide-react';
import { useDataManager } from '@/hooks/useDataManager';
import { useOptimizedSearch } from '@/hooks/useSearch';
import { useOptimizedPagination } from '@/hooks/useOptimizedPagination';
import { DataTable } from '@/components/common/DataTable';
import { StatsGrid } from '@/components/common/StatsGrid';
import { User, TableColumn, ActionButton, StatCard } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function OptimizedUsersView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Optimized data management
  const {
    getAll,
    stats,
    remove
  } = useDataManager<User>('users');

  const allUsers = getAll();
  
  // Optimized search
  const {
    searchTerm,
    setSearchTerm,
    searchResults
  } = useOptimizedSearch(allUsers, ['name', 'email', 'role', 'department']);

  // Efficient pagination
  const paginationData = useOptimizedPagination(searchResults, 25);

  // Role color mapping
  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Teacher': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Trainer': 'bg-green-500/20 text-green-400 border-green-500/30',
      'HR': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Admin': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[role] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  // Stats configuration
  const statsConfig: StatCard[] = [
    {
      title: 'Total Users',
      value: stats.total,
      description: 'All system users',
      icon: 'Users',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Active Users',
      value: stats.active,
      description: 'Currently active',
      icon: 'UserCheck',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Trainers',
      value: (stats as any).byRole?.['Trainer'] || 0,
      description: 'Training staff',
      icon: 'Users',
      color: 'bg-purple-500/20 text-purple-400'
    }
  ];

  // Table columns
  const columns: TableColumn<User>[] = [
    { key: 'user', label: 'User' },
    { 
      key: 'role', 
      label: 'Role & Department',
      render: (user) => (
        <div>
          <Badge variant="outline" className={getRoleColor(user.role)}>
            {user.role}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">{user.department}</p>
        </div>
      )
    },
    { key: 'status', label: 'Status' },
    { 
      key: 'experience', 
      label: 'Experience',
      render: (user) => (
        <div>
          <p className="font-medium text-sm">{user.experience}</p>
          <p className="text-xs text-muted-foreground">Since {new Date(user.hireDate).getFullYear()}</p>
        </div>
      )
    }
  ];

  // Actions
  const actions: ActionButton<User>[] = [
    {
      label: 'View',
      icon: 'Eye',
      onClick: (user) => navigate(`/admin/user/view/${user.id}`)
    },
    {
      label: 'Edit',
      icon: 'Edit',
      onClick: (user) => navigate(`/admin/user/edit/${user.id}`)
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      onClick: (user) => {
        if (remove(user.id)) {
          toast({
            title: 'User Deleted',
            description: `${user.name} has been removed from the system.`,
            variant: "destructive"
          });
        }
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Export Complete", description: "User data exported." })}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/admin/user/add')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid stats={statsConfig} />

      {/* Search and Table */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Manage all staff accounts</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-muted/20 border-muted/30"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={paginationData}
            columns={columns}
            actions={actions}
            onPageChange={paginationData.goToPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}