import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@/components/ui/table';

type Props = {
  userId: string;
};

type Order = {
  _id: string;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
};

export default function OrderHistory({ userId }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // TODO: Replace this with a real API call
    setOrders([
      { _id: '1', totalPrice: 89.99, orderStatus: 'delivered', createdAt: '2024-07-01' },
      { _id: '2', totalPrice: 120.0, orderStatus: 'processing', createdAt: '2024-07-08' },
    ]);
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
