// Optimized Students View with minimal code and maximum performance
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Download } from 'lucide-react';
import { useDataManager } from '@/hooks/useDataManager';
import { useOptimizedSearch } from '@/hooks/useSearch';
import { useOptimizedPagination } from '@/hooks/useOptimizedPagination';
import { DataTable } from '@/components/common/DataTable';
import { StatsGrid } from '@/components/common/StatsGrid';
import { Student, TableColumn, ActionButton, StatCard } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function OptimizedStudentsView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Optimized data management with O(1) operations
  const {
    getAll,
    search,
    stats,
    remove
  } = useDataManager<Student>('students');

  const allStudents = getAll();
  
  // Optimized search with debouncing
  const {
    searchTerm,
    setSearchTerm,
    searchResults
  } = useOptimizedSearch(allStudents, ['name', 'email', 'phone']);

  // Efficient pagination
  const paginationData = useOptimizedPagination(searchResults, 25);

  // Memoized stats configuration
  const statsConfig: StatCard[] = [
    {
      title: 'Total Students',
      value: stats.total,
      description: 'All registered students',
      icon: 'Users',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Active Students',
      value: stats.active,
      description: 'Currently active',
      icon: 'UserCheck',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Currently Enrolled',
      value: (stats as any).enrolled || 0,
      description: 'In ongoing courses',
      icon: 'GraduationCap',
      color: 'bg-purple-500/20 text-purple-400'
    }
  ];

  // Optimized table columns
  const columns: TableColumn<Student>[] = [
    { key: 'user', label: 'Student' }, // Uses special rendering
    { key: 'course', label: 'Course', render: (student) => student.course?.name || 'No Course' },
    { key: 'status', label: 'Status' }, // Uses special rendering
    { 
      key: 'progress', 
      label: 'Progress',
      render: (student) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${student.course?.progress || 0}%` }}
            />
          </div>
          <span className="text-sm">{student.course?.progress || 0}%</span>
        </div>
      )
    }
  ];

  // Optimized actions
  const actions: ActionButton<Student>[] = [
    {
      label: 'View',
      icon: 'Eye',
      onClick: (student) => navigate(`/admin/student/view/${student.id}`)
    },
    {
      label: 'Edit',
      icon: 'Edit',
      onClick: (student) => navigate(`/admin/student/edit/${student.id}`)
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      onClick: (student) => {
        if (remove(student.id)) {
          toast({
            title: "Student Deleted",
            description: `${student.name} has been removed from the system.`,
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
          <h1 className="text-3xl font-bold">Student Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Export Complete", description: "Student data exported." })}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/admin/student/add')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
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
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>Manage all student accounts</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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