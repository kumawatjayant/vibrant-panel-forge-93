
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, TrendingUp, Clock, Search, Filter, Download, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const attendanceData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    course: 'Software Engineering Fundamentals',
    status: 'Present',
    checkInTime: '09:15 AM',
    date: '2024-07-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    course: 'Data Structures & Algorithms',
    status: 'Late',
    checkInTime: '09:45 AM',
    date: '2024-07-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    course: 'Web Development',
    status: 'Absent',
    checkInTime: '-',
    date: '2024-07-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    course: 'Machine Learning Basics',
    status: 'Present',
    checkInTime: '09:10 AM',
    date: '2024-07-15',
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'David Garcia',
    email: 'david@example.com',
    course: 'Database Management Systems',
    status: 'Present',
    checkInTime: '09:05 AM',
    date: '2024-07-15',
    avatar: '/placeholder.svg'
  }
];

export function AttendanceView() {
  const [attendance, setAttendance] = useState(attendanceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const { toast } = useToast();

  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status.toLowerCase() === selectedStatus;
    const matchesCourse = selectedCourse === 'all' || record.course === selectedCourse;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Late':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Absent':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleMarkAttendance = (id: number, status: string) => {
    setAttendance(prev => prev.map(record => 
      record.id === id ? { ...record, status, checkInTime: status === 'Present' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-' } : record
    ));
    toast({
      title: "Attendance Updated",
      description: `Student marked as ${status}`,
    });
  };

  const courses = [...new Set(attendance.map(record => record.course))];
  const presentCount = attendance.filter(r => r.status === 'Present').length;
  const lateCount = attendance.filter(r => r.status === 'Late').length;
  const absentCount = attendance.filter(r => r.status === 'Absent').length;
  const totalCount = attendance.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track student attendance and generate reports</p>
        </div>
        
        <Button onClick={() => toast({ title: "Export Complete", description: "Attendance report exported successfully." })}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((presentCount / totalCount) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
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
                <p className="text-2xl font-bold">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Present Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lateCount}</p>
                <p className="text-sm text-muted-foreground">Late Arrivals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absent Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Track and manage student attendance</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-muted/20 border-muted/30"
                />
              </div>

              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-48 bg-muted/20 border-muted/30">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-32 bg-muted/20 border-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={record.avatar} alt={record.name} />
                        <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{record.course}</TableCell>
                  <TableCell className="text-muted-foreground">{record.checkInTime}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleMarkAttendance(record.id, 'Present')}
                      >
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleMarkAttendance(record.id, 'Absent')}
                      >
                        <XCircle className="h-4 w-4 text-red-400" />
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
