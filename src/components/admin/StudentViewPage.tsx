
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Calendar, Clock, Activity, BookOpen, Award, GraduationCap, MapPin, User, CreditCard, Users, Github, Linkedin, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Generate same enhanced student data as UsersView
const generateMockStudent = (id: number) => {
  const firstNames = ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna', 'James', 'Mary'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const courses = ['Software Engineering Fundamentals', 'Data Structures & Algorithms', 'Database Management Systems'];
  const achievements = ['Honor Roll', 'Perfect Attendance', 'Top Performer', 'Leadership Award', 'Best Project'];
  
  const firstName = firstNames[id % firstNames.length];
  const lastName = lastNames[id % lastNames.length];
  const course = courses[id % courses.length];
  const dateOfBirth = new Date(1990 + (id % 25), (id % 12), (id % 28) + 1);
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();
  
  return {
    id,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@email.com`,
    phone: `+1 (555) ${String(id).padStart(3, '0')}-${String(id * 2).padStart(4, '0')}`,
    alternatePhone: id % 3 === 0 ? `+1 (555) ${String(id + 100).padStart(3, '0')}-${String(id * 3).padStart(4, '0')}` : null,
    status: id % 10 === 0 ? 'Inactive' : 'Active',
    avatar: '/placeholder.svg',
    dateOfBirth: dateOfBirth.toISOString().split('T')[0],
    age,
    gender: id % 3 === 0 ? 'Female' : id % 3 === 1 ? 'Male' : 'Other',
    nationality: 'USA',
    address: {
      street: `${id * 100} Main Street`,
      city: 'New York',
      state: 'NY',
      zipCode: 10000 + id,
      country: 'USA'
    },
    education: {
      level: 'Bachelor\'s Degree',
      institution: `${lastName} University`,
      graduationYear: 2020 + (id % 5),
      gpa: (3.0 + (id % 10) / 10).toFixed(2)
    },
    emergencyContact: {
      name: `Emergency ${firstName}`,
      relationship: 'Father',
      phone: `+1 (555) ${String(id + 500).padStart(3, '0')}-${String(id * 4).padStart(4, '0')}`,
      email: `emergency${id}@email.com`
    },
    joinDate: new Date(2024, id % 6, (id % 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(Date.now() - (id % 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    course: {
      name: course,
      enrollmentDate: new Date(2024, id % 6, (id % 28) + 1).toISOString().split('T')[0],
      duration: '12 weeks',
      progress: 60 + (id % 40),
      status: id % 15 === 0 ? 'Completed' : 'Ongoing',
      remainingDays: id % 15 === 0 ? 0 : (id % 90) + 1,
      instructor: `Prof. ${firstName} ${lastNames[(id + 1) % lastNames.length]}`,
      grade: (60 + (id % 40)) > 90 ? 'A' : (60 + (id % 40)) > 80 ? 'B' : 'C'
    },
    financial: {
      tuitionFee: 3000 + (id % 2000),
      paidAmount: 2000 + (id % 1000),
      dueAmount: id % 1000,
      paymentMethod: id % 3 === 0 ? 'Credit Card' : id % 3 === 1 ? 'Bank Transfer' : 'PayPal',
      scholarshipAmount: id % 5 === 0 ? 1000 : 0
    },
    attendance: {
      totalClasses: 40 + (id % 20),
      attendedClasses: 35 + (id % 15),
      attendancePercentage: 80 + (id % 20)
    },
    totalCourses: 3 + (id % 5),
    completedCourses: 1 + (id % 3),
    achievements: achievements.slice(0, 2 + (id % 4)),
    tags: ['Regular', 'Good Student'].slice(0, 1 + (id % 2)),
    notes: `Student ${firstName} shows great potential and demonstrates strong skills.`,
    socialMedia: {
      linkedin: id % 3 === 0 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
      github: id % 4 === 0 ? `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : null
    },
    recentActivity: [
      { action: `Completed Module: Advanced ${course.split(' ')[0]}`, timestamp: '2024-07-06 10:30 AM' },
      { action: `Submitted Assignment: ${course} Project`, timestamp: '2024-07-05 2:15 PM' },
      { action: 'Joined Live Session: Advanced Topics', timestamp: '2024-07-04 9:00 AM' },
      { action: 'Achievement Unlocked: Top Performer', timestamp: '2024-07-03 3:45 PM' }
    ]
  };
};

export function StudentViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const studentId = parseInt(id || '0');
    const foundStudent = generateMockStudent(studentId);
    
    setTimeout(() => {
      setStudent(foundStudent);
      setLoading(false);
    }, 500);
  }, [id]);

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

  if (!student) {
    return null;
  }

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Dropped':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin?view=users')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Student Profile</h1>
            <p className="text-muted-foreground">View detailed student information and activity</p>
          </div>
        </div>

        {/* Student Info Card */}
        <Card className="glass border-0">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{student.name}</CardTitle>
                  <CardDescription className="text-lg">{student.email}</CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{student.phone}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate(`/admin/student/edit/${student.id}`)}>
                Edit Student
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Course Information Card */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Current Course
                </CardTitle>
                <CardDescription>Active course enrollment and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Course Name</p>
                      <p className="text-lg font-semibold">{student.course.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Instructor</p>
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {student.course.instructor}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Enrollment Date</p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(student.course.enrollmentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Duration</p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {student.course.duration}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Progress value={student.course.progress} className="flex-1" />
                        <span className="text-sm font-medium">{student.course.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge variant="outline" className={getCourseStatusColor(student.course.status)}>
                        {student.course.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Grade</p>
                      <p className="text-lg font-bold text-green-400">{student.course.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Remaining Days</p>
                      <p className="text-lg font-bold text-orange-400">{student.course.remainingDays} days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">First Name</p>
                      <p className="font-medium">{student.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                      <p className="font-medium">{student.lastName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="font-medium">{student.age} years</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p className="font-medium">{student.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nationality</p>
                      <p className="font-medium">{student.nationality}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Primary Phone</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                  {student.alternatePhone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alternate Phone</p>
                      <p className="font-medium">{student.alternatePhone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Address & Contact */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address & Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <div className="mt-1">
                      <p className="font-medium">{student.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.address.city}, {student.address.state} {student.address.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{student.address.country}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                    <div className="mt-2 space-y-2">
                      <p className="font-medium">{student.emergencyContact.name}</p>
                      <p className="text-sm text-muted-foreground">{student.emergencyContact.relationship}</p>
                      <p className="text-sm">{student.emergencyContact.phone}</p>
                      <p className="text-sm">{student.emergencyContact.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Social Media</p>
                    <div className="mt-2 space-y-2">
                      {student.socialMedia.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          <a href={student.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-400 hover:underline">LinkedIn Profile</a>
                        </div>
                      )}
                      {student.socialMedia.github && (
                        <div className="flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          <a href={student.socialMedia.github} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-400 hover:underline">GitHub Profile</a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Education Background */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Education Level</p>
                    <p className="font-medium">{student.education.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Institution</p>
                    <p className="font-medium">{student.education.institution}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Graduation Year</p>
                      <p className="font-medium">{student.education.graduationYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">GPA</p>
                      <p className="font-medium">{student.education.gpa}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Attendance Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance Percentage</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Progress value={student.attendance.attendancePercentage} className="flex-1" />
                      <span className="text-sm font-medium">{student.attendance.attendancePercentage}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Classes Attended</p>
                      <p className="font-medium">{student.attendance.attendedClasses}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                      <p className="font-medium">{student.attendance.totalClasses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements & Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Achievements</p>
                    <div className="flex flex-wrap gap-2">
                      {student.achievements.map((achievement: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          <Award className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {student.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {student.notes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notes</p>
                      <p className="text-sm mt-1 p-3 bg-muted/20 rounded-lg">{student.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Financial Information
                </CardTitle>
                <CardDescription>Tuition, payments, and financial status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Tuition Fee</p>
                    <p className="text-2xl font-bold text-blue-400">₹{student.financial.tuitionFee.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                    <p className="text-2xl font-bold text-green-400">₹{student.financial.paidAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Due Amount</p>
                    <p className="text-2xl font-bold text-red-400">₹{student.financial.dueAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Scholarship</p>
                    <p className="text-2xl font-bold text-purple-400">₹{student.financial.scholarshipAmount.toLocaleString()}</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm font-medium text-muted-foreground">Payment Method:</span>
                  <Badge variant="outline">{student.financial.paymentMethod}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest student actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{student.totalCourses}</p>
                  <p className="text-sm text-muted-foreground">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{student.completedCourses}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{new Date(student.joinDate).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Join Date</p>
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
                  <p className="text-2xl font-bold">{new Date(student.lastLogin).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Student accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest student actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.recentActivity.map((activity: any, index: number) => (
                  <div key={index} className="flex gap-3 p-3 bg-muted/20 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
