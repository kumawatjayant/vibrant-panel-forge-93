
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Users, Clock, TrendingUp, BookOpen, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Mock course data
const mockCourses = [
  {
    id: 1,
    name: 'Software Engineering Fundamentals',
    category: 'Software Engineering',
    duration: '12 weeks',
    description: 'Comprehensive introduction to software engineering principles, practices, and methodologies.',
    enrolledStudents: 45,
    activeStudents: 42,
    completedStudents: 3,
    averageProgress: 75,
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    students: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/placeholder.svg',
        enrollmentDate: '2024-01-15',
        progress: 75,
        status: 'Active'
      },
      {
        id: 2,
        name: 'Alice Smith',
        email: 'alice@example.com',
        avatar: '/placeholder.svg',
        enrollmentDate: '2024-01-18',
        progress: 82,
        status: 'Active'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        avatar: '/placeholder.svg',
        enrollmentDate: '2024-01-20',
        progress: 68,
        status: 'Active'
      }
    ]
  }
];

export function CourseViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseId = parseInt(id || '0');
    const foundCourse = mockCourses.find(c => c.id === courseId);
    
    setTimeout(() => {
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        toast({
          title: "Course Not Found",
          description: "The requested course could not be found.",
          variant: "destructive"
        });
        navigate('/admin?view=courses');
      }
      setLoading(false);
    }, 500);
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-48 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin?view=courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Course Details</h1>
            <p className="text-muted-foreground">View course information and enrolled students</p>
          </div>
        </div>

        {/* Course Info Card */}
        <Card className="glass border-0">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <CardDescription className="text-lg">{course.category}</CardDescription>
                  <Badge variant="outline" className={getStatusColor(course.status)} >
                    {course.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="flex items-center gap-2 text-lg">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                <p className="flex items-center gap-2 text-lg">
                  <Calendar className="h-4 w-4" />
                  {new Date(course.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">End Date</p>
                <p className="flex items-center gap-2 text-lg">
                  <Calendar className="h-4 w-4" />
                  {new Date(course.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{course.enrolledStudents}</p>
                  <p className="text-sm text-muted-foreground">Total Enrolled</p>
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
                  <p className="text-2xl font-bold">{course.activeStudents}</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{course.completedStudents}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
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
                  <p className="text-2xl font-bold">{course.averageProgress}%</p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Students */}
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Enrolled Students
            </CardTitle>
            <CardDescription>Students currently enrolled in this course</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Student</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course.students.map((student: any) => (
                  <TableRow key={student.id} className="border-border/50 hover:bg-muted/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={student.progress} className="w-16" />
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
