
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Plus, Search, Filter, Users, Clock, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const initialCourses = [
  {
    id: 1,
    name: 'Software Engineering Fundamentals',
    category: 'Software Engineering',
    duration: '12 weeks',
    enrolledStudents: 45,
    activeStudents: 42,
    completedStudents: 3,
    averageProgress: 75,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Data Structures & Algorithms',
    category: 'Computer Science',
    duration: '16 weeks',
    enrolledStudents: 38,
    activeStudents: 35,
    completedStudents: 3,
    averageProgress: 68,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Database Management Systems',
    category: 'Software Engineering',
    duration: '10 weeks',
    enrolledStudents: 32,
    activeStudents: 30,
    completedStudents: 2,
    averageProgress: 82,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Operating Systems',
    category: 'Computer Science',
    duration: '14 weeks',
    enrolledStudents: 28,
    activeStudents: 25,
    completedStudents: 3,
    averageProgress: 55,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Computer Networks',
    category: 'Computer Science',
    duration: '12 weeks',
    enrolledStudents: 35,
    activeStudents: 32,
    completedStudents: 3,
    averageProgress: 70,
    status: 'Active'
  }
];

export function CoursesView() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
  const totalActiveStudents = courses.reduce((sum, course) => sum + course.activeStudents, 0);
  const totalCompletedStudents = courses.reduce((sum, course) => sum + course.completedStudents, 0);
  const overallProgress = Math.round(courses.reduce((sum, course) => sum + course.averageProgress, 0) / courses.length);

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
        </div>
        
        <Button onClick={() => navigate('/admin/course/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActiveStudents}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Course Management</CardTitle>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-muted/20 border-muted/30"
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setSearchTerm('')}>
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{course.enrolledStudents} enrolled</span>
                      <span className="text-sm text-muted-foreground">{course.activeStudents} active</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={course.averageProgress} className="w-16" />
                      <span className="text-sm font-medium">{course.averageProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {course.duration}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/course/view/${course.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/course/edit/${course.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        if (confirm('Are you sure you want to delete this course?')) {
                          setCourses(courses.filter(c => c.id !== course.id));
                        }
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
