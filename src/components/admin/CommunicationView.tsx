
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Send, Users, Plus, Search, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const messageHistory = [
  {
    id: 1,
    type: 'Email',
    subject: 'Course Assignment Reminder',
    recipient: 'All Students',
    recipientCount: 156,
    status: 'Sent',
    sentDate: '2024-07-15',
    sentTime: '10:30 AM'
  },
  {
    id: 2,
    type: 'SMS',
    subject: 'Class Schedule Update',
    recipient: 'Software Engineering Students',
    recipientCount: 45,
    status: 'Delivered',
    sentDate: '2024-07-14',
    sentTime: '02:15 PM'
  },
  {
    id: 3,
    type: 'Email',
    subject: 'Fee Payment Reminder',
    recipient: 'Pending Payment Students',
    recipientCount: 23,
    status: 'Sent',
    sentDate: '2024-07-13',
    sentTime: '09:00 AM'
  },
  {
    id: 4,
    type: 'SMS',
    subject: 'Welcome Message',
    recipient: 'New Students',
    recipientCount: 12,
    status: 'Delivered',
    sentDate: '2024-07-12',
    sentTime: '11:45 AM'
  }
];

export function CommunicationView() {
  const [messages, setMessages] = useState(messageHistory);
  const [showComposer, setShowComposer] = useState(false);
  const [messageForm, setMessageForm] = useState({
    type: 'email',
    recipient: 'all',
    subject: '',
    content: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { toast } = useToast();

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || message.type.toLowerCase() === selectedType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Delivered':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSendMessage = () => {
    if (!messageForm.subject || !messageForm.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      type: messageForm.type === 'email' ? 'Email' : 'SMS',
      subject: messageForm.subject,
      recipient: messageForm.recipient === 'all' ? 'All Students' : 'Selected Group',
      recipientCount: messageForm.recipient === 'all' ? 156 : 45,
      status: 'Sent',
      sentDate: new Date().toISOString().split('T')[0],
      sentTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [newMessage, ...prev]);
    setMessageForm({ type: 'email', recipient: 'all', subject: '', content: '' });
    setShowComposer(false);
    
    toast({
      title: "Message Sent",
      description: `${newMessage.type} sent to ${newMessage.recipientCount} recipients`,
    });
  };

  const totalSent = messages.length;
  const emailsSent = messages.filter(m => m.type === 'Email').length;
  const smsSent = messages.filter(m => m.type === 'SMS').length;
  const deliveryRate = Math.round((messages.filter(m => m.status === 'Delivered' || m.status === 'Sent').length / totalSent) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communication</h1>
          <p className="text-muted-foreground">Send messages and notifications to students</p>
        </div>
        
        <Button onClick={() => setShowComposer(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{emailsSent}</p>
                <p className="text-sm text-muted-foreground">Emails Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Send className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{smsSent}</p>
                <p className="text-sm text-muted-foreground">SMS Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deliveryRate}%</p>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">245</p>
                <p className="text-sm text-muted-foreground">Active Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Composer */}
      {showComposer && (
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Send email or SMS to students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Message Type</label>
                <Select value={messageForm.type} onValueChange={(value) => setMessageForm({...messageForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Recipients</label>
                <Select value={messageForm.recipient} onValueChange={(value) => setMessageForm({...messageForm, recipient: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="course">By Course</SelectItem>
                    <SelectItem value="pending">Pending Payments</SelectItem>
                    <SelectItem value="active">Active Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                placeholder="Message subject..."
                value={messageForm.subject}
                onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                placeholder="Type your message here..."
                rows={4}
                value={messageForm.content}
                onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setShowComposer(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message History */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Message History</CardTitle>
              <CardDescription>View all sent messages and their status</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-muted/20 border-muted/30"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-32 bg-muted/20 border-muted/30">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell>
                    <Badge variant="outline" className={message.type === 'Email' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}>
                      {message.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{message.subject}</TableCell>
                  <TableCell>{message.recipient}</TableCell>
                  <TableCell>{message.recipientCount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {message.sentDate} at {message.sentTime}
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
