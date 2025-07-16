import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getOrders, updateOrderStatus } from '@/api/orderApi';
import { IOrder } from '@/types';

import { LoadingPage } from '@/components/shared/LoadingPage';
//import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { token } = useAuthStore.getState();

  const fetchOrders = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await getOrders(token);
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: IOrder['orderStatus']) => {
    if (!token) return;
    try {
      await updateOrderStatus(orderId, newStatus, token);
      toast.success("Order status updated!");
      // Optimistically update the UI or refetch
      setOrders(prev => prev.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order));
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.orderStatus === statusFilter);

  const getStatusBadge = (status: IOrder['orderStatus']) => {
    switch (status) {
      case 'processing': return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped': return <Badge className="bg-yellow-100 text-yellow-800">Shipped</Badge>;
      case 'delivered': return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and deliveries</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader><CardTitle>All Orders ({filteredOrders.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-mono text-xs">{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>LKR {order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select defaultValue={order.orderStatus} onValueChange={(value) => handleStatusUpdate(order._id, value as IOrder['orderStatus'])}>
                      <SelectTrigger className="w-[120px] p-0 border-none focus:ring-0 bg-transparent h-auto">
                        <SelectValue asChild>  {/* <-- ADD THIS PROP HERE AS WELL */}
                          {getStatusBadge(order.orderStatus)}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
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