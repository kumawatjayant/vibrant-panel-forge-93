import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Phone, Calendar, Clock, Activity, User, MapPin, Award, Wallet, Users, Linkedin, Twitter, Building, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Generate mock user data matching UserManagementView structure
const generateMockUser = (id: number) => {
  const roles = ['Teacher', 'Trainer', 'HR', 'Admin', 'Support', 'Manager'];
  const departments = ['Engineering', 'Computer Science', 'Mathematics', 'Business', 'Design', 'Marketing'];
  const statuses = ['Active', 'Inactive', 'Suspended', 'On Leave'];
  const firstNames = ['Sarah', 'Michael', 'Alex', 'Maria', 'Jennifer', 'Mark', 'Rachel', 'David', 'Lisa', 'James'];
  const lastNames = ['Johnson', 'Chen', 'Rodriguez', 'Garcia', 'Adams', 'Thompson', 'Green', 'Wilson', 'Brown', 'Davis'];
  const educationLevels = ['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Associate Degree', 'Certificate'];

  const firstName = firstNames[id % firstNames.length];
  const lastName = lastNames[id % lastNames.length];
  const role = roles[id % roles.length];
  const dateOfBirth = new Date(1970 + (id % 35), (id % 12), (id % 28) + 1);
  const hireDate = new Date(2015 + (id % 9), (id % 12), (id % 28) + 1);
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();
  const experience = new Date().getFullYear() - hireDate.getFullYear();

  return {
    id,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@eduveritas.edu`,
    phone: `+1-555-${String(id).padStart(3, '0')}-${String(id * 2).padStart(4, '0')}`,
    alternatePhone: id % 3 === 0 ? `+1-555-${String(id + 100).padStart(3, '0')}-${String(id * 3).padStart(4, '0')}` : null,
    role,
    status: statuses[id % statuses.length],
    avatar: '/placeholder.svg',
    dateOfBirth: dateOfBirth.toISOString().split('T')[0],
    age,
    hireDate: hireDate.toISOString().split('T')[0],
    experience: `${experience} years`,
    department: departments[id % departments.length],
    employeeId: `EMP${String(id).padStart(4, '0')}`,
    salary: 50000 + (id % 50000),
    address: {
      street: `${id * 100} Business Avenue`,
      city: 'New York',
      state: 'NY',
      zipCode: 10000 + id,
      country: 'USA'
    },
    education: {
      level: educationLevels[id % educationLevels.length],
      institution: `${lastName} University`,
      graduationYear: 2000 + (id % 24),
      major: departments[id % departments.length]
    },
    emergencyContact: {
      name: `Emergency ${firstName}`,
      relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][id % 4],
      phone: `+1-555-${String(id + 500).padStart(3, '0')}-${String(id * 4).padStart(4, '0')}`,
      email: `emergency${id}@email.com`
    },
    skills: ['Leadership', 'Communication', 'Technical Writing', 'Project Management', 'Data Analysis', 'Teaching'].slice(0, (id % 4) + 2),
    certifications: ['Certified Teacher', 'Project Management Professional', 'Technical Certification'].slice(0, (id % 3) + 1),
    performanceRating: (3.5 + (id % 15) / 10).toFixed(1),
    lastLogin: new Date(Date.now() - (id % 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: `${firstName} is a dedicated ${role.toLowerCase()} with excellent performance and strong leadership skills.`,
    socialMedia: {
      linkedin: id % 3 === 0 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
      twitter: id % 4 === 0 ? `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : null
    },
    recentActivity: [
      { action: `Conducted training session on ${departments[id % departments.length]}`, timestamp: '2024-07-06 10:30 AM' },
      { action: `Submitted quarterly report for ${departments[id % departments.length]}`, timestamp: '2024-07-05 2:15 PM' },
      { action: `Attended department meeting`, timestamp: '2024-07-04 9:00 AM' },
      { action: `Performance review completed`, timestamp: '2024-07-03 3:45 PM' }
    ]
  };
};

export function UserViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const userId = parseInt(id || '0');
    const foundUser = generateMockUser(userId);
    
    setTimeout(() => {
      setUser(foundUser);
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

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Inactive':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Suspended':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'On Leave':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Teacher':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Trainer':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'HR':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Admin':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Support':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Manager':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/?view=user-management')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-muted-foreground">View detailed user information and activity</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="glass border-0">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-lg">{user.email}</CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <Badge variant="outline" className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button onClick={() => navigate(`/user/edit/${user.id}`)}>
                Edit User
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.experience}</p>
                      <p className="text-sm text-muted-foreground">Experience</p>
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
                      <p className="text-2xl font-bold">{user.performanceRating}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
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
                      <p className="text-2xl font-bold">{new Date(user.hireDate).getFullYear()}</p>
                      <p className="text-sm text-muted-foreground">Hire Year</p>
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
                      <p className="text-2xl font-bold">{new Date(user.lastLogin).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">Last Login</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Department Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                    <p className="text-lg font-semibold">{user.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                    <p className="font-medium">{user.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Role</p>
                    <Badge variant="outline" className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Skills & Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {user.certifications.map((cert: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                      <p className="font-medium">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                      <p className="font-medium">{user.lastName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Age</p>
                      <p className="font-medium">{user.age} years</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Primary Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  {user.alternatePhone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alternate Phone</p>
                      <p className="font-medium">{user.alternatePhone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Address & Emergency Contact */}
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
                      <p className="font-medium">{user.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.address.city}, {user.address.state} {user.address.zipCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.address.country}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                    <div className="mt-2 space-y-2">
                      <p className="font-medium">{user.emergencyContact.name}</p>
                      <p className="text-sm text-muted-foreground">{user.emergencyContact.relationship}</p>
                      <p className="text-sm">{user.emergencyContact.phone}</p>
                      <p className="text-sm">{user.emergencyContact.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Social Media</p>
                    <div className="mt-2 space-y-2">
                      {user.socialMedia.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4" />
                          <a href={user.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-400 hover:underline">LinkedIn Profile</a>
                        </div>
                      )}
                      {user.socialMedia.twitter && (
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4" />
                          <a href={user.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-400 hover:underline">Twitter Profile</a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
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
                    <p className="font-medium">{user.education.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Institution</p>
                    <p className="font-medium">{user.education.institution}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Graduation Year</p>
                      <p className="font-medium">{user.education.graduationYear}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Major</p>
                      <p className="font-medium">{user.education.major}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employment Details */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hire Date</p>
                    <p className="font-medium">{new Date(user.hireDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Experience</p>
                    <p className="font-medium">{user.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Salary</p>
                    <p className="font-medium">₹{user.salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                    <p className="font-medium">{user.employeeId}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notes */}
            {user.notes && (
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm p-3 bg-muted/20 rounded-lg">{user.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="glass border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
                <CardDescription>Performance metrics and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Overall Rating</p>
                    <div className="flex items-center gap-3">
                      <Progress value={parseFloat(user.performanceRating) * 20} className="flex-1" />
                      <span className="text-2xl font-bold text-green-400">{user.performanceRating}/5.0</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Skills Count</p>
                    <p className="text-2xl font-bold text-blue-400">{user.skills.length}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                    <p className="text-2xl font-bold text-purple-400">{user.certifications.length}</p>
                  </div>
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
                <CardDescription>Latest user actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentActivity.map((activity: any, index: number) => (
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
      </div>
    </div>
  );
}
