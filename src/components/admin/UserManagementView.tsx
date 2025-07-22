import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Users, UserPlus, Search, Edit, Trash2, Eye, Download, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdvancedSearchForm } from '@/components/common/AdvancedSearchForm';

// Enhanced user data with more comprehensive information
const generateUserData = () => {
  const roles = ['Teacher', 'Trainer', 'HR', 'Admin', 'Support', 'Manager'];
  const departments = ['Engineering', 'Computer Science', 'Mathematics', 'Business', 'Design', 'Marketing'];
  const statuses = ['Active', 'Inactive', 'Suspended', 'On Leave'];
  const firstNames = ['Sarah', 'Michael', 'Alex', 'Maria', 'Jennifer', 'Mark', 'Rachel', 'David', 'Lisa', 'James', 'Emma', 'John', 'Jessica', 'Robert', 'Ashley', 'Daniel', 'Amanda', 'Matthew', 'Michelle', 'Christopher'];
  const lastNames = ['Johnson', 'Chen', 'Rodriguez', 'Garcia', 'Adams', 'Thompson', 'Green', 'Wilson', 'Brown', 'Davis', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Clark', 'Lewis'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const educationLevels = ['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Associate Degree', 'Certificate'];
  return Array.from({
    length: 150
  }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const dateOfBirth = new Date(1970 + Math.floor(Math.random() * 35), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const hireDate = new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();
    const experience = new Date().getFullYear() - hireDate.getFullYear();
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@eduveritas.edu`,
      phone: `+1-555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      alternatePhone: Math.random() > 0.7 ? `+1-555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}` : null,
      role,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      avatar: '/placeholder.svg',
      dateOfBirth: dateOfBirth.toISOString().split('T')[0],
      age,
      hireDate: hireDate.toISOString().split('T')[0],
      experience: `${experience} years`,
      department: departments[Math.floor(Math.random() * departments.length)],
      employeeId: `EMP${String(i + 1).padStart(4, '0')}`,
      salary: Math.floor(Math.random() * 50000) + 50000,
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${lastName} Avenue`,
        city: cities[Math.floor(Math.random() * cities.length)],
        state: 'CA',
        zipCode: Math.floor(Math.random() * 90000) + 10000,
        country: 'USA'
      },
      education: {
        level: educationLevels[Math.floor(Math.random() * educationLevels.length)],
        institution: `${lastName} University`,
        graduationYear: 2000 + Math.floor(Math.random() * 24),
        major: departments[Math.floor(Math.random() * departments.length)]
      },
      emergencyContact: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`,
        relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)],
        phone: `+1-555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        email: `emergency${i + 1}@email.com`
      },
      skills: ['Leadership', 'Communication', 'Technical Writing', 'Project Management', 'Data Analysis', 'Teaching'].slice(0, Math.floor(Math.random() * 4) + 2),
      certifications: ['Certified Teacher', 'Project Management Professional', 'Technical Certification'].slice(0, Math.floor(Math.random() * 3) + 1),
      performanceRating: (3.5 + Math.random() * 1.5).toFixed(1),
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: Math.random() > 0.5 ? `${firstName} is a dedicated ${role.toLowerCase()} with excellent performance.` : '',
      socialMedia: {
        linkedin: Math.random() > 0.6 ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : null,
        twitter: Math.random() > 0.8 ? `https://twitter.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : null
      }
    };
  });
};
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
export function UserManagementView() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(generateUserData());
  const [filteredUsers, setFilteredUsers] = useState(generateUserData());
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 25;
  const {
    toast
  } = useToast();

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);
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
    const filtered = users.filter(user => {
      const matchesName = !searchParams.name || user.name.toLowerCase().includes(searchParams.name.toLowerCase());
      const matchesEmail = !searchParams.email || user.email.toLowerCase().includes(searchParams.email.toLowerCase());
      const matchesPhone = !searchParams.phone || user.phone.toLowerCase().includes(searchParams.phone.toLowerCase());
      return matchesName && matchesEmail && matchesPhone;
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };
  const handleResetSearch = () => {
    setFilteredUsers(users);
    setCurrentPage(1); // Reset to first page when resetting
  };
  const handleAddUser = () => {
    navigate('/admin/user/add');
  };
  const handleViewUser = (userId: number) => {
    navigate(`/admin/user/view/${userId}`);
  };
  const handleEditUser = (userId: number) => {
    navigate(`/admin/user/edit/${userId}`);
  };
  const handleDeleteUser = (userId: number, userName: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setFilteredUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: 'User Deleted',
      description: `${userName} has been removed from the system.`,
      variant: "destructive"
    });
  };
  const handleExportUsers = () => {
    toast({
      title: "Export Complete",
      description: "User data has been exported to CSV."
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
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
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'Active').length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
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
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'Trainer').length}</p>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Search */}
      <AdvancedSearchForm fields={searchFields} onSearch={handleAdvancedSearch} onReset={handleResetSearch} title="Search User" />

      {/* Main Content */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>View and manage all staff accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>User</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map(user => <TableRow key={user.id} className="border-border/50 hover:bg-muted/20">
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
                      <Badge variant="outline" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{user.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{user.experience}</p>
                      <p className="text-xs text-muted-foreground">Since {new Date(user.hireDate).getFullYear()}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewUser(user.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user.id)}>
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
              Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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