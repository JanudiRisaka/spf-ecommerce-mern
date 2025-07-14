import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export default function DashboardPage() {
  // Mock KPI data
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+5.2% from last month",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "New Orders",
      value: "32",
      change: "+12.5% from last month",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "New Inquiries",
      value: "15",
      change: "-2.1% from last month",
      trend: "down",
      icon: MessageSquare,
      color: "text-orange-600"
    },
    {
      title: "Total Users",
      value: "128",
      change: "No change from last month",
      trend: "neutral",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  // Mock recent orders data
  const recentOrders = [
    {
      id: "ORD-001",
      customerName: "Rajesh Kumar",
      amount: "$89.99",
      status: "completed"
    },
    {
      id: "ORD-002",
      customerName: "Priya Sharma",
      amount: "$125.50",
      status: "processing"
    },
    {
      id: "ORD-003",
      customerName: "Arjun Patel",
      amount: "$65.99",
      status: "pending"
    },
    {
      id: "ORD-004",
      customerName: "Meera Singh",
      amount: "$199.99",
      status: "completed"
    },
    {
      id: "ORD-005",
      customerName: "Vikram Reddy",
      amount: "$75.25",
      status: "cancelled"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-full bg-gray-100 ${kpi.color}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center text-sm text-gray-600">
                  {getTrendIcon(kpi.trend)}
                  <span className="ml-1">{kpi.change}</span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Sales Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Sales Analytics
                </p>
                <p className="text-gray-600">
                  Line chart showing revenue will be implemented here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer Name</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-primary">
                      {order.id}
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="font-semibold">
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Products</h3>
                  <p className="text-sm text-gray-600">Add, edit, or remove products</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Orders</h3>
                  <p className="text-sm text-gray-600">Process and track orders</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and manage customers</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}