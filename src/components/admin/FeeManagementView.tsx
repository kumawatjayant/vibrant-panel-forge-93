
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, TrendingUp, AlertCircle, Search, Filter, Download, Clock, CheckCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Pagination } from '../common/Pagination';

const feeData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    course: 'Software Engineering Fundamentals',
    feeAmount: 2500,
    paidAmount: 2500,
    dueAmount: 0,
    status: 'Paid',
    dueDate: '2024-08-15',
    paymentDate: '2024-07-10',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    course: 'Data Structures & Algorithms',
    feeAmount: 3000,
    paidAmount: 1500,
    dueAmount: 1500,
    status: 'Partial',
    dueDate: '2024-07-25',
    paymentDate: '2024-07-01',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    course: 'Web Development',
    feeAmount: 3500,
    paidAmount: 0,
    dueAmount: 3500,
    status: 'Pending',
    dueDate: '2024-07-20',
    paymentDate: null,
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    course: 'Machine Learning Basics',
    feeAmount: 2800,
    paidAmount: 2800,
    dueAmount: 0,
    status: 'Paid',
    dueDate: '2024-08-10',
    paymentDate: '2024-07-05',
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'David Garcia',
    email: 'david@example.com',
    course: 'Database Management Systems',
    feeAmount: 2700,
    paidAmount: 0,
    dueAmount: 2700,
    status: 'Overdue',
    dueDate: '2024-07-10',
    paymentDate: null,
    avatar: '/placeholder.svg'
  }
];

export function FeeManagementView() {
  const [fees, setFees] = useState(feeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const { toast } = useToast();

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || fee.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFees = filteredFees.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Partial':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleMarkPaid = (id: number) => {
    setFees(prev => prev.map(fee => 
      fee.id === id ? { 
        ...fee, 
        status: 'Paid', 
        paidAmount: fee.feeAmount, 
        dueAmount: 0,
        paymentDate: new Date().toISOString().split('T')[0]
      } : fee
    ));
    toast({
      title: "Payment Recorded",
      description: "Fee payment has been marked as paid",
    });
  };

  const handleSendReminder = (id: number) => {
    toast({
      title: "Reminder Sent",
      description: "Payment reminder sent to student",
    });
  };

  const totalRevenue = fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalDues = fees.reduce((sum, fee) => sum + fee.dueAmount, 0);
  const paidCount = fees.filter(f => f.status === 'Paid').length;
  const overdueCount = fees.filter(f => f.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fee Management</h1>
          <p className="text-muted-foreground">Track payments, dues, and financial records</p>
        </div>
        
        <Button onClick={() => toast({ title: "Add Fees", description: "Opening add fees form..." })}>
          <CreditCard className="h-4 w-4 mr-2" />
          Add Fees
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{paidCount}</p>
                <p className="text-sm text-muted-foreground">Payments Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalDues.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pending Dues</p>
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
                <p className="text-2xl font-bold">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Management Table */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>Manage student fee payments and dues</CardDescription>
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
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Fee Amount</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedFees.map((fee) => (
                <TableRow key={fee.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={fee.avatar} alt={fee.name} />
                        <AvatarFallback>{fee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{fee.name}</p>
                        <p className="text-sm text-muted-foreground">{fee.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{fee.course}</TableCell>
                  <TableCell className="font-medium">₹{fee.feeAmount}</TableCell>
                  <TableCell className="text-green-400">₹{fee.paidAmount}</TableCell>
                  <TableCell className="text-red-400">₹{fee.dueAmount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(fee.status)}>
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {fee.status !== 'Paid' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleMarkPaid(fee.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        </Button>
                      )}
                      {(fee.status === 'Pending' || fee.status === 'Overdue') && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleSendReminder(fee.id)}
                        >
                          <AlertCircle className="h-4 w-4 text-orange-400" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredFees.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
