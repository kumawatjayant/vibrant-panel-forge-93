
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const analyticsData = [
  { month: 'Jan', revenue: 12000, users: 1200, orders: 450 },
  { month: 'Feb', revenue: 15000, users: 1500, orders: 520 },
  { month: 'Mar', revenue: 18000, users: 1800, orders: 680 },
  { month: 'Apr', revenue: 22000, users: 2100, orders: 750 },
  { month: 'May', revenue: 25000, users: 2400, orders: 890 },
  { month: 'Jun', revenue: 28000, users: 2700, orders: 950 },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Deep insights into your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹125K</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xs text-green-400">+18.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">4,237</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-xs text-blue-400">+12.5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">11.7K</p>
                <p className="text-sm text-muted-foreground">New Users</p>
                <p className="text-xs text-purple-400">+24.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(16px)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-0">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(16px)'
                  }} 
                />
                <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
