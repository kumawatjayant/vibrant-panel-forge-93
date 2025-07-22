import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Search, Filter, Download, Edit, Trash2, Eye } from 'lucide-react';
import { AdvancedSearchForm } from '@/components/common/AdvancedSearchForm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

// Dummy data for students with enhanced information
const generateDummyStudents = () => {
  const courses = ['Software Engineering Fundamentals', 'Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Full Stack Web Development', 'Object-Oriented Programming', 'Machine Learning Basics', 'System Design & Architecture', 'Cloud Computing & DevOps'];
  const firstNames = ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna', 'James', 'Mary', 'Alex', 'Jessica', 'Robert', 'Michelle', 'Daniel', 'Ashley', 'Michael', 'Jennifer', 'Matthew', 'Amanda'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Taylor', 'Anderson', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez'];
  const statuses = ['Active', 'Inactive', 'Suspended'];
  const courseStatuses = ['Ongoing', 'Completed', 'Dropped'];
  const genders = ['Male', 'Female', 'Other'];
  const educationLevels = ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Associate Degree'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Netherlands', 'Sweden', 'India', 'Japan'];
  const emergencyRelations = ['Father', 'Mother', 'Spouse', 'Sibling', 'Guardian', 'Friend'];
  const paymentMethods = ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash', 'Scholarship'];
  return Array.from({
    length: 200
  }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const course = courses[Math.floor(Math.random() * courses.length)];
    const progress = Math.floor(Math.random() * 100);
    const courseStatus = progress === 100 ? 'Completed' : Math.random() > 0.9 ? 'Dropped' : 'Ongoing';
    const dateOfBirth = new Date(1990 + Math.floor(Math.random() * 25), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@email.com`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      alternatePhone: Math.random() > 0.7 ? `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : null,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      avatar: '/placeholder.svg',
      dateOfBirth: dateOfBirth.toISOString().split('T')[0],
      age,
      gender: genders[Math.floor(Math.random() * genders.length)],
      nationality: countries[Math.floor(Math.random() * countries.length)],
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${lastName} Street`,
        city: cities[Math.floor(Math.random() * cities.length)],
        state: 'CA',
        zipCode: Math.floor(Math.random() * 90000) + 10000,
        country: countries[Math.floor(Math.random() * countries.length)]
      },
      education: {
        level: educationLevels[Math.floor(Math.random() * educationLevels.length)],
        institution: `${lastName} University`,
        graduationYear: 2020 + Math.floor(Math.random() * 5),
        gpa: (2.5 + Math.random() * 1.5).toFixed(2)
      },
      emergencyContact: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`,
        relationship: emergencyRelations[Math.floor(Math.random() * emergencyRelations.length)],
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `emergency${i + 1}@email.com`
      },
      joinDate: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      course: {
        name: course,
        enrollmentDate: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        duration: '12 weeks',
        progress: progress,
        status: courseStatus,
        remainingDays: courseStatus === 'Completed' ? 0 : Math.floor(Math.random() * 90) + 1,
        instructor: `Prof. ${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        grade: progress > 80 ? 'A' : progress > 70 ? 'B' : progress > 60 ? 'C' : progress > 50 ? 'D' : 'F'
      },
      financial: {
        tuitionFee: Math.floor(Math.random() * 5000) + 2000,
        paidAmount: Math.floor(Math.random() * 3000) + 1000,
        dueAmount: Math.floor(Math.random() * 2000),
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        scholarshipAmount: Math.random() > 0.8 ? Math.floor(Math.random() * 2000) + 500 : 0
      },
      attendance: {
        totalClasses: Math.floor(Math.random() * 50) + 20,
        attendedClasses: Math.floor(Math.random() * 40) + 15,
        attendancePercentage: Math.floor(Math.random() * 40) + 60
      },
      totalCourses: Math.floor(Math.random() * 5) + 1,
      completedCourses: Math.floor(Math.random() * 3),
      achievements: ['Honor Roll', 'Perfect Attendance', 'Top Performer', 'Leadership Award', 'Best Project'].slice(0, Math.floor(Math.random() * 6)),
      tags: ['Needs Guidance', 'Top Performer', 'Regular', 'At Risk', 'Scholarship Recipient', 'International Student'].slice(0, Math.floor(Math.random() * 4)),
      notes: Math.random() > 0.5 ? `Student ${firstName} shows great potential in ${course.split(' ')[0]} and demonstrates strong analytical skills.` : '',
      socialMedia: {
        linkedin: Math.random() > 0.6 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
        github: Math.random() > 0.7 ? `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : null
      }
    };
  });
};
export function UsersView() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(generateDummyStudents());
  const [filteredStudents, setFilteredStudents] = useState(generateDummyStudents());
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 25;
  const {
    toast
  } = useToast();

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);
  const searchFields = [{
    key: 'name',
    label: 'Name',
    placeholder: 'Search by name...'
  }, {
    key: 'email',
    label: 'Email',
    placeholder: 'Search by email...'
  }, {
    key: 'phone',
    label: 'Phone',
    placeholder: 'Search by phone...'
  }];
  const handleAdvancedSearch = (searchParams: Record<string, string>) => {
    const filtered = students.filter(user => {
      const matchesName = !searchParams.name || user.name.toLowerCase().includes(searchParams.name.toLowerCase());
      const matchesEmail = !searchParams.email || user.email.toLowerCase().includes(searchParams.email.toLowerCase());
      const matchesPhone = !searchParams.phone || user.phone.toLowerCase().includes(searchParams.phone.toLowerCase());
      return matchesName && matchesEmail && matchesPhone;
    });
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };
  const handleResetSearch = () => {
    setFilteredStudents(students);
    setCurrentPage(1); // Reset to first page when resetting
  };
  const handleDeleteUser = (userId: number, userName: string) => {
    setStudents(students.filter(student => student.id !== userId));
    toast({
      title: "Student Deleted",
      description: `${userName} has been removed from the system.`,
      variant: "destructive"
    });
  };
  const handleExportUsers = () => {
    toast({
      title: "Export Complete",
      description: "Student data has been exported to CSV."
    });
  };
  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30';
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => navigate('/admin/student/add')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
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
                <p className="text-2xl font-bold">{students.filter(u => u.status === 'Active').length}</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{students.filter(u => u.status === 'Active' && u.course?.status === 'Ongoing').length}</p>
                <p className="text-sm text-muted-foreground">Currently Enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Search */}
      <AdvancedSearchForm fields={searchFields} onSearch={handleAdvancedSearch} onReset={handleResetSearch} title="Search Student" />

      {/* Results Table */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all student accounts</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map(user => <TableRow key={user.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{user.course?.name || 'No Course'}</p>
                      <p className="text-xs text-muted-foreground">{user.course?.status || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{
                      width: `${user.course?.progress || 0}%`
                    }} />
                      </div>
                      <span className="text-sm">{user.course?.progress || 0}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/student/view/${user.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/student/edit/${user.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id, user.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={e => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                
                {/* Show page numbers */}
                {Array.from({
                length: Math.min(5, totalPages)
              }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return <PaginationItem key={pageNum}>
                      <PaginationLink href="#" isActive={pageNum === currentPage} onClick={e => {
                    e.preventDefault();
                    setCurrentPage(pageNum);
                  }}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>;
              })}
                
                <PaginationItem>
                  <PaginationNext href="#" onClick={e => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>;
}