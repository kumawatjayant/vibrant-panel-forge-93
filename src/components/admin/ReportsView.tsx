
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, BarChart, PieChart, Calendar, Users, TrendingUp, CreditCard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const reportData = [
  {
    id: 1,
    name: 'Student Enrollment Report',
    type: 'Student Analytics',
    category: 'Academic',
    status: 'Ready',
    lastGenerated: '2024-07-15',
    size: '2.3 MB',
    format: 'PDF'
  },
  {
    id: 2,
    name: 'Course Performance Analysis',
    type: 'Course Analytics',
    category: 'Academic',
    status: 'Ready',
    lastGenerated: '2024-07-14',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: 3,
    name: 'Fee Collection Summary',
    type: 'Financial',
    category: 'Finance',
    status: 'Generating',
    lastGenerated: '2024-07-13',
    size: '3.1 MB',
    format: 'PDF'
  },
  {
    id: 4,
    name: 'Attendance Report - Monthly',
    type: 'Attendance',
    category: 'Academic',
    status: 'Ready',
    lastGenerated: '2024-07-12',
    size: '1.2 MB',
    format: 'Excel'
  },
  {
    id: 5,
    name: 'Communication Analytics',
    type: 'Communication',
    category: 'Operations',
    status: 'Ready',
    lastGenerated: '2024-07-11',
    size: '0.9 MB',
    format: 'PDF'
  }
];

const quickReports = [
  { name: 'Daily Attendance', icon: Users, description: 'Today\'s attendance summary' },
  { name: 'Fee Collections', icon: CreditCard, description: 'Recent payment activities' },
  { name: 'Course Progress', icon: TrendingUp, description: 'Student progress analytics' },
  { name: 'Monthly Summary', icon: Calendar, description: 'Complete monthly overview' }
];

export function ReportsView() {
  const [reports, setReports] = useState(reportData);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const { toast } = useToast();

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category.toLowerCase() === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || report.format.toLowerCase() === selectedFormat;
    
    return matchesCategory && matchesFormat;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Generating':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleDownload = (reportId: number, reportName: string) => {
    toast({
      title: "Download Started",
      description: `${reportName} is being downloaded`,
    });
  };

  const handleGenerateQuickReport = (reportName: string) => {
    const newReport = {
      id: reports.length + 1,
      name: reportName,
      type: 'Quick Report',
      category: 'Operations',
      status: 'Generating',
      lastGenerated: new Date().toISOString().split('T')[0],
      size: '1.5 MB',
      format: 'PDF'
    };

    setReports(prev => [newReport, ...prev]);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === newReport.id ? { ...report, status: 'Ready' } : report
      ));
      toast({
        title: "Report Generated",
        description: `${reportName} is now ready for download`,
      });
    }, 3000);

    toast({
      title: "Report Queued",
      description: `${reportName} generation started`,
    });
  };

  const readyReports = reports.filter(r => r.status === 'Ready').length;
  const totalDownloads = 89;
  const reportTypes = 12;
  const scheduledReports = 45;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive reports</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{readyReports}</p>
                <p className="text-sm text-muted-foreground">Reports Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Download className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalDownloads}</p>
                <p className="text-sm text-muted-foreground">Downloads This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BarChart className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reportTypes}</p>
                <p className="text-sm text-muted-foreground">Report Types</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <PieChart className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledReports}</p>
                <p className="text-sm text-muted-foreground">Scheduled Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate commonly used reports instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickReports.map((report, index) => (
              <Card key={index} className="p-4 hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => handleGenerateQuickReport(report.name)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>Manage and download generated reports</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40 bg-muted/20 border-muted/30">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger className="w-full sm:w-32 bg-muted/20 border-muted/30">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {report.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{report.lastGenerated}</TableCell>
                  <TableCell className="text-muted-foreground">{report.size}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={report.status !== 'Ready'}
                      onClick={() => handleDownload(report.id, report.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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
