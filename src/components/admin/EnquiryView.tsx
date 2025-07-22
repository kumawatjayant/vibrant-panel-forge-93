import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Search, Filter, Mail, Phone, Eye, Edit, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Dummy enquiry data
const enquiryData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0111',
    course: 'Software Engineering',
    status: 'New',
    priority: 'High',
    source: 'Website',
    message: 'Interested in the full-stack development program. Looking for flexible timing options.',
    dateReceived: '2024-07-15',
    lastContact: '2024-07-15',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 2,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1-555-0112',
    course: 'Data Science',
    status: 'In Progress',
    priority: 'Medium',
    source: 'Social Media',
    message: 'Want to know about prerequisites for data science course and job placement assistance.',
    dateReceived: '2024-07-14',
    lastContact: '2024-07-15',
    assignedTo: 'Mike Chen'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1-555-0113',
    course: 'Web Development',
    status: 'Contacted',
    priority: 'Low',
    source: 'Referral',
    message: 'Friend recommended your bootcamp. Interested in weekend classes.',
    dateReceived: '2024-07-13',
    lastContact: '2024-07-14',
    assignedTo: 'Lisa White'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1-555-0114',
    course: 'Machine Learning',
    status: 'Converted',
    priority: 'High',
    source: 'Google Ads',
    message: 'Looking for advanced ML course with practical projects and certification.',
    dateReceived: '2024-07-12',
    lastContact: '2024-07-13',
    assignedTo: 'David Kim'
  },
  {
    id: 5,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1-555-0115',
    course: 'UI/UX Design',
    status: 'Closed',
    priority: 'Medium',
    source: 'Website',
    message: 'Interested in design fundamentals and portfolio development guidance.',
    dateReceived: '2024-07-11',
    lastContact: '2024-07-12',
    assignedTo: 'Sophie Turner'
  },
  {
    id: 6,
    name: 'Jessica Taylor',
    email: 'jessica.taylor@email.com',
    phone: '+1-555-0116',
    course: 'Mobile Development',
    status: 'New',
    priority: 'High',
    source: 'Email Campaign',
    message: 'Wants to learn both iOS and Android development. Asking about course duration.',
    dateReceived: '2024-07-15',
    lastContact: '2024-07-15',
    assignedTo: 'Robert Miller'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'In Progress':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Contacted':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Converted':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Closed':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Low':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'New':
      return <AlertCircle className="h-4 w-4" />;
    case 'In Progress':
      return <Clock className="h-4 w-4" />;
    case 'Contacted':
      return <MessageSquare className="h-4 w-4" />;
    case 'Converted':
      return <CheckCircle className="h-4 w-4" />;
    case 'Closed':
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export function EnquiryView() {
  const [enquiries, setEnquiries] = useState(enquiryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const { toast } = useToast();

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          enquiry.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || enquiry.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || enquiry.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusUpdate = (enquiryId: number, newStatus: string) => {
    setEnquiries(prev => prev.map(enquiry => 
      enquiry.id === enquiryId 
        ? { ...enquiry, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
        : enquiry
    ));
    toast({
      title: 'Status Updated',
      description: `Enquiry status changed to ${newStatus}`,
    });
  };

  const handleAddEnquiry = () => {
    window.location.href = '/enquiry/add';
  };

  const enquiryStats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'New').length,
    inProgress: enquiries.filter(e => e.status === 'In Progress').length,
    converted: enquiries.filter(e => e.status === 'Converted').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Enquiry Management</h1>
        </div>
        <Button onClick={handleAddEnquiry} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Enquiry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enquiries</p>
                <p className="text-2xl font-bold">{enquiryStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Enquiries</p>
                <p className="text-2xl font-bold">{enquiryStats.new}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{enquiryStats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{enquiryStats.converted}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Enquiry Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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

          {/* Enquiries Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Course Interest</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.course}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {enquiry.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {enquiry.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(enquiry.status)}>
                      {getStatusIcon(enquiry.status)}
                      <span className="ml-1">{enquiry.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(enquiry.priority)}>
                      {enquiry.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{enquiry.source}</TableCell>
                  <TableCell>{enquiry.dateReceived}</TableCell>
                  <TableCell>{enquiry.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedEnquiry(enquiry)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enquiry Details</DialogTitle>
                            <DialogDescription>
                              Full details for {enquiry.name}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedEnquiry && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <p className="text-sm text-muted-foreground">{selectedEnquiry.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Course Interest</label>
                                  <p className="text-sm text-muted-foreground">{selectedEnquiry.course}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{selectedEnquiry.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{selectedEnquiry.phone}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Message</label>
                                <p className="text-sm text-muted-foreground mt-1">{selectedEnquiry.message}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleStatusUpdate(selectedEnquiry.id, 'Contacted')}
                                >
                                  Mark as Contacted
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(selectedEnquiry.id, 'Converted')}
                                >
                                  Mark as Converted
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Select onValueChange={(value) => handleStatusUpdate(enquiry.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Update" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Contacted">Contacted</SelectItem>
                          <SelectItem value="Converted">Converted</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
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