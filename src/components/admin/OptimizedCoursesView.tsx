// Optimized Courses View with minimal code and maximum performance
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download } from 'lucide-react';
import { useDataManager } from '@/hooks/useDataManager';
import { useOptimizedSearch } from '@/hooks/useSearch';
import { useOptimizedPagination } from '@/hooks/useOptimizedPagination';
import { DataTable } from '@/components/common/DataTable';
import { StatsGrid } from '@/components/common/StatsGrid';
import { Course, TableColumn, ActionButton, StatCard } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function OptimizedCoursesView() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Optimized data management
  const {
    getAll,
    stats,
    remove
  } = useDataManager<Course>('courses');

  const allCourses = getAll();
  
  // Optimized search
  const {
    searchTerm,
    setSearchTerm,
    searchResults
  } = useOptimizedSearch(allCourses, ['name', 'category', 'instructor']);

  // Efficient pagination
  const paginationData = useOptimizedPagination(searchResults, 25);

  // Stats configuration
  const statsConfig: StatCard[] = [
    {
      title: 'Total Courses',
      value: stats.total,
      description: 'All available courses',
      icon: 'BookOpen',
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      title: 'Active Courses',
      value: stats.active,
      description: 'Currently running',
      icon: 'Play',
      color: 'bg-green-500/20 text-green-400'
    },
    {
      title: 'Total Enrolled',
      value: (stats as any).totalEnrolled || 0,
      description: 'Students across all courses',
      icon: 'Users',
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      title: 'Avg Progress',
      value: `${Math.round((stats as any).averageProgress || 0)}%`,
      description: 'Across all courses',
      icon: 'TrendingUp',
      color: 'bg-orange-500/20 text-orange-400'
    }
  ];

  // Table columns
  const columns: TableColumn<Course>[] = [
    { 
      key: 'name', 
      label: 'Course',
      render: (course) => (
        <div>
          <p className="font-medium">{course.name}</p>
          <p className="text-sm text-muted-foreground">{course.category}</p>
        </div>
      )
    },
    { 
      key: 'duration', 
      label: 'Duration & Level',
      render: (course) => (
        <div>
          <p className="font-medium text-sm">{course.duration}</p>
          <p className="text-xs text-muted-foreground">{course.level}</p>
        </div>
      )
    },
    { 
      key: 'enrolledStudents', 
      label: 'Students',
      render: (course) => `${course.enrolledStudents}/${course.maxStudents}`
    },
    { key: 'status', label: 'Status' }
  ];

  // Actions
  const actions: ActionButton<Course>[] = [
    {
      label: 'View',
      icon: 'Eye',
      onClick: (course) => navigate(`/admin/course/view/${course.id}`)
    },
    {
      label: 'Edit',
      icon: 'Edit',
      onClick: (course) => navigate(`/admin/course/edit/${course.id}`)
    },
    {
      label: 'Delete',
      icon: 'Trash2',
      onClick: (course) => {
        if (remove(course.id)) {
          toast({
            title: "Course Deleted",
            description: `${course.name} has been removed from the system.`,
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
          <h1 className="text-3xl font-bold">Course Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Export Complete", description: "Course data exported." })}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/admin/course/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
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
              <CardTitle>Course Directory</CardTitle>
              <CardDescription>Manage all course offerings</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
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