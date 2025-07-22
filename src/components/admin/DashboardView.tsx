import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BookOpen, CreditCard, Activity, TrendingUp, Bell, ArrowUpRight, UserPlus, Plus, Send, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const revenueData = [{
  month: 'Jan',
  revenue: 12000,
  students: 240,
  courses: 8
}, {
  month: 'Feb',
  revenue: 15000,
  students: 298,
  courses: 9
}, {
  month: 'Mar',
  revenue: 18000,
  students: 350,
  courses: 10
}, {
  month: 'Apr',
  revenue: 22000,
  students: 420,
  courses: 10
}, {
  month: 'May',
  revenue: 28000,
  students: 485,
  courses: 12
}, {
  month: 'Jun',
  revenue: 35000,
  students: 560,
  courses: 15
}];

const courseData = [{
  name: 'Software Eng.',
  value: 35,
  color: '#8b5cf6'
}, {
  name: 'Data Structures',
  value: 25,
  color: '#10b981'
}, {
  name: 'ML Basics',
  value: 20,
  color: '#f59e0b'
}, {
  name: 'Others',
  value: 20,
  color: '#ef4444'
}];

const recentActivities = [{
  id: 1,
  user: 'Sarah Wilson',
  email: 'sarah@example.com',
  action: 'Completed Software Engineering Fundamentals',
  time: '2024-07-15 14:30:25',
  type: 'completion',
  course: 'Software Engineering'
}, {
  id: 2,
  user: 'John Doe',
  email: 'john@example.com',
  action: 'Enrolled in Data Structures & Algorithms',
  time: '2024-07-15 13:15:10',
  type: 'enrollment',
  course: 'Data Structures'
}, {
  id: 3,
  user: 'Mike Johnson',
  email: 'mike@example.com',
  action: 'Payment received for Machine Learning course',
  time: '2024-07-15 11:45:18',
  type: 'payment',
  course: 'Machine Learning'
}, {
  id: 4,
  user: 'Emma Davis',
  email: 'emma@example.com',
  action: 'Submitted assignment for Database Systems',
  time: '2024-07-15 09:20:45',
  type: 'assignment',
  course: 'Database Systems'
}];

export function DashboardView() {
  const {
    toast
  } = useToast();
  const handleQuickAction = (action: string) => {
    toast({
      title: `${action} Initiated`,
      description: `Opening ${action.toLowerCase()} interface...`
    });
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          
          
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass border-0 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <div>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">1,156 Active • 89 Inactive</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <div>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">580 Total Enrollments</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                <div>
                  <p className="text-2xl font-bold">₹6,311</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">45 Pending Payments</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 hover:scale-105 transition-transform duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <div>
                  <p className="text-2xl font-bold">₹156,840</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">This Year</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Growth Chart */}
        <Card className="glass border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue & Student Growth</CardTitle>
              <CardDescription>Monthly performance metrics and trends</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px',
                backdropFilter: 'blur(16px)'
              }} />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution */}
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Student enrollment by course category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={courseData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {courseData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {courseData.map((item, index) => <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: item.color
                  }}></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Student Activity */}
      <Card className="glass border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Student Activity</CardTitle>
            <CardDescription>Latest student actions and course progress</CardDescription>
          </div>
          <Button variant="ghost">
            View All
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map(activity => <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.time).toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {activity.course}
                  </Badge>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}
