
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, Search, Filter, Download, CheckCircle, XCircle, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const initialAdmissions = [
  {
    id: 1,
    name: 'Alex Thompson',
    email: 'alex@example.com',
    phone: '+1 (555) 111-2222',
    course: 'Software Engineering Fundamentals',
    applicationDate: '2024-07-10',
    status: 'Pending',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria@example.com',
    phone: '+1 (555) 333-4444',
    course: 'Data Structures & Algorithms',
    applicationDate: '2024-07-08',
    status: 'Approved',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'David Kim',
    email: 'david@example.com',
    phone: '+1 (555) 555-6666',
    course: 'Machine Learning Basics',
    applicationDate: '2024-07-12',
    status: 'Rejected',
    avatar: '/placeholder.svg'
  }
];

export function AdmissionsView() {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { toast } = useToast();

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = admission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admission.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || admission.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setAdmissions(prev => prev.map(admission => 
      admission.id === id ? { ...admission, status: newStatus } : admission
    ));
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admissions</h1>
          <p className="text-muted-foreground">Manage student applications and admissions</p>
        </div>
        
        <Button onClick={() => toast({ title: "Export Complete", description: "Admissions data exported successfully." })}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{admissions.length}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{admissions.filter(a => a.status === 'Approved').length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{admissions.filter(a => a.status === 'Pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
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
                <p className="text-2xl font-bold">{admissions.filter(a => a.status === 'Rejected').length}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admissions Table */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Applications Management</CardTitle>
              <CardDescription>Review and manage student applications</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-muted/20 border-muted/30"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-32 bg-muted/20 border-muted/30">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Applicant</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmissions.map((admission) => (
                <TableRow key={admission.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={admission.avatar} alt={admission.name} />
                        <AvatarFallback>{admission.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admission.name}</p>
                        <p className="text-sm text-muted-foreground">{admission.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{admission.course}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(admission.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(admission.status)}>
                      {admission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {admission.status === 'Pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleStatusUpdate(admission.id, 'Approved')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleStatusUpdate(admission.id, 'Rejected')}
                          >
                            <XCircle className="h-4 w-4 text-red-400" />
                          </Button>
                        </>
                      )}
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
